import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../../context/AppContext';
import styles from "./style.module.scss";
import Button from '../../uiparts/Button';
import GuestNumberCard from '../../uiparts/GuestNumberCard';
import { ArrowLeft01Icon, MinusSignIcon, PlusSignIcon } from "hugeicons-react";

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

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2>ご利用人数を入力してください</h2>

                        <div className={styles.stepper}>
                            <button
                                type="button"
                                className={styles.stepBtn}
                                onClick={() => setTempCount(prev => Math.max(5, prev - 1))}
                                disabled={tempCount <= 5}
                            >
                                <MinusSignIcon size={24} />
                            </button>
                            <span className={styles.count}>
                                {tempCount}
                                <span className={styles.unit}>名</span>
                            </span>
                            <button
                                type="button"
                                className={styles.stepBtn}
                                onClick={() => setTempCount(prev => Math.min(99, prev + 1))}
                            >
                                <PlusSignIcon size={24} />
                            </button>
                        </div>

                        <div className={styles.modalActions}>
                            <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>
                                キャンセル
                            </button>
                            <button type="button" className={styles.confirmBtn} onClick={handleModalConfirm}>
                                確定
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SelectGuestNumber;