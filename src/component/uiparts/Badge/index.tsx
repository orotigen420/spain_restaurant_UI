import { motion, AnimatePresence } from 'framer-motion';
import styles from './style.module.scss';

interface BadgeProps {
  /** 表示する数値 */
  count: number;

  /** 数値の最大上限値（例: 99 を指定すると 100 のときに "99+" と表示される） */
  maxCount?: number;

  /** 配置場所の微調整などのためのカスタムクラス */
  className?: string;
}

function Badge({ count, maxCount = 99, className = '' }: BadgeProps) {
  const displayCount = count > maxCount ? `${maxCount}+` : count;
  const isVisible = count > 0;

  return (
    <>
      {isVisible &&
        (<div className={`${styles.badge} ${className}`}>
          {displayCount}
        </div>)}
    </>
  );
}

export default Badge;
