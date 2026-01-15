"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Contact.module.css";

const INITIAL_FORM = {
  email: "",
  phone: "",
  message: "",
};

type FormState = typeof INITIAL_FORM;

type FormErrors = Partial<Record<keyof FormState, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getPhoneDigits = (value: string) => value.replace(/[^\d]/g, "");

const validateForm = (form: FormState): FormErrors => {
  const errors: FormErrors = {};

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

  if (!form.message.trim()) {
    errors.message = "Message is required.";
  }

  return errors;
};

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const errors = useMemo(() => validateForm(form), [form]);

  const showError = (field: keyof FormState) =>
    (submitAttempted || touched[field]) && errors[field];

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleClose = () => {
    setIsOpen(false);
    setSubmitAttempted(false);
    setTouched({});
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);

    const currentErrors = validateForm(form);
    if (Object.keys(currentErrors).length > 0) {
      return;
    }

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    setForm(INITIAL_FORM);
    setSubmitAttempted(false);
    setTouched({});
    setIsOpen(false);
    setShowToast(true);
    toastTimer.current = setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setSubmitAttempted(false);
        setTouched({});
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <section id="contact" className={styles.section} aria-label="Contact Us">
      <div className={styles.container}>
        <button
          type="button"
          className={styles.ctaButton}
          onClick={() => setIsOpen(true)}
        >
          Contact Us
        </button>
      </div>

      {isOpen && (
        <div
          className={styles.backdrop}
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              handleClose();
            }
          }}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            <header className={styles.header}>
              <div className={styles.headerText}>
                <h2 id="contact-modal-title" className={styles.title}>
                  Contact Us
                </h2>
                <p className={styles.subtitle}>
                  Tell us a bit about what you need and we will follow up.
                </p>
              </div>
              <button
                type="button"
                className={styles.closeButton}
                onClick={handleClose}
                aria-label="Close contact form"
              >
                X
              </button>
            </header>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-email">
                  Email address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  className={styles.input}
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                  onBlur={() => handleBlur("email")}
                  aria-required="true"
                  aria-invalid={Boolean(showError("email"))}
                  aria-describedby="contact-email-error"
                />
                <span
                  id="contact-email-error"
                  className={styles.error}
                  aria-live="polite"
                >
                  {showError("email") ?? ""}
                </span>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-phone">
                  Phone number (optional)
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  className={styles.input}
                  type="tel"
                  value={form.phone}
                  onChange={(event) =>
                    handleChange("phone", event.target.value)
                  }
                  onBlur={() => handleBlur("phone")}
                  aria-invalid={Boolean(showError("phone"))}
                  aria-describedby="contact-phone-error"
                />
                <span
                  id="contact-phone-error"
                  className={styles.error}
                  aria-live="polite"
                >
                  {showError("phone") ?? ""}
                </span>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className={styles.textarea}
                  value={form.message}
                  onChange={(event) =>
                    handleChange("message", event.target.value)
                  }
                  onBlur={() => handleBlur("message")}
                  aria-required="true"
                  aria-invalid={Boolean(showError("message"))}
                  aria-describedby="contact-message-error"
                />
                <span
                  id="contact-message-error"
                  className={styles.error}
                  aria-live="polite"
                >
                  {showError("message") ?? ""}
                </span>
              </div>

              <button type="submit" className={styles.submitButton}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

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
