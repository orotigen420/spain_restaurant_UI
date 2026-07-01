import React from 'react';
import styles from "./style.module.scss";

interface IconButtonProps {
    /** 表示するアイコン（hugeicons-react などのコンポーネント） */
    icon: React.ComponentType<{ size?: number; className?: string }>;
    
    /** クリック時の挙動 */
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    
    /** ボタンのサイズ（デフォルト: md） */
    size?: 'sm' | 'md' | 'lg';
    
    /** 無効化状態 */
    disabled?: boolean;
    
    /** アクセシビリティ用ラベル */
    ariaLabel?: string;
    
    /** 外部から追加スタイルを当てるためのクラス名 */
    layoutClass?: string;
}

function IconButton({
    icon: Icon,
    onClick,
    size = 'md',
    disabled = false,
    ariaLabel,
    layoutClass
}: IconButtonProps) {
    const buttonClassName = `${styles.iconButton} ${layoutClass || ""} ${styles[size]}`;
    
    // サイズに合わせてアイコンの大きさを決定
    const iconSize = size === 'sm' ? 18 : size === 'md' ? 24 : 32;

    return (
        <button
            type="button"
            className={buttonClassName}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
        >
            <Icon size={iconSize} />
        </button>
    );
}

export default IconButton;
