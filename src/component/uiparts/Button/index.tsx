import React from 'react';
import { Link } from 'react-router';
import styles from "./style.module.scss";

// propsの定義
interface CtaButtonProps {
    /** ボタンの見た目バリアント（メインの黄色グラデーション / 二次アクション用） */
    variant: 'cta' | 'secondary';

    /** ボタンに表示するテキスト */
    text: string;

    /** 表示するアイコン（コンポーネント、またはJSXエレメント） */
    icon?: React.ComponentType<{ className?: string }> | React.ReactNode;

    /** アイコンとテキストの配置順（デフォルト: right） */
    iconPosition?: 'left' | 'right';

    /** ボタンのサイズ（デフォルト: lg） */
    size?: 'sm' | 'md' | 'lg';

    /** 外部からレイアウトや余白を調整するための追加クラス名 */
    layoutClass?: string;

    /** クリック時の挙動（button または Link の両方に対応） */
    onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;

    /** 画面遷移先のパス（指定された場合は a タグ、未指定の場合は button タグとしてレンダリングします） */
    to?: string;

    /** アクセシビリティ用の音声読み上げラベル */
    ariaLabel?: string;
}

function CtaButton({
    variant,
    text,
    icon: Icon,
    iconPosition = 'right',
    layoutClass,
    onClick,
    to,
    size = 'lg',
    ariaLabel
}: CtaButtonProps) {
    const buttonClassName = `${styles.button} ${layoutClass || ""} ${styles[variant]} ${styles[size]}`;

    const renderIcon = () => {
        if (!Icon) return null;
        if (React.isValidElement(Icon)) {
            return Icon;
        }
        const Component = Icon as React.ComponentType<{ className?: string }>;
        return <Component className={styles.icon} />;
    };

    if (to) {
        return (
            <Link
                to={to}
                className={buttonClassName}
                data-icon-position={iconPosition}
                onClick={onClick}
                aria-label={ariaLabel}
            >
                {iconPosition === 'left' && renderIcon()}
                <span className={styles.word}>{text}</span>
                {iconPosition === 'right' && renderIcon()}
            </Link>
        )
    }
    return (
        <button
            className={buttonClassName}
            data-icon-position={iconPosition}
            onClick={onClick}
            aria-label={ariaLabel}
        >
            {iconPosition === 'left' && renderIcon()}
            <span className={styles.word}>{text}</span>
            {iconPosition === 'right' && renderIcon()}
        </button>
    )
}

export default CtaButton;