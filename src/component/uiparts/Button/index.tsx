import React from 'react';
import { Link } from 'react-router';
import styles from "./style.module.scss";

// propsの定義
interface CtaButtonProps {
    variant: 'cta' | 'secondary' //ボタンの種類
    text: string; //ボタンに挿入する文言
    icon?: React.ComponentType<{ size?: number; className?: string }>; //どういったアイコンを使うか
    iconPosition?: 'left' | 'right'; //ボタン内アイコンと文言の位置関係
    layoutClass?: string; //外部からボタンそのものの位置を操作
    onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void; //クリック時の処理
    to?: string; //遷移先パス
}

function CtaButton({ variant, text, icon: Icon, iconPosition = 'right', layoutClass, onClick, to }: CtaButtonProps) {
    const buttonClassName = `${styles.button} ${layoutClass || ""} ${styles[variant]}`;
    if (to) {
        return (
            <Link to={to} className={buttonClassName} data-icon-position={iconPosition} onClick={onClick}>
                {Icon && iconPosition === 'left' && <Icon className={styles.icon} />}
                <span className={styles.word}>{text}</span>
                {Icon && iconPosition === 'right' && <Icon className={styles.icon} />}
            </Link>
        )
    }
    return (
        <button className={buttonClassName} data-icon-position={iconPosition} onClick={onClick}>
            {Icon && iconPosition === 'left' && <Icon className={styles.icon} />}
            <span className={styles.word}>{text}</span>
            {Icon && iconPosition === 'right' && <Icon className={styles.icon} />}
        </button>
    )
}

export default CtaButton;