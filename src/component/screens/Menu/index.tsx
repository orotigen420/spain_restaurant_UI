import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar, { type CategoryId } from './Sidebar';
import FoodCard from '../../uiparts/FoodCard';
import MenuBottomBar from './MenuBottomBar';
import FoodDetailModal from './FoodDetailModal';
import styles from './style.module.scss';

import { useApp } from '../../../context/AppContext';
import foodItemsRaw from '../../../data/foodItems.json';

interface FoodItem {
  id: string;
  categoryId: 'tapas' | 'paella' | 'sweets' | 'drink';
  name: string;
  japanese_name: string;
  discription: string;
  price: string;
  image: string;
  isSoldOut?: boolean;
}

const FOOD_ITEMS = foodItemsRaw as FoodItem[];

// 親コンテナのアニメーション設定
const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // 0.05秒間隔で子要素を順次アニメーション
    },
  },
} as const;

// 子要素（各カード）のアニメーション設定
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 14,
    },
  },
} as const;

/**
 * 在庫ありの商品を先頭に、品切れ（isSoldOut: true）の商品を末尾に並べ替える
 */
function sortFoodsByAvailability(foods: FoodItem[]): FoodItem[] {
  const available = foods.filter((food) => !food.isSoldOut);
  const soldOut = foods.filter((food) => food.isSoldOut);
  return [...available, ...soldOut];
}

function Menu() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useApp();

  const filteredFoods = sortFoodsByAvailability(
    // カテゴリーによるフィルタリングと在庫状況による並べ替え
    activeCategory === 'all'
      ? FOOD_ITEMS
      : FOOD_ITEMS.filter((food) => food.categoryId === activeCategory)
  );

  const handleCardClick = (food: FoodItem) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const handleAddToCart = (food: FoodItem, quantity: number) => {
    addToCart(food.id, quantity);
  };

  return (
    <div className={styles.container}>
      {/* サイドバー */}
      <Sidebar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* メニューコンテンツ表示エリア */}
      <main className={styles.mainContent}>
        {/* key={activeCategory} を指定することで、カテゴリー切り替え時にもアニメーションが再トリガーされます */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className={styles.menuGrid}
        >
          {filteredFoods.map((food) => (
            <motion.div key={food.id} variants={itemVariants}>
              <FoodCard
                id={food.id}
                name={food.name}
                price={food.price}
                image={food.image}
                isSoldOut={food.isSoldOut}
                onClick={() => handleCardClick(food)}
              />
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* 下部ツールバー＆カートボタン（最前面フローティング） */}
      <MenuBottomBar />

      {/* 商品詳細モーダル */}
      <FoodDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        foodItem={selectedFood}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default Menu;
