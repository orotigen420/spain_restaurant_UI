import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar, { type CategoryId } from './Sidebar';
import FoodCard from '../../uiparts/FoodCard';
import MenuBottomBar from './MenuBottomBar';
import styles from './style.module.scss';

interface FoodItem {
  id: string;
  categoryId: 'tapas' | 'pallea' | 'sweats' | 'drink';
  name: string;
  price: string;
  image: string;
  isSoldOut?: boolean;
}

const FOOD_ITEMS: FoodItem[] = [
  // Pallea (デザインのスペル「Pallea」に合わせています)
  { id: '0813', categoryId: 'pallea', name: 'Paella de Mariscos ', price: '¥1,500', image: '/img/pallea1.png' },
  { id: '0814', categoryId: 'pallea', name: 'Paella Valenciana Special', price: '¥1,600', image: '/img/pallea1.png' },
  { id: '0815', categoryId: 'pallea', name: 'Paella Negra de Calamar', price: '¥1,700', image: '/img/pallea1.png', isSoldOut: true },
  { id: '0816', categoryId: 'pallea', name: 'Paella de Verduras', price: '¥1,400', image: '/img/pallea1.png' },
  { id: '0817', categoryId: 'pallea', name: 'Paella de Pollo y Setas', price: '¥1,500', image: '/img/pallea1.png' },
  { id: '0818', categoryId: 'pallea', name: 'Paella Mixta Deluxe', price: '¥1,800', image: '/img/pallea1.png' },

  // Tapas
  { id: '0101', categoryId: 'tapas', name: 'Jamón Ibérico de Bellota', price: '¥1,200', image: '/img/pallea1.png' },
  { id: '0102', categoryId: 'tapas', name: 'Patatas Bravas Classic', price: '¥600', image: '/img/pallea1.png', isSoldOut: true },
  { id: '0103', categoryId: 'tapas', name: 'Gambas al Ajillo Hot', price: '¥900', image: '/img/pallea1.png' },
  { id: '0104', categoryId: 'tapas', name: 'Tortilla de Patatas', price: '¥700', image: '/img/pallea1.png' },
  { id: '0105', categoryId: 'tapas', name: 'Croquetas de Jamón', price: '¥650', image: '/img/pallea1.png' },
  { id: '0106', categoryId: 'tapas', name: 'Calamares a la Romana', price: '¥850', image: '/img/pallea1.png' },

  // Sweats
  { id: '0201', categoryId: 'sweats', name: 'Crema Catalana Caramel', price: '¥500', image: '/img/pallea1.png' },
  { id: '0202', categoryId: 'sweats', name: 'Churros con Chocolate', price: '¥600', image: '/img/pallea1.png' },
  { id: '0203', categoryId: 'sweats', name: 'Tarta de Queso Vasca', price: '¥650', image: '/img/pallea1.png' },
  { id: '0204', categoryId: 'sweats', name: 'Flan Casero con Nata', price: '¥480', image: '/img/pallea1.png' },

  // Drink
  { id: '0301', categoryId: 'drink', name: 'Sangria Tradicional', price: '¥700', image: '/img/pallea1.png' },
  { id: '0302', categoryId: 'drink', name: 'Cerveza Alhambra Especial', price: '¥650', image: '/img/pallea1.png' },
  { id: '0303', categoryId: 'drink', name: 'Café con Leche', price: '¥450', image: '/img/pallea1.png' },
  { id: '0304', categoryId: 'drink', name: 'Tinto de Verano', price: '¥600', image: '/img/pallea1.png' },
  { id: '0305', categoryId: 'drink', name: 'Zumo de Naranja Natural', price: '¥550', image: '/img/pallea1.png' },
];

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
  const filteredFoods = sortFoodsByAvailability(
    // カテゴリーによるフィルタリングと在庫状況による並べ替え
    activeCategory === 'all'
      ? FOOD_ITEMS
      : FOOD_ITEMS.filter((food) => food.categoryId === activeCategory)
  );

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
                onClick={() => console.log(`Clicked: ${food.name}`)}
              />
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* 下部ツールバー＆カートボタン（最前面フローティング） */}
      <MenuBottomBar />
    </div>
  );
}

export default Menu;
