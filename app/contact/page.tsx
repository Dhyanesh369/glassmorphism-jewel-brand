import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Concierge | Contact AERIS",
  description: "Reach out for personal curation, custom artifacts, or any questions regarding our modern ritual.",
  openGraph: {
    title: "Concierge | Contact AERIS",
    description: "Reach out for personal curation or custom artifacts.",
  }
};

export default function Page() {
  return <ContactClient />;
}
