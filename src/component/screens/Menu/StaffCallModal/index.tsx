import Modal from '../../../uiparts/Modal';
import { UserIcon } from 'hugeicons-react';
import styles from './style.module.scss';

interface StaffCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function StaffCallModal({ isOpen, onClose }: StaffCallModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName={styles.staffModal}
    >
      <div className={styles.modalIconWrapper}>
        <UserIcon size={48} className={styles.modalIcon} />
      </div>
      <h2>店員を呼んでいます</h2>
      <p className={styles.staffMessage}>しばらくお待ちください...</p>
    </Modal>
  );
}

export default StaffCallModal;
