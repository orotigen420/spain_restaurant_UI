import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../../context/AppContext';
import styles from "./style.module.scss";
import Button from '../../uiparts/Button';
import GuestNumberCard from '../../uiparts/GuestNumberCard';
import IconButton from '../../uiparts/IconButton';
import { ArrowRight01Icon, ArrowLeft01Icon, MinusSignIcon, PlusSignIcon } from "hugeicons-react";
import Modal from '../../uiparts/Modal';

function SelectGuestNumber() {
    const { setGuestCount } = useApp();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempCount, setTempCount] = useState(5);

    const handleSelectNumber = (num: 1 | 2 | 3 | 4) => {
        setGuestCount(num);
        navigate('/menu');
    };

    const handleMoreClick = () => {
        setIsModalOpen(true);
    };

    const handleModalConfirm = () => {
        setGuestCount(tempCount);
        setIsModalOpen(false);
        navigate('/menu');
    };

    return (
        <div className={styles.container}>
            <h1>ご利用人数を選択してください</h1>
            <div className={styles.grid}>
                <GuestNumberCard number={1} onClick={() => handleSelectNumber(1)} />
                <GuestNumberCard number={2} onClick={() => handleSelectNumber(2)} />
                <GuestNumberCard number={3} onClick={() => handleSelectNumber(3)} />
                <GuestNumberCard number={4} onClick={() => handleSelectNumber(4)} />
                <GuestNumberCard number="more" onClick={handleMoreClick} />
            </div>

            <Button
                variant="secondary"
                text="Back"
                icon={ArrowLeft01Icon}
                iconPosition="left"
                layoutClass={styles.backButton}
                to="/"
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                contentClassName={styles.modal}
            >
                <h2>ご利用人数を入力してください</h2>

                <div className={styles.stepper}>
                    <IconButton
                        icon={MinusSignIcon}
                        onClick={() => setTempCount(prev => Math.max(5, prev - 1))}
                        disabled={tempCount <= 5}
                        ariaLabel="人数を減らす"
                        size="lg"
                    />
                    <div className={styles.countContainer}>
                        <span className={styles.countNumber}>{tempCount}</span>
                        <span className={styles.unit}>名</span>
                    </div>
                    <IconButton
                        icon={PlusSignIcon}
                        onClick={() => setTempCount(prev => Math.min(99, prev + 1))}
                        disabled={tempCount >= 99}
                        ariaLabel="人数を増やす"
                        size="lg"
                    />
                </div>

                <div className={styles.modalActions}>
                    <Button
                        variant="secondary"
                        text="5人未満"
                        size="md"
                        icon={ArrowLeft01Icon}
                        iconPosition="left"
                        onClick={() => setIsModalOpen(false)}
                        layoutClass={styles.cancelBtn}
                    />
                    <Button
                        variant="cta"
                        text="OK"
                        icon={ArrowRight01Icon}
                        iconPosition="right"
                        size="md"
                        onClick={handleModalConfirm}
                        layoutClass={styles.confirmBtn}
                    />
                </div>
            </Modal>
        </div>
    );
}

export default SelectGuestNumber;