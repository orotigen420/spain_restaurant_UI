import Modal from '../../../uiparts/Modal';
import Button from '../../../uiparts/Button';
import { TickDouble02Icon } from 'hugeicons-react';
import styles from './style.module.scss';

interface BillConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onConfirm: () => void;
}

function BillConfirmModal({ isOpen, onClose, totalAmount, onConfirm }: BillConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName={styles.billModal}
    >
      <div className={styles.modalIconWrapper}>
        <TickDouble02Icon size={48} className={styles.modalIcon} />
      </div>
      <h2>お会計を承りました</h2>
      <div className={styles.modalContentBody}>
        <p className={styles.mainMessage}>
          伝票を持ってレジまでお越しください。
        </p>
        <div className={styles.modalTotalBox}>
          <span className={styles.totalLabel}>合計金額</span>
          <span className={styles.totalVal}>¥{totalAmount.toLocaleString()}</span>
        </div>
        <p className={styles.subMessage}>
          ご利用ありがとうございました。またのご来店をお待ちしております。
        </p>
      </div>
      <div className={styles.modalActions}>
        <Button
          variant="cta"
          text="退店する"
          onClick={onConfirm}
          layoutClass={styles.modalConfirmBtn}
        />
      </div>
    </Modal>
  );
}

export default BillConfirmModal;
