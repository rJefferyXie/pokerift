const fadeScale = {
  hidden: {
    scale: 0.2,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.25
    }
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.25
    }
  }
}

export default fadeScale;