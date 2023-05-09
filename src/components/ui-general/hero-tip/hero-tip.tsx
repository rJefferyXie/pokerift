// Styling
import styles from './hero-tip.module.scss';

// Animations
import { motion } from 'framer-motion';
import fadeLeft from '../../../animations/fade-left';
import fadeRight from '../../../animations/fade-right';

// Props
import HeroTipProps from '../../../props/hero-tip';

const HeroTip = (props: React.PropsWithChildren<HeroTipProps>) => {
  const { content, order } = props;

  return (
    <motion.div 
      className={styles.container}
      key="modal" 
      initial="hidden" 
      animate="visible" 
      transition={{delay: order - 1, duration: 1, type: "spring"}}
      variants={order % 2 === 0 ? fadeLeft : fadeRight}
    >
      {content}
    </motion.div>
  );
}

export default HeroTip;