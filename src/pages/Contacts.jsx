import { useEffect } from "react";
import ContactForm from "../components/ContactForm";

function Contact() {
  useEffect(() => {
    document.title = "Get In Touch | Dr. Fehintola Victor A.";
  }, []);

  return <ContactForm />;
}

export default Contact;
