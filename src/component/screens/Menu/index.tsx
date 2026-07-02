
import { useNavigate } from 'react-router';
import { useApp } from '../../../context/AppContext';
import Button from '../../uiparts/Button';
import { ArrowLeft01Icon } from 'hugeicons-react';
import styles from './style.module.scss';

function Menu() {
  const { guestCount } = useApp();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Menu (メニュー画面)</h1>
        <p className={styles.guestInfo}>ご利用人数: {guestCount}名様</p>
      </div>

      <div className={styles.content}>
        <p>スペイン料理店のセルフオーダー画面がここに表示されます。</p>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.7 }}>
          （選択された人数「{guestCount}名」に基づいて、お会計時に割り勘価格を計算できます）
        </p>
      </div>

      <Button
        variant="secondary"
        text="人数選択へ戻る"
        icon={ArrowLeft01Icon}
        iconPosition="left"
        layoutClass={styles.backButton}
        onClick={() => navigate('/selectGuestNumber')}
      />
    </div>
  );
}

export default Menu;
