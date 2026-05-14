import { Metadata } from "next";
import EditClient from "./EditClient";

export const metadata: Metadata = {
  title: "The Edit S/S 2024 | Seasonal Curation",
  description: "Explore the dialogue between raw material and refined vision. Our seasonal curation features the Solis Bracelet and Orb Ring.",
  openGraph: {
    title: "The Edit S/S 2024 | Seasonal Curation",
    description: "Modern Continuity in material and vision.",
    images: ["/edit-hero.png"],
  }
};

export default function Page() {
  return <EditClient />;
}
