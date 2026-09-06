type SubmissionTable = "questionnaire_submissions_v1" | "contact_messages";

type SupabaseInsertResult =
  | { ok: true }
  | { ok: false; status: number };

const getSupabaseConfig = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ""),
    publishableKey,
  };
};

export const insertSupabaseRow = async (
  table: SubmissionTable,
  payload: Record<string, unknown>,
): Promise<SupabaseInsertResult> => {
  const config = getSupabaseConfig();

  if (!config) {
    return {
      ok: false,
      status: 500,
    };
  }

  const response = await fetch(`${config.url}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: config.publishableKey,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
    };
  }

  return { ok: true };
};
