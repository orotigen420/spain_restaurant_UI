import styles from './style.module.scss';

export type CategoryTheme = 'amber' | 'olive' | 'terracotta' | 'cinnamon' | 'sangria';

interface CategoryTabProps {
  /** タブに表示するテキスト */
  label: string;
  
  /** タブのテーマカラー（インジケーターやアクティブ時の背景色） */
  theme: CategoryTheme;
  
  /** アクティブ（選択中）状態かどうか */
  isActive: boolean;
  
  /** クリック時のコールバック */
  onClick: () => void;
}

function CategoryTab({ label, theme, isActive, onClick }: CategoryTabProps) {
  return (
    <button
      className={`${styles.categoryBtn} ${styles[theme]} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      <div className={styles.colorIndicator} />
      <span className={styles.categoryLabel}>{label}</span>
    </button>
  );
}

export default CategoryTab;
