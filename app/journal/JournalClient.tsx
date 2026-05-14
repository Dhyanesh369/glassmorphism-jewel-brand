"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const posts = [
  {
    title: "The Art of Layering",
    date: "May 12, 2024",
    category: "Curation",
    image: "/journal.png",
    slug: "art-of-layering",
    description: "Discover the curated rules of weightless composition. From metal mixing to length hierarchy."
  },
  {
    title: "The Material Ritual",
    date: "May 08, 2024",
    category: "Lifestyle",
    image: "/ritual.png",
    slug: "material-ritual",
    description: "Establishing a dialogue between the permanent and the fluid. A guide to your daily artifact ritual."
  }
];

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-background pt-40 pb-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col gap-6 mb-24"
        >
          <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">Editorial</span>
          <h1 className="font-heading text-6xl sm:text-8xl">The Journal.</h1>
          <p className="max-w-xl text-sm font-light leading-relaxed text-foreground/60">
            A dialogue on vision, material, and the art of enduring beauty.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-24 lg:grid-cols-2">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: index * 0.2 }}
              className="group flex flex-col gap-8"
            >
              <Link href={`/journal/${post.slug}`} className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-secondary/20">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/40">{post.category}</span>
                    <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/20">{post.date}</span>
                  </div>
                  <h2 className="font-heading text-4xl leading-tight group-hover:opacity-60 transition-opacity">
                    {post.title}
                  </h2>
                  <p className="max-w-md text-sm font-light leading-relaxed text-foreground/40">
                    {post.description}
                  </p>
                </div>
                <Link href={`/journal/${post.slug}`} className="group/link flex items-center gap-4 text-[10px] font-medium tracking-[0.2em] uppercase text-foreground">
                  Read Entry
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
