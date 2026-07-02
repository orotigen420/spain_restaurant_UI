import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import styles from './style.module.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;        // overlay (背景) の配置やスタイルを外部から調整したい場合用
    contentClassName?: string; // modal (コンテンツ箱) 自体のスタイルを調整したい場合用
    children: ReactNode;
}

function Modal({ isOpen, onClose, className = '', contentClassName = '', children }: ModalProps) {
    if (!isOpen) return null;

    return createPortal(
        <motion.div
            className={`${styles.overlay} ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={onClose}
        >
            <motion.div
                className={`${styles.modalContent} ${contentClassName}`}
                initial={{ scale: 0.9, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 15, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                onClick={(e) => e.stopPropagation()} // ポップアップ内部クリック時のイベント伝播を防ぐ
            >
                {children}
            </motion.div>
        </motion.div>,
        document.body
    );
}

export default Modal;
