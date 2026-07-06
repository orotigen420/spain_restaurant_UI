import { Fragment } from 'react';
import { UserIcon, Search01Icon, Note01Icon, ArrowRight01Icon } from 'hugeicons-react';
import { useApp } from '../../../../context/AppContext';
import GlassCapsule from '../../../uiparts/GlassCapsule';
import Button from '../../../uiparts/Button';
import Badge from '../../../uiparts/Badge';
import styles from './style.module.scss';

interface MenuBottomBarProps {
    /** 店員を呼ぶボタンがクリックされたときのイベントハンドラ */
    onCallStaff?: () => void;

    /** IDで検索ボタンがクリックされたときのイベントハンドラ */
    onSearchClick?: () => void;

    /** 注文履歴ボタンがクリックされたときのイベントハンドラ */
    onViewHistory?: () => void;

    /** カートへ進むボタンがクリックされたときのイベントハンドラ */
    onGoToCart?: () => void;
}

function MenuBottomBar({
    onCallStaff = () => console.log('Call staff'),
    onSearchClick = () => console.log('Search click'),
    onViewHistory = () => console.log('View history'),
    onGoToCart = () => console.log('Go to cart')
}: MenuBottomBarProps) {
    const { totalCartQuantity } = useApp();

    // クイックアクションの定義リスト
    const actions = [
        {
            key: 'call-staff',
            label: <>店員を呼ぶ</>,
            icon: UserIcon,
            onClick: onCallStaff,
        },
        {
            key: 'search-id',
            label: <>IDで検索</>,
            icon: Search01Icon,
            onClick: onSearchClick,
        },
        {
            key: 'history',
            label: <>注文履歴</>,
            icon: Note01Icon,
            onClick: onViewHistory,
        },
    ];

    return (
        <div className={styles.bottomContainer}>
            {/* 左側：GlassCapsuleを使用したクイックアクションバー */}
            <GlassCapsule className={styles.leftToolbar}>
                {actions.map((action, index) => (
                    <Fragment key={action.key}>
                        <button className={styles.actionBtn} onClick={action.onClick}>
                            <action.icon size={24} className={styles.icon} />
                            <span className={styles.label}>{action.label}</span>
                        </button>
                        {index < actions.length - 1 && <div className={styles.divider} />}
                    </Fragment>
                ))}
            </GlassCapsule>

            {/* 右側：目立つオレンジのカートボタン＆バッジ */}
            <div className={styles.cartBtnWrapper}>
                <Button
                    variant="cta"
                    text="Go to Cart"
                    icon={ArrowRight01Icon}
                    iconPosition="right"
                    onClick={onGoToCart}
                    layoutClass={styles.cartBtn}
                />
                <Badge count={totalCartQuantity} className={styles.badge} />
            </div>
        </div>
    );
}

export default MenuBottomBar;
