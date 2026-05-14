import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Our Narrative | The AERIS Story",
  description: "We build artifacts for the Modern Ritual. Explore the vision and material integrity behind AERIS Studio.",
  openGraph: {
    title: "Our Narrative | The AERIS Story",
    description: "Dialogue between the permanent and the fluid.",
    images: ["/about.png"],
  }
};

export default function Page() {
  return <AboutClient />;
}
