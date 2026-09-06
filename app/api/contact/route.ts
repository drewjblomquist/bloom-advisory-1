import { NextResponse } from "next/server";
import { insertSupabaseRow } from "@/app/lib/submissionApi";
import { writeSubmissionLog } from "@/app/lib/structuredLog";
import { validateContactSubmission } from "@/app/lib/submissionValidation";

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const startedAt = Date.now();

  try {
    const body = await request.json();
    const validation = validateContactSubmission(body);

    if (!validation.ok) {
      writeSubmissionLog({
        requestId,
        eventName: "contact_form_submission",
        status: "failure",
        durationMs: Date.now() - startedAt,
        errorCode: validation.errorCode,
      });

      return NextResponse.json(
        { error: "Please check the form and try again." },
        { status: 400 },
      );
    }

    const result = await insertSupabaseRow("contact_messages", validation.data);

    if (!result.ok) {
      writeSubmissionLog({
        requestId,
        eventName: "contact_form_submission",
        status: "failure",
        durationMs: Date.now() - startedAt,
        errorCode: `SUPABASE_${result.status}`,
      });

      return NextResponse.json(
        { error: "Message could not be saved. Please try again." },
        { status: 502 },
      );
    }

    writeSubmissionLog({
      requestId,
      eventName: "contact_form_submission",
      status: "success",
      durationMs: Date.now() - startedAt,
    });

    return NextResponse.json({ ok: true });
  } catch {
    writeSubmissionLog({
      requestId,
      eventName: "contact_form_submission",
      status: "failure",
      durationMs: Date.now() - startedAt,
      errorCode: "UNHANDLED_ERROR",
    });

    return NextResponse.json(
      { error: "Message could not be processed. Please try again." },
      { status: 500 },
    );
  }
}
