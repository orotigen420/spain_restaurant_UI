import React, { useState } from 'react';
import Modal from '../../../uiparts/Modal';
import CtaButton from '../../../uiparts/Button';
import IconButton from '../../../uiparts/IconButton';
import { MinusSignIcon, PlusSignIcon, ShoppingBasket03Icon} from 'hugeicons-react';
import styles from './style.module.scss';


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

interface FoodDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  foodItem: FoodItem | null;
  onAddToCart: (foodItem: FoodItem, quantity: number) => void;
}

function FoodDetailModal({ isOpen, onClose, foodItem, onAddToCart }: FoodDetailModalProps) {
  const [quantity, setQuantity] = useState(1);

  React.useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  if (!foodItem) return null;

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAdd = () => {
    onAddToCart(foodItem, quantity);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} contentClassName={styles.modalContent}>
      <div className={styles.container}>
        {/* 左カラム: 商品情報 */}
        <div className={styles.infoColumn}>
          <span className={styles.japaneseName}>{foodItem.japanese_name}</span>
          <h2 className={styles.title}>{foodItem.name}</h2>
          <span className={styles.price}>{foodItem.price}</span>
          <hr className={styles.divider} />
          <p className={styles.description}>{foodItem.discription}</p>

          <span className={styles.itemId}>Item ID: {foodItem.id}</span>
        </div>

        {/* 右カラム: 画像とアクション */}
        <div className={styles.actionColumn}>
          <div className={styles.imageWrapper}>
            <img src={foodItem.image} alt={foodItem.name} className={styles.image} />
          </div>

          <div className={styles.controlsRow}>
            {/* カウンター */}
            <div className={styles.counter}>
              <IconButton
                icon={MinusSignIcon}
                onClick={handleDecrement}
                size="lg"
                disabled={quantity <= 1}
                ariaLabel="数量を減らす"
              />
              <span className={styles.quantity}>{quantity}</span>
              <IconButton
                icon={PlusSignIcon}
                onClick={handleIncrement}
                size="lg"
                ariaLabel="数量を増やす"
              />
            </div>

            {/* カート追加ボタン */}
            <CtaButton
              variant="cta"
              text="Add"
              icon={
                <ShoppingBasket03Icon
                  size={34}
                  color="currentColor"
                  strokeWidth={2}
                />
              }
              size="lg"
              onClick={handleAdd}
              layoutClass={styles.addButton}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default FoodDetailModal;
