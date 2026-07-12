import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { CONTACT_EMAIL } from "../config/contact";

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const submitWithMailto = (data) => {
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      "",
      data.message,
    ].join("\n");

    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    toast.success("Opening your email app to send the message.");
    reset();
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
            _subject: `Portfolio Contact: ${data.subject}`,
            _template: "table",
            _captcha: "false",
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Unable to send message.");
      }

      toast.success("Message sent successfully. I will get back to you soon.");
      reset();
    } catch {
      submitWithMailto(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-manila min-h-screen pb-16 pt-24" id="contact">
      <div className="container mx-auto px-4 py-10 md:py-14 max-w-6xl">
        
        <div className="mb-12 border-b-4 border-double border-ink pb-4">
          <span className="folder-tab">Intake Form</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-ink uppercase tracking-tight">
            Correspondence
          </h1>
          <p className="mt-2 text-ink-light font-mono text-sm uppercase">
            Submit inquiries for collaboration, speaking, or supervision.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div className="flex flex-col gap-8">
            <div className="border-2 border-ink p-6 bg-manila-dim shadow-[4px_4px_0px_#1A1A1A]">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 text-stamp mt-1">
                  <FiMail className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-serif font-bold text-ink uppercase tracking-wider mb-1">Email</h2>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="block text-ink-light font-mono text-sm hover:text-ledger underline decoration-2 underline-offset-4"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>

            <div className="border-2 border-ink p-6 bg-manila-dim shadow-[4px_4px_0px_#1A1A1A]">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 text-stamp mt-1">
                  <FiMapPin className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-serif font-bold text-ink uppercase tracking-wider mb-1">Location</h2>
                  <p className="text-ink-light font-mono text-sm leading-relaxed">
                    Faculty of Education,<br />
                    FCE (Special),<br />
                    Oyo, Nigeria
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-2 border-ink p-8 bg-manila shadow-[8px_8px_0px_#1A1A1A] relative"
            noValidate
          >
            {/* Form decorative stamp */}
            <div className="absolute -top-4 -right-4 border-2 border-ink bg-manila px-3 py-1 font-mono text-xs font-bold uppercase transform rotate-3">
              Official Use Only
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="intake-label">
                  01. FULL NAME
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className="intake-input"
                  placeholder="Applicant Name"
                  {...register("name", {
                    required: "Please enter your name.",
                    minLength: { value: 2, message: "Name must be at least 2 characters." },
                  })}
                />
                {errors.name && (
                  <p className="mt-2 font-mono text-xs text-stamp uppercase font-bold bg-[#D34836]/10 inline-block px-2">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="intake-label">
                  02. EMAIL ADDRESS
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="intake-input"
                  placeholder="name@institution.edu"
                  {...register("email", {
                    required: "Please enter your email address.",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Valid email required." },
                  })}
                />
                {errors.email && (
                  <p className="mt-2 font-mono text-xs text-stamp uppercase font-bold bg-[#D34836]/10 inline-block px-2">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="contact-subject" className="intake-label">
                03. SUBJECT
              </label>
              <input
                id="contact-subject"
                type="text"
                className="intake-input"
                placeholder="Nature of inquiry"
                {...register("subject", {
                  required: "Please enter a subject.",
                  minLength: { value: 3, message: "Subject must be at least 3 characters." },
                })}
              />
              {errors.subject && (
                <p className="mt-2 font-mono text-xs text-stamp uppercase font-bold bg-[#D34836]/10 inline-block px-2">{errors.subject.message}</p>
              )}
            </div>

            <div className="mt-6">
              <label htmlFor="contact-message" className="intake-label">
                04. MESSAGE / PROPOSAL
              </label>
              <textarea
                id="contact-message"
                rows={6}
                className="intake-input resize-y min-h-[160px]"
                placeholder="Detail your request..."
                {...register("message", {
                  required: "Please enter your message.",
                  minLength: { value: 10, message: "Message must be at least 10 characters." },
                })}
              />
              {errors.message && (
                <p className="mt-2 font-mono text-xs text-stamp uppercase font-bold bg-[#D34836]/10 inline-block px-2">{errors.message.message}</p>
              )}
            </div>

            <div className="mt-10 border-t-2 border-ink pt-6 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-typewriter btn-typewriter-primary w-full sm:w-auto"
              >
                {isSubmitting ? "PROCESSING..." : "SUBMIT INQUIRY"}
                <FiSend className="h-4 w-4 ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
