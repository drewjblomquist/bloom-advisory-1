type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; errorCode: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const asRecord = (value: unknown): Record<string, unknown> | null => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
};

const normalizeText = (value: unknown, maxLength: number) => {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  return trimmed.slice(0, maxLength);
};

const normalizeTextArray = (value: unknown, maxItems: number, maxLength: number) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, maxItems)
    .map((item) => item.slice(0, maxLength));
};

const requireText = (value: string | null) => Boolean(value);

const requireEmail = (value: string | null) => Boolean(value && emailPattern.test(value));

const allowValidPhone = (value: string | null) =>
  !value || value.replace(/[^\d]/g, "").length >= 7;

const formatWithOther = (selected: string | null, other: string | null) => {
  if (!selected) {
    return null;
  }

  if (selected === "Other" && other) {
    return `Other: ${other}`;
  }

  return selected;
};

const formatListWithOther = (selected: string[], other: string | null) => {
  const values = selected.map((item) =>
    item === "Other" && other ? `Other: ${other}` : item,
  );

  return values.length > 0 ? values : null;
};

const joinList = (values: string[] | null) => values?.join("; ") ?? null;

export const validateQuestionnaireSubmission = (
  input: unknown,
): ValidationResult<Record<string, unknown>> => {
  const values = asRecord(input);

  if (!values) {
    return { ok: false, errorCode: "VALIDATION_FAILED" };
  }

  const businessName = normalizeText(values.businessName, 200);
  const companyType = normalizeText(values.companyType, 120);
  const companyTypeOther = normalizeText(values.companyTypeOther, 200);
  const employeeCount = normalizeText(values.employeeCount, 80);
  const frictionAreas = normalizeTextArray(values.frictionAreas, 12, 160);
  const frictionOther = normalizeText(values.frictionOther, 300);
  const processHandling = normalizeText(values.processHandling, 200);
  const criticalTools = normalizeTextArray(values.criticalTools, 12, 180);
  const toolsOther = normalizeText(values.toolsOther, 300);
  const dataConfidence = normalizeText(values.dataConfidence, 120);
  const unlocks = normalizeTextArray(values.unlocks, 12, 180);
  const urgency = normalizeText(values.urgency, 180);
  const painPoints = normalizeText(values.painPoints, 2000);
  const additionalNotes = normalizeText(values.additionalNotes, 2000);
  const email = normalizeText(values.email, 320);
  const phone = normalizeText(values.phone, 80);

  if (
    !requireText(businessName) ||
    !requireText(companyType) ||
    !requireText(employeeCount) ||
    frictionAreas.length === 0 ||
    !requireText(processHandling) ||
    !requireText(dataConfidence) ||
    unlocks.length === 0 ||
    !requireText(urgency) ||
    !requireEmail(email) ||
    !allowValidPhone(phone)
  ) {
    return { ok: false, errorCode: "VALIDATION_FAILED" };
  }

  const formattedFrictionAreas = formatListWithOther(frictionAreas, frictionOther);
  const formattedCriticalTools = formatListWithOther(criticalTools, toolsOther);
  const formattedCompanyType = formatWithOther(companyType, companyTypeOther);

  const details = [
    urgency ? `Urgency: ${urgency}` : null,
    painPoints ? `Pain points: ${painPoints}` : null,
    additionalNotes ? `Additional notes: ${additionalNotes}` : null,
  ].filter(Boolean);

  return {
    ok: true,
    data: {
      business_name: businessName,
      industry: formattedCompanyType,
      team_size: employeeCount,
      tools: joinList(formattedCriticalTools),
      time_consuming_tasks: painPoints,
      areas_interested: formattedFrictionAreas,
      ai_knowledge_level: dataConfidence,
      openness_to_automation: processHandling,
      magic_wand_question: joinList(unlocks),
      anything_else: details.length > 0 ? details.join("\n\n") : null,
      email,
      phone_number: phone,
    },
  };
};

export const validateContactSubmission = (
  input: unknown,
): ValidationResult<Record<string, unknown>> => {
  const values = asRecord(input);

  if (!values) {
    return { ok: false, errorCode: "VALIDATION_FAILED" };
  }

  const email = normalizeText(values.email, 320);
  const phone = normalizeText(values.phone, 80);
  const message = normalizeText(values.message, 2000);

  if (!requireEmail(email) || !requireText(message) || !allowValidPhone(phone)) {
    return { ok: false, errorCode: "VALIDATION_FAILED" };
  }

  return {
    ok: true,
    data: {
      email,
      phone_number: phone,
      message,
    },
  };
};
