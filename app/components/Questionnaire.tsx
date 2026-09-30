"use client";

import type { FormEvent } from "react";
import { useMemo, useRef, useState, useEffect } from "react";
import styles from "./Questionnaire.module.css";

type SelectControlProps = {
  id: string;
  name: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  onBlur: () => void;
  invalid: boolean;
  describedBy: string;
};

function SelectControl({
  id,
  name,
  value,
  options,
  onChange,
  onBlur,
  invalid,
  describedBy,
}: SelectControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedIndex = options.indexOf(value);
  const [activeIndex, setActiveIndex] = useState(
    selectedIndex >= 0 ? selectedIndex : 0,
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = `${id}-listbox`;

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsidePointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsidePointer);
    return () => document.removeEventListener("pointerdown", handleOutsidePointer);
  }, [isOpen]);

  const openMenu = (index = selectedIndex >= 0 ? selectedIndex : 0) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const chooseOption = (index: number) => {
    onChange(options[index]);
    setActiveIndex(index);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) {
        openMenu();
        return;
      }

      const direction = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((current) =>
        (current + direction + options.length) % options.length,
      );
      return;
    }

    if (isOpen && (event.key === "Home" || event.key === "End")) {
      event.preventDefault();
      setActiveIndex(event.key === "Home" ? 0 : options.length - 1);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (isOpen) {
        chooseOption(activeIndex);
      } else {
        openMenu();
      }
      return;
    }

    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      setIsOpen(false);
    }

    if (event.key === "Tab") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={styles.selectControl}>
      <button
        id={id}
        name={name}
        type="button"
        role="combobox"
        className={styles.selectTrigger}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-activedescendant={isOpen ? `${id}-option-${activeIndex}` : undefined}
        aria-required="true"
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
        onKeyDown={handleKeyDown}
        onBlur={onBlur}
      >
        <span className={value ? styles.selectValue : styles.selectPlaceholder}>
          {value || "Select one"}
        </span>
        <span className={styles.selectChevron} aria-hidden="true" />
      </button>

      {isOpen && (
        <ul id={listboxId} className={styles.selectMenu} role="listbox">
          {options.map((option, index) => (
            <li
              id={`${id}-option-${index}`}
              key={option}
              className={styles.selectOption}
              role="option"
              aria-selected={value === option}
              data-active={activeIndex === index}
              onMouseDown={(event) => event.preventDefault()}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => chooseOption(index)}
            >
              <span>{option}</span>
              {value === option && (
                <span className={styles.optionCheck} aria-hidden="true">
                  ✓
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const COMPANY_TYPES = [
  "Construction / Homebuilding",
  "Real Estate / Property Management",
  "Consulting / Professional Services",
  "Manufacturing / Industrial",
  "Landscaping / Lawn Care",
  "Other",
];

const EMPLOYEE_COUNTS = ["1–5", "6–15", "16–50", "51–100", "100+"];

const FRICTION_AREAS = [
  "Accounting / AP / Invoicing",
  "Procurement / Purchase Orders",
  "Reporting & dashboards",
  "Data entry or manual admin work",
  "Project tracking",
  "Customer or vendor communication",
  "Social Media / Marketing",
  "Other",
];

const PROCESS_HANDLING = [
  "Almost all manually",
  "Some softwares but still too much manual input",
  "Heavily automated but looking to improve",
  "I'm not sure",
];

const CRITICAL_TOOLS = [
  "QuickBooks or other accounting software",
  "Excel or Google Sheets",
  "ERP system (e.g. NetSuite, Sage, etc.)",
  "Project management software",
  "Custom or internal tools",
  "Other",
];

const DATA_CONFIDENCE = [
  "Very confident",
  "Somewhat confident",
  "Not very confident",
  "Not confident at all",
];

const UNLOCKS = [
  "More time to focus on what I enjoy",
  "Lower costs or fewer overpayments",
  "Better visibility into business decisions",
  "Data I can actually trust",
  "Ability to scale without adding headcount",
  "Less time spent on manual data entry"
];

const URGENCY = [
  "I have a process needing fixed immediately",
  "Important, but we can get by like we always have",
  "Something we want to improve by the end of the year",
  "Just exploring options",
];

const INITIAL_FORM = {
  businessName: "",
  companyType: "",
  companyTypeOther: "",
  employeeCount: "",
  frictionAreas: [] as string[],
  frictionOther: "",
  processHandling: "",
  criticalTools: [] as string[],
  toolsOther: "",
  dataConfidence: "",
  unlocks: [] as string[],
  urgency: "",
  painPoints: "",
  additionalNotes: "",
  email: "",
  phone: "",
};

type FormState = typeof INITIAL_FORM;

type FormErrors = Partial<Record<keyof FormState, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getPhoneDigits = (value: string) => value.replace(/[^\d]/g, "");

const validateForm = (form: FormState): FormErrors => {
  const errors: FormErrors = {};

  if (!form.businessName.trim()) {
    errors.businessName = "Business name is required.";
  }

  if (!form.companyType) {
    errors.companyType = "Select a company type.";
  }

  if (!form.employeeCount) {
    errors.employeeCount = "Select an employee count.";
  }

  if (form.frictionAreas.length === 0) {
    errors.frictionAreas = "Select at least one area.";
  }

  if (!form.processHandling) {
    errors.processHandling = "Select how processes are handled.";
  }

  if (!form.dataConfidence) {
    errors.dataConfidence = "Select a confidence level.";
  }

  if (form.unlocks.length === 0) {
    errors.unlocks = "Select at least one outcome.";
  }

  if (!form.urgency) {
    errors.urgency = "Select an urgency level.";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (form.phone.trim()) {
    const digits = getPhoneDigits(form.phone);
    if (digits.length < 7) {
      errors.phone = "Enter a valid phone number.";
    }
  }

  return errors;
};

export default function Questionnaire() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showToast, setShowToast] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const errors = useMemo(() => validateForm(form), [form]);

  const showError = (field: keyof FormState) =>
    (submitAttempted || touched[field]) && errors[field];

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => {
      const nextState = { ...prev, [field]: value };
      // Clear companyTypeOther if "Other" is not selected
      if (field === "companyType" && value !== "Other") {
        nextState.companyTypeOther = "";
      }
      return nextState;
    });
  };

  const handleMultiToggle = (
    field: "frictionAreas" | "criticalTools" | "unlocks",
    value: string,
  ) => {
    setForm((prev) => {
      const current = prev[field];
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      const nextState = { ...prev, [field]: next };

      if (field === "frictionAreas" && !next.includes("Other")) {
        nextState.frictionOther = "";
      }

      if (field === "criticalTools" && !next.includes("Other")) {
        nextState.toolsOther = "";
      }

      return nextState;
    });

    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleTextareaResize = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const textarea = event.target;
    textarea.style.height = "48px";
    textarea.style.height = `${textarea.scrollHeight}px`;
    handleChange(
      event.target.name as keyof FormState,
      event.target.value,
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);
    setSubmitError("");

    const currentErrors = validateForm(form);
    if (Object.keys(currentErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/questionnaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        setSubmitError("We could not save your response. Please try again.");
        return;
      }

      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }

      setForm(INITIAL_FORM);
      setTouched({});
      setShowToast(true);
      setSubmitAttempted(false);
      toastTimer.current = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch {
      setSubmitError("We could not save your response. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasCompanyTypeOther = form.companyType === "Other";
  const hasFrictionOther = form.frictionAreas.includes("Other");
  const hasToolsOther = form.criticalTools.includes("Other");

  const painPointsRef = useRef<HTMLTextAreaElement>(null);
  const additionalNotesRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (painPointsRef.current) {
      painPointsRef.current.style.height = "48px";
      painPointsRef.current.style.height = `${painPointsRef.current.scrollHeight}px`;
    }
    if (additionalNotesRef.current) {
      additionalNotesRef.current.style.height = "48px";
      additionalNotesRef.current.style.height = `${additionalNotesRef.current.scrollHeight}px`;
    }
  }, [form.painPoints, form.additionalNotes]);

  return (
    <section
      id="questionnaire"
      className={styles.section}
      aria-labelledby="questionnaire-title"
    >
      <div className={styles.container}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <p className="eyebrow">03 / Start with the friction</p>
            <h2 id="questionnaire-title" className={styles.title}>
              Find the right place to begin.
            </h2>
            <p className={styles.note}>
              Tell us how work moves through your business today. We’ll use
              your answers to identify where a simpler system could create the
              most value.
            </p>
          </header>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <h3 className={styles.sectionHeading}>01 — Your business</h3>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="businessName">
                Business name
              </label>
              <input
                id="businessName"
                name="businessName"
                className={styles.input}
                type="text"
                value={form.businessName}
                onChange={(event) =>
                  handleChange("businessName", event.target.value)
                }
                onBlur={() => handleBlur("businessName")}
                aria-required="true"
                aria-invalid={Boolean(showError("businessName"))}
                aria-describedby="businessName-error"
              />
              <span
                id="businessName-error"
                className={styles.error}
                aria-live="polite"
              >
                {showError("businessName") ?? ""}
              </span>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="companyType">
                What best describes your company?
              </label>
              <SelectControl
                id="companyType"
                name="companyType"
                value={form.companyType}
                options={COMPANY_TYPES}
                onChange={(value) => handleChange("companyType", value)}
                onBlur={() => handleBlur("companyType")}
                invalid={Boolean(showError("companyType"))}
                describedBy="companyType-error"
              />
              {hasCompanyTypeOther && (
                <div className={styles.subField}>
                  <label className={styles.subFieldLabel} htmlFor="companyTypeOther">
                    Please Explain
                  </label>
                  <input
                    id="companyTypeOther"
                    name="companyTypeOther"
                    className={styles.input}
                    type="text"
                    value={form.companyTypeOther}
                    onChange={(event) =>
                      handleChange("companyTypeOther", event.target.value)
                    }
                    onBlur={() => handleBlur("companyTypeOther")}
                  />
                </div>
              )}
              <span
                id="companyType-error"
                className={styles.error}
                aria-live="polite"
              >
                {showError("companyType") ?? ""}
              </span>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="employeeCount">
                Approximately how many full-time employees does your company
                have?
              </label>
              <SelectControl
                id="employeeCount"
                name="employeeCount"
                value={form.employeeCount}
                options={EMPLOYEE_COUNTS}
                onChange={(value) => handleChange("employeeCount", value)}
                onBlur={() => handleBlur("employeeCount")}
                invalid={Boolean(showError("employeeCount"))}
                describedBy="employeeCount-error"
              />
              <span
                id="employeeCount-error"
                className={styles.error}
                aria-live="polite"
              >
                {showError("employeeCount") ?? ""}
              </span>
            </div>

            <h3 className={styles.sectionHeading}>02 — The way you work</h3>
            <div
              className={styles.fieldset}
              role="group"
              aria-labelledby="frictionAreas-label"
              aria-describedby="frictionAreas-error"
            >
              <p id="frictionAreas-label" className={styles.label}>
                Where do you feel the most operational friction today?
              </p>
              <div className={styles.checkboxList}>
                {FRICTION_AREAS.map((option) => (
                  <label key={option} className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      name="frictionAreas"
                      value={option}
                      checked={form.frictionAreas.includes(option)}
                      onChange={() => handleMultiToggle("frictionAreas", option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {hasFrictionOther && (
                <div className={styles.subField}>
                  <label className={styles.subFieldLabel} htmlFor="frictionOther">
                    Please Explain
                  </label>
                  <input
                    id="frictionOther"
                    name="frictionOther"
                    className={styles.input}
                    type="text"
                    value={form.frictionOther}
                    onChange={(event) =>
                      handleChange("frictionOther", event.target.value)
                    }
                    onBlur={() => handleBlur("frictionOther")}
                  />
                </div>
              )}
              <span
                id="frictionAreas-error"
                className={styles.error}
                aria-live="polite"
              >
                {showError("frictionAreas") ?? ""}
              </span>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="processHandling">
                How are most of these processes handled today?
              </label>
              <SelectControl
                id="processHandling"
                name="processHandling"
                value={form.processHandling}
                options={PROCESS_HANDLING}
                onChange={(value) => handleChange("processHandling", value)}
                onBlur={() => handleBlur("processHandling")}
                invalid={Boolean(showError("processHandling"))}
                describedBy="processHandling-error"
              />
              <span
                id="processHandling-error"
                className={styles.error}
                aria-live="polite"
              >
                {showError("processHandling") ?? ""}
              </span>
            </div>

            <div
              className={styles.fieldset}
              role="group"
              aria-labelledby="criticalTools-label"
            >
              <p id="criticalTools-label" className={styles.label}>
                Which tools or systems are most critical to your day-to-day
                operations?
              </p>
              <div className={styles.checkboxList}>
                {CRITICAL_TOOLS.map((option) => (
                  <label key={option} className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      name="criticalTools"
                      value={option}
                      checked={form.criticalTools.includes(option)}
                      onChange={() =>
                        handleMultiToggle("criticalTools", option)
                      }
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {hasToolsOther && (
                <div className={styles.subField}>
                  <label className={styles.subFieldLabel} htmlFor="toolsOther">
                    Please Explain
                  </label>
                  <input
                    id="toolsOther"
                    name="toolsOther"
                    className={styles.input}
                    type="text"
                    value={form.toolsOther}
                    onChange={(event) =>
                      handleChange("toolsOther", event.target.value)
                    }
                    onBlur={() => handleBlur("toolsOther")}
                  />
                </div>
              )}
              <span className={styles.error} aria-live="polite">
                {""}
              </span>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="dataConfidence">
                How confident are you in the accuracy and consistency of your
                operational data?
              </label>
              <SelectControl
                id="dataConfidence"
                name="dataConfidence"
                value={form.dataConfidence}
                options={DATA_CONFIDENCE}
                onChange={(value) => handleChange("dataConfidence", value)}
                onBlur={() => handleBlur("dataConfidence")}
                invalid={Boolean(showError("dataConfidence"))}
                describedBy="dataConfidence-error"
              />
              <span
                id="dataConfidence-error"
                className={styles.error}
                aria-live="polite"
              >
                {showError("dataConfidence") ?? ""}
              </span>
            </div>

            <h3 className={styles.sectionHeading}>03 — What comes next</h3>
            <div
              className={styles.fieldset}
              role="group"
              aria-labelledby="unlocks-label"
              aria-describedby="unlocks-error"
            >
              <p id="unlocks-label" className={styles.label}>
                If these processes worked better, what would that unlock for
                your business?
              </p>
              <div className={styles.checkboxList}>
                {UNLOCKS.map((option) => (
                  <label key={option} className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      name="unlocks"
                      value={option}
                      checked={form.unlocks.includes(option)}
                      onChange={() => handleMultiToggle("unlocks", option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              <span
                id="unlocks-error"
                className={styles.error}
                aria-live="polite"
              >
                {showError("unlocks") ?? ""}
              </span>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="urgency">
                How urgent is it for you to address these issues?
              </label>
              <SelectControl
                id="urgency"
                name="urgency"
                value={form.urgency}
                options={URGENCY}
                onChange={(value) => handleChange("urgency", value)}
                onBlur={() => handleBlur("urgency")}
                invalid={Boolean(showError("urgency"))}
                describedBy="urgency-error"
              />
              <span
                id="urgency-error"
                className={styles.error}
                aria-live="polite"
              >
                {showError("urgency") ?? ""}
              </span>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="painPoints">
                Is there anything about your operations that feels especially
                broken, frustrating, or inefficient right now?
              </label>
              <textarea
                ref={painPointsRef}
                id="painPoints"
                name="painPoints"
                className={styles.textarea}
                value={form.painPoints}
                onChange={handleTextareaResize}
                onBlur={() => handleBlur("painPoints")}
              />
              <span className={styles.error} aria-live="polite">
                {""}
              </span>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="additionalNotes">
                What else would you like us to know before we review
                your responses?
              </label>
              <textarea
                ref={additionalNotesRef}
                id="additionalNotes"
                name="additionalNotes"
                className={styles.textarea}
                value={form.additionalNotes}
                onChange={handleTextareaResize}
                onBlur={() => handleBlur("additionalNotes")}
              />
              <span className={styles.error} aria-live="polite">
                {""}
              </span>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                name="email"
                className={styles.input}
                type="email"
                value={form.email}
                onChange={(event) => handleChange("email", event.target.value)}
                onBlur={() => handleBlur("email")}
                aria-required="true"
                aria-invalid={Boolean(showError("email"))}
                aria-describedby="email-error"
              />
              <span
                id="email-error"
                className={styles.error}
                aria-live="polite"
              >
                {showError("email") ?? ""}
              </span>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="phone">
                Phone number (optional)
              </label>
              <input
                id="phone"
                name="phone"
                className={styles.input}
                type="tel"
                value={form.phone}
                onChange={(event) => handleChange("phone", event.target.value)}
                onBlur={() => handleBlur("phone")}
                aria-invalid={Boolean(showError("phone"))}
                aria-describedby="phone-error"
              />
              <span
                id="phone-error"
                className={styles.error}
                aria-live="polite"
              >
                {showError("phone") ?? ""}
              </span>
            </div>

            {submitError && (
              <p className={styles.submitError} role="alert">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>

      {showToast && (
        <div className={styles.toastWrap} role="status" aria-live="polite">
          <div className={styles.toast}>
            <span>Thank you for your response.</span>
            <button
              type="button"
              className={styles.toastDismiss}
              onClick={() => setShowToast(false)}
              aria-label="Dismiss notification"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
