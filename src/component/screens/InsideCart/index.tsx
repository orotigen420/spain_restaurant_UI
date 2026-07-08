import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../../context/AppContext';
import foodItemsRaw from '../../../data/foodItems.json';
import { type FoodItem } from '../../../types/food';
import styles from './style.module.scss';
import Button from '../../uiparts/Button';
import IconButton from '../../uiparts/IconButton';
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  MinusSignIcon,
  PlusSignIcon,
  ShoppingBasket03Icon
} from 'hugeicons-react';

const FOOD_ITEMS = foodItemsRaw as FoodItem[];

function InsideCart() {
  const { cart, updateCartQuantity, removeFromCart, clearCart, setOrderPlaced, addOrderHistory } = useApp();
  const navigate = useNavigate();


  const parsePrice = (priceStr: string): number => {
    return parseInt(priceStr.replace(/[¥,]/g, ''), 10) || 0;
  };

  // Map cart items to full food item details
  const cartWithDetails = useMemo(() => {
    return cart.map((item) => {
      const details = FOOD_ITEMS.find((f) => f.id === item.id);
      return {
        ...item,
        details,
      };
    }).filter((item) => item.details !== undefined) as Array<{
      id: string;
      quantity: number;
      details: FoodItem;
    }>;
  }, [cart]);

  // Calculate totals
  const subtotal = useMemo(() => {
    return cartWithDetails.reduce((sum, item) => {
      return sum + parsePrice(item.details.price) * item.quantity;
    }, 0);
  }, [cartWithDetails]);

  const handleQuantityChange = (id: string, currentQty: number, change: number) => {
    const newQty = currentQty + change;
    if (newQty <= 0) {
      removeFromCart(id);
    } else {
      updateCartQuantity(id, newQty);
    }
  };

  const handlePlaceOrder = () => {
    addOrderHistory(cart);
    setOrderPlaced(true);
    navigate('/menu');
    clearCart();
  };

  return (
    <div className={styles.container}>
      {/* ヘッダーエリア */}
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.titleEn}>Cart</span>
          <span className={styles.titleJa}>カートのご確認</span>
        </h1>
      </header>

      {/* メインレイアウト */}
      <div className={styles.mainLayout}>
        {cartWithDetails.length === 0 ? (
          /* 空っぽの状態 */
          <div className={styles.emptyState}>
            <div className={styles.emptyIconWrapper}>
              <ShoppingBasket03Icon size={64} className={styles.emptyIcon} />
            </div>
            <h2>カートは空です</h2>
            <p>メニューから商品を選んで追加してください。</p>
          </div>
        ) : (
          <div className={styles.cartCardWrapper}>
            <div className={styles.cartCard}>
              {/* テーブルヘッダー（列見出し） */}
              <div className={styles.tableHeader}>
                <span className={styles.thProduct}>商品</span>
                <span className={styles.thQuantity}>個数</span>
                <span className={styles.thPrice}>価格</span>
              </div>

              <div className={styles.itemList}>
                {cartWithDetails.map((item) => (
                  <div key={item.id} className={styles.itemRow}>
                    {/* 商品画像 */}
                    <div className={styles.itemImgWrapper}>
                      <img src={item.details.image} alt={item.details.name} className={styles.itemImg} />
                    </div>

                    {/* 商品名 */}
                    <div className={styles.itemInfo}>
                      <h3 className={styles.itemJaName}>{item.details.japanese_name}</h3>
                      <span className={styles.itemEnName}>{item.details.name}</span>
                    </div>

                    {/* 数量コントローラー */}
                    <div className={styles.quantityControls}>
                      <IconButton
                        icon={MinusSignIcon}
                        onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                        size="md"
                        ariaLabel="個数を減らす"
                      />
                      <span className={styles.itemQuantity}>{item.quantity}</span>
                      <IconButton
                        icon={PlusSignIcon}
                        onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                        size="md"
                        ariaLabel="個数を増やす"
                      />
                    </div>

                    {/* 価格・削除アクション */}
                    <div className={styles.priceAndAction}>
                      <div className={styles.itemTotalPrice}>
                        ¥{(parsePrice(item.details.price) * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 区切り線 */}
              <div className={styles.summaryDivider} />

              {/* 合計表示エリア */}
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>合計</span>
                <span className={styles.totalPrice}>
                  ¥{subtotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* 注文送信ボタン（カードの下に配置） */}
            <Button
              variant="cta"
              text="Send order"
              icon={ArrowRight01Icon}
              iconPosition="right"
              onClick={handlePlaceOrder}
              layoutClass={styles.orderBtn}
            />
          </div>
        )}
      </div>



      {/* 画面左下のメニュー戻るボタン */}
      <Button
        variant="secondary"
        text="Menu"
        icon={ArrowLeft01Icon}
        iconPosition="left"
        onClick={() => navigate('/menu')}
        layoutClass={styles.backBtn}
      />
    </div>
  );
}

export default InsideCart;
