// Styling
import styles from './alert.module.scss';

// React
import { useState, useEffect } from 'react';

// MUI
import { 
  Alert as MUIAlert,
  Button
} from '@mui/material';

// MUI Icons
import { 
  Close 
} from '@mui/icons-material';

// Props
import AlertProps from '../../../props/alert';

// Animations
import { AnimatePresence, motion } from 'framer-motion';
import fadeScale from '../../../animations/fade-scale';

const Alert = (props: React.PropsWithChildren<AlertProps>) => {
  const { content, severity, showAlert, callback, position, action, autoHideDuration } = props;

  const [autoCloseTimeout, setAutoCloseTimeout] = useState<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!showAlert) return;

    const autoTimeout = setTimeout(() => {
      callback();
    }, 6000 || autoHideDuration);

    setAutoCloseTimeout(autoTimeout);
  }, [showAlert, callback, autoHideDuration]);

  const dismiss = () => {
    clearTimeout(autoCloseTimeout);
    callback();
  }

  return (
    <AnimatePresence>
      {showAlert &&
        <motion.div 
          className={styles.container}
          key="modal" 
          initial="hidden" 
          animate="visible" 
          exit="exit"
          variants={fadeScale}
        >
          <MUIAlert className={`${styles.alert} ${styles[position || '']}`} variant='filled' severity={severity}>
            <p className={styles.text}>
              {content}
              <Close className={styles.dismiss} onClick={() => dismiss()}></Close>
            </p>

            {/* <div className={styles.buttons}>

              {action && 
                <Button className={`${styles.action} button`} variant='contained' onClick={() => action()}>
                  hello
                </Button>
              }
            </div> */}
          </MUIAlert>
        </motion.div>
      }
    </AnimatePresence>
  )
}

export default Alert;