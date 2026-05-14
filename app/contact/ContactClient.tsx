"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ContactClient() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email) {
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen bg-background pt-40 pb-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-24 lg:grid-cols-[1fr_500px]">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col gap-16"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">Concierge</span>
              <h1 className="font-heading text-6xl sm:text-8xl">Contact.</h1>
              <p className="max-w-md text-sm font-light leading-relaxed text-foreground/60">
                Reach out for personal curation, custom artifacts, or any questions 
                regarding our modern ritual.
              </p>
            </div>

            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/40">Enquiries</span>
                <a href="mailto:concierge@aeris.studio" className="text-xl font-light hover:opacity-60 transition-opacity">concierge@aeris.studio</a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/40">Phone</span>
                <a href="tel:+1234567890" className="text-xl font-light hover:opacity-60 transition-opacity">+1 (234) 567 890</a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/40">The Studio</span>
                <address className="not-italic text-xl font-light text-foreground/80">
                  72 Ethereal Lane, <br />
                  Digital Mist, 10240
                </address>
              </div>
            </div>

            <div className="flex flex-col gap-6 pt-8">
              <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-foreground/40">Follow</span>
              <div className="flex gap-8">
                {["Instagram", "Twitter", "Pinterest"].map((social) => (
                  <button key={social} className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/40 hover:text-foreground transition-colors">
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="glass-mist rounded-3xl p-12"
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-6">
                <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-accent">Enquiry Received</span>
                <h3 className="font-heading text-4xl">We will reach out to you shortly.</h3>
                <button onClick={() => setIsSubmitted(false)} className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/40 hover:text-foreground">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                  <label className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/40">Name</label>
                  <input 
                    type="text" 
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    placeholder="Your Full Name" 
                    required
                    className="bg-transparent border-b border-foreground/10 pb-4 outline-none focus:border-foreground transition-colors text-sm font-light placeholder:text-foreground/10"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <label className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/40">Email</label>
                  <input 
                    type="email" 
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    placeholder="Email Address" 
                    required
                    className="bg-transparent border-b border-foreground/10 pb-4 outline-none focus:border-foreground transition-colors text-sm font-light placeholder:text-foreground/10"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <label className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/40">Message</label>
                  <textarea 
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    placeholder="Tell us about your curation..." 
                    className="bg-transparent border-b border-foreground/10 pb-4 outline-none focus:border-foreground transition-colors text-sm font-light placeholder:text-foreground/10 resize-none"
                  />
                </div>
                <button type="submit" className="group mt-4 flex h-16 w-full items-center justify-center gap-4 rounded-full bg-foreground text-background text-[10px] font-medium tracking-[0.2em] uppercase transition-all hover:bg-foreground/90 active:scale-[0.98]">
                  Send Inquiry
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
