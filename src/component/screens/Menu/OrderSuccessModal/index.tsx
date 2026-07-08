import { motion, AnimatePresence } from 'framer-motion';
import { TickDouble02Icon } from 'hugeicons-react';
import styles from './style.module.scss';

interface OrderSuccessModalProps {
  isOpen: boolean;
}

function OrderSuccessModal({ isOpen }: OrderSuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={styles.card}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, damping: 15 }}
          >
            <div className={styles.iconWrapper}>
              <TickDouble02Icon size={48} className={styles.successIcon} />
            </div>
            <h2 className={styles.successTitle}>Order Sent</h2>
            <p className={styles.successMessage}>
              ご注文承りました。<br />ご提供までしばらくお待ちください。
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default OrderSuccessModal;
