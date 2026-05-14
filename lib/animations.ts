// AERIS Cinematic Animation Tokens
// The AERIS easing curve: A sharp initial movement that glacially slows to a halt, mimicking weightlessness.
export const aerisEasing = [0.22, 1, 0.36, 1] as const;

// Viewport configuration for scroll animations
export const defaultViewport = { once: true, margin: "-100px" };

// Shared Animation Variants
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1.5, ease: aerisEasing }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const childFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: aerisEasing }
  }
};

export const cinematicBackground = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 2.5, ease: aerisEasing }
  }
};
