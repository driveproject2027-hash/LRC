import { useCallback, useState } from "react";
import { submitContactMessage, type ContactSubmission } from "@/services/api";

export const emptyContactSubmission: ContactSubmission = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactSubmission>(
    emptyContactSubmission,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateField = useCallback(
    (field: keyof ContactSubmission, value: string) => {
      setFormData((current) => ({ ...current, [field]: value }));
      setSubmitError(null);
    },
    [],
  );

  const submit = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitContactMessage(formData);
      setFormData(emptyContactSubmission);
      return true;
    } catch {
      setSubmitError("We couldn't send your message. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  return { formData, updateField, submit, isSubmitting, submitError };
};
