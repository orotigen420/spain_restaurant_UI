import React from 'react';
import styles from "./style.module.scss";

interface GuestNumberCardProps {
    /** 表示する人数（1〜4名、またはそれ以上を示す 'more'） */
    number: 1 | 2 | 3 | 4 | 'more';

    /** カード選択（クリック）時の挙動 */
    onClick: () => void;
}

function GuestNumberCard({ number, onClick }: GuestNumberCardProps) {
    const label = number === 'more' ? '[5] ~' : `[${number}]`;
    const glassCount = number === 'more' ? 4 : number;

    return (
        <button className={styles.card} onClick={onClick}>
            <span className={styles.label}>{label}</span>
            <div className={styles.glassesContainer}>
                {Array.from({ length: glassCount }).map((_, index) => (
                    <img
                        key={index}
                        src="/wine.svg"
                        className={styles.glass}
                        alt="wine glass"
                    />
                ))}
                {number === 'more' && <span className={styles.dots}>...</span>}
            </div>
        </button>
    );
}

export default GuestNumberCard;