// Styling
import styles from './alert.module.scss';

// React
import { useState, useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import alertActions from '../../../store/actions/alertActions';

// MUI
import { 
  Alert as MUIAlert,
  Button
} from '@mui/material';

// MUI Icons
import { 
  Close 
} from '@mui/icons-material';

// Animations
import { AnimatePresence, motion } from 'framer-motion';
import fadeScale from '../../../animations/fade-scale';

interface AlertProps {
  position?: string,
  severity?: any, // success, error, warning, info
}

const Alert = (props: React.PropsWithChildren<AlertProps>) => {
  const { position } = props;

  const dispatch = useDispatch();
  const alert = useSelector((state: any) => state.alert);

  const [autoCloseTimeout, setAutoCloseTimeout] = useState<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!alert.showing) return;

    const hideAlert = () => {
      dispatch(alertActions.setShowing(false));
      dispatch(alertActions.setContent(''));
      dispatch(alertActions.setSeverity('')); 
    }

    const autoTimeout = setTimeout(() => {
      hideAlert();
    }, 6000);

    setAutoCloseTimeout(autoTimeout);
  }, [alert.showing, dispatch]);

  const dismiss = () => {
    clearTimeout(autoCloseTimeout);
    dispatch(alertActions.setShowing(false));
    dispatch(alertActions.setContent(''));
    dispatch(alertActions.setSeverity(''));   }

  return (
    <AnimatePresence>
      {alert.showing &&
        <motion.div 
          className={styles.container}
          key="modal" 
          initial="hidden" 
          animate="visible" 
          exit="exit"
          variants={fadeScale}
        >
          <MUIAlert className={`${styles.alert} ${styles[position || '']}`} variant='filled' severity={alert.severity}>
            <p className={styles.text}>
              {alert.content}
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