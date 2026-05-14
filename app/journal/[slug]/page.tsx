import { Metadata } from "next";
import PostClient from "./PostClient";

const postData = {
  "art-of-layering": {
    title: "The Art of Layering.",
    subtitle: "A Guide to Weightless Composition",
    description: "Discover the curated rules of weightless composition. From metal mixing to length hierarchy.",
    image: "/journal.png",
  },
  "material-ritual": {
    title: "The Material Ritual.",
    subtitle: "Dialogue between the Permanent and the Fluid",
    description: "Establishing a dialogue between the permanent and the fluid. A guide to your daily artifact ritual.",
    image: "/ritual.png",
  }
};

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = postData[slug as keyof typeof postData];
  
  if (!post) {
    return { title: 'Entry Not Found | AERIS' }
  }

  return {
    title: `${post.title} | The Journal`,
    description: post.description,
    openGraph: {
      title: `${post.title} | AERIS Journal`,
      description: post.description,
      url: `https://aeris.studio/journal/${slug}`,
      images: [{ url: post.image }],
    }
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = postData[slug as keyof typeof postData];

  if (!post) return <div className="min-h-screen flex items-center justify-center text-foreground/40">Entry not found.</div>;

  return <PostClient />;
}
