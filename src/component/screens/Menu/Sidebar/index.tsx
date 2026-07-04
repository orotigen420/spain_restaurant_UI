import { useApp } from '../../../../context/AppContext';
import CategoryTab from '../../../uiparts/CategoryTab';
import styles from './style.module.scss';

// カテゴリーの定義（ID、表示名、テーマカラー用クラス名）
const CATEGORIES = [
  { id: 'all', label: 'All', theme: 'lemon' },
  { id: 'tapas', label: 'Tapas', theme: 'olive' },
  { id: 'pallea', label: 'Pallea', theme: 'orange' },
  { id: 'sweats', label: 'Sweats', theme: 'grape' },
  { id: 'drink', label: 'Drink', theme: 'sky' },
] as const;

type CategoryId = typeof CATEGORIES[number]['id'];

interface SidebarProps {
  activeCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
}

function Sidebar({ activeCategory, onSelectCategory }: SidebarProps) {
  const { guestCount } = useApp();

  // 人数を2桁表示にするためのフォーマッタ (e.g. 4 -> "04")
  const formattedGuestCount = String(guestCount).padStart(2, '0');

  return (
    <aside className={styles.sidebar}>
      <div className={styles.topSection}>
        <h1 className={styles.logoTitle}>
          The<br />
          Spanish<br />
          Heaven
        </h1>
        <p className={styles.filterLabel}>カテゴリーで絞り込む</p>
      </div>

      <nav className={styles.nav}>
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <CategoryTab
              key={category.id}
              label={category.label}
              theme={category.theme}
              isActive={isActive}
              onClick={() => onSelectCategory(category.id)}
            />
          );
        })}
      </nav>

      <div className={styles.bottomSection}>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>人数:</span>
          <span className={styles.infoValue}>{formattedGuestCount}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Table Number:</span>
          <span className={styles.infoValue}>01</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
export type { CategoryId };
