export const arrowVariants = {
  close: {
    rotate: 360,
    transition: {
      ease: "easeInOut",
      duration: 0.5,
    },
  },
  open: {
    rotate: 180,
    transition: {
      ease: "easeInOut",
      duration: 0.5,
    },
  },
};

export const navVariants = {
  close: {
    width: "5rem",
    transition: {
      type: "spring",
      damping: 12,
      duration: 0.5,
    },
  },
  open: {
    width: "16rem",
    transition: {
      type: "spring",
      damping: 12,
      duration: 0.5,
    },
  },
};

export const projectsContainerVariants = {
  close: {
    height: "2.75rem",
    transition: {
      ease: "easeInOut",
      duration: 0.15,
    },
  },
  open: {
    height: "auto",
    transition: {
      ease: "easeInOut",
      duration: 0.15,
    },
  },
};
