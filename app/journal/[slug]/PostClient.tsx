"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

const postData = {
  "art-of-layering": {
    title: "The Art of Layering.",
    subtitle: "A Guide to Weightless Composition",
    date: "May 12, 2024",
    category: "Curation",
    image: "/journal.png",
    content: [
      {
        type: "p",
        text: "In the dialogue between material and vision, layering acts as the rhythmic punctuation. It is the art of building a physical narrative that settles into your unique ritual. At AERIS, we approach layering with a minimalist architectural vision—focusing on depth, length, and metal hierarchy."
      },
      {
        type: "h3",
        text: "1. The Foundation"
      },
      {
        type: "p",
        text: "Every composition starts with a single anchor. Choose a piece that holds the most light or has the most material weight. For the Morning Mist collection, this is often the Mist Pendant. It provides the grounding center from which other artifacts can drift."
      },
      {
        type: "p",
        text: "Consider the negative space between the neck and the first layer. This 'Air Buffer' is critical for maintaining the weightless identity of the look."
      },
      {
        type: "h3",
        text: "2. The Rhythm of Lengths"
      },
      {
        type: "p",
        text: "Vary your lengths by 2-inch increments to ensure each artifact has its own 'Atmospheric Zone.' This prevents tangling and allows the individual details—like the hammered texture of the Solis Bracelet—to be seen in isolation."
      }
    ]
  },
  "material-ritual": {
    title: "The Material Ritual.",
    subtitle: "Dialogue between the Permanent and the Fluid",
    date: "May 08, 2024",
    category: "Lifestyle",
    image: "/ritual.png",
    content: [
      {
        type: "p",
        text: "Establsihing a daily ritual with your artifacts is a moment of material clarity. It is the process of physically grounding your digital vision. Our ritual guide explores how to care for, layer, and emotionally connect with your AERIS pieces."
      }
    ]
  }
};

export default function PostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = postData[slug as keyof typeof postData];

  if (!post) return <div>Post not found.</div>;

  return (
    <article className="min-h-screen bg-background pb-24">
      {/* Cinematic Header */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2.5 }}
          className="absolute inset-0"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
        </motion.div>

        <div className="container relative z-10 mx-auto flex h-full flex-col justify-end px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="flex flex-col gap-8 max-w-4xl"
          >
            <Link href="/journal" className="flex items-center gap-3 text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/40 hover:text-foreground transition-colors mb-4">
              <ArrowLeft className="w-3 h-3" />
              Back to Journal
            </Link>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">{post.category}</span>
                <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/20">{post.date}</span>
              </div>
              <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl leading-tight">{post.title}</h1>
              <p className="text-xl font-light italic opacity-60">{post.subtitle}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Post Content */}
      <section className="container mx-auto px-6 pt-24 max-w-3xl">
        <div className="flex flex-col gap-12">
          {post.content.map((block, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: idx * 0.1 }}
            >
              {block.type === "h3" ? (
                <h3 className="font-heading text-3xl mb-4">{block.text}</h3>
              ) : (
                <p className="text-lg font-light leading-relaxed text-foreground/60 mb-6">
                  {block.text}
                </p>
              )}
            </motion.div>
          ))}

          <div className="h-px w-full bg-foreground/5 mt-12" />

          <div className="flex items-center justify-between pt-8">
            <div className="flex items-center gap-6">
              <button className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/40 hover:text-foreground transition-colors">Share Artifact</button>
              <button className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/40 hover:text-foreground transition-colors">Pinterest</button>
            </div>
            <Link href="/shop" className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground hover:opacity-60 transition-opacity">
              Explore Collection
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
