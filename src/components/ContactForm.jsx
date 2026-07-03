import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { CONTACT_EMAIL } from "../config/contact";

const inputClassName =
  "w-full rounded-xl border border-amber-500/40 bg-slate-900/95 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30";

const labelClassName = "mb-2 block text-sm font-medium text-amber-200";

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
    <section className="bg-linear-to-tl from-gray-800 to-black min-h-screen pb-16">
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg font-light tracking-wide text-yellow-500">
            Contact
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-wide text-yellow-500 md:text-5xl">
            Get In Touch
          </h1>
          <p className="mt-4 text-gray-400">
            Have a research collaboration, speaking request, or academic inquiry?
            Send a message and I will respond as soon as possible.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
                  <FiMail className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-semibold text-slate-100">Email</h2>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-1 block text-sm text-slate-400 transition hover:text-amber-400"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
                  <FiMapPin className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-semibold text-slate-100">Location</h2>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">
                    Faculty of Education,<br />
                    Federal College of Education (Special),<br />
                    Oyo, Oyo State, Nigeria
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl border border-amber-500/20 bg-slate-900/50 p-6 shadow-xl shadow-black/20 md:p-8"
            noValidate
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className={labelClassName}>
                  Full Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className={inputClassName}
                  placeholder="Your full name"
                  {...register("name", {
                    required: "Please enter your name.",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters.",
                    },
                  })}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className={labelClassName}>
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className={inputClassName}
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Please enter your email address.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address.",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="contact-subject" className={labelClassName}>
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                className={inputClassName}
                placeholder="What is this about?"
                {...register("subject", {
                  required: "Please enter a subject.",
                  minLength: {
                    value: 3,
                    message: "Subject must be at least 3 characters.",
                  },
                })}
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div className="mt-5">
              <label htmlFor="contact-message" className={labelClassName}>
                Message
              </label>
              <textarea
                id="contact-message"
                rows={6}
                className={`${inputClassName} resize-y min-h-[160px]`}
                placeholder="Write your message here..."
                {...register("message", {
                  required: "Please enter your message.",
                  minLength: {
                    value: 10,
                    message: "Message must be at least 10 characters.",
                  },
                })}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-400 bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiSend className="h-4 w-4" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
