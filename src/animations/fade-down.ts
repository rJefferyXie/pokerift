const fadeInOut = {
  hidden: {
    y: '-5vh',
    opacity: 0,
    transition: {
      duration: 0.25
    }
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.25
    }
  },
  exit: {
    y: '5vh',
    opacity: 0,
    transition: {
      duration: 0.25
    }
  }
}

export default fadeInOut;