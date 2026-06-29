import React from 'react';
import styles from "./style.module.scss";

// propsの定義
interface CtaButtonProps {
    variant: 'cta' | 'secondary' //ボタンの種類
    text: string; //ボタンに挿入する文言
    icon?: React.ComponentType<{ size?: number; className?: string }>; //どういったアイコンを使うか
    iconPosition?: 'left' | 'right'; //ボタン内アイコンと文言の位置関係
    layoutClass?:string; //外部からボタンそのものの位置を操作
    
}

function CtaButton({variant,text, icon: Icon, iconPosition = 'right', layoutClass}: CtaButtonProps) {
    return (
        <button className={`${styles.button} ${layoutClass ||""} ${styles[variant]}`}
        data-icon-position={iconPosition} >
            {Icon && iconPosition === 'left' && <Icon className={styles.icon} />}
            <span className={styles.word}>{text}</span>
            {Icon && iconPosition === 'right' && <Icon className={styles.icon} />}
        </button>
    )
}

export default CtaButton;