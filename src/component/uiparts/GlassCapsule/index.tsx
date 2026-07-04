import React from 'react';
import styles from './style.module.scss';

interface GlassCapsuleProps {
    /** カプセル内に表示する子要素 */
    children: React.ReactNode;
    
    /** 外部から位置調整やスタイル拡張を行うための追加CSSクラス */
    className?: string;
    
    /** クリック時のコールバック関数 */
    onClick?: () => void;
}

function GlassCapsule({ children, className = '', onClick }: GlassCapsuleProps) {
    return (
        <div 
            className={`${styles.capsule} ${className}`} 
            onClick={onClick}
        >
            {children}
        </div>
    );
}

export default GlassCapsule;
