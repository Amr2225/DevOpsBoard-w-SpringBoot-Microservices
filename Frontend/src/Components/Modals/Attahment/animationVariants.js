export const listVariants = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Set the stagger delay between child animations
    },
  },
  hidden: {
    opacity: 0,
  },
};

export const itemVariants = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: 20,
  },
};
