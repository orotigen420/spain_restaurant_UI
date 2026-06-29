import React from 'react';
import styles from "./style.module.scss";

// TypeScript用の型定義（Propsの定義）
interface CtaButtonProps {
    text: string;
    Icon?: React.ComponentType<{ className?: string }>; // アイコンを受け取る場合の型定義
    iconPosition?: 'left' | 'right'; //アイコンの位置指定
}

function CtaButton({ text, Icon ,iconPosition}: CtaButtonProps) {
    return (
        <button className={styles.button}>
            {Icon && iconPosition === 'left' && <Icon className={styles.icon} />}
            <span className={styles.word}>{text}</span>
            {Icon && iconPosition === 'right' && <Icon className={styles.icon} />}
        </button>
    )
}

export default CtaButton;