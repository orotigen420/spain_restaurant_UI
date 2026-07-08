import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../../context/AppContext';
import foodItemsRaw from '../../../data/foodItems.json';
import { type FoodItem } from '../../../types/food';
import styles from './style.module.scss';
import Button from '../../uiparts/Button';
import BillConfirmModal from './BillConfirmModal';
import {
  ArrowLeft01Icon,
  Note01Icon
} from 'hugeicons-react';

const FOOD_ITEMS = foodItemsRaw as FoodItem[];

const SHOP_ADDRESS = "〒120-8551 東京都足立区千住旭町5番";
const SHOP_PHONE = "000-0000-0000";


function OrderHistory() {
  const { orderHistory, guestCount, clearOrderHistory, clearCart } = useApp();
  const navigate = useNavigate();
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // マウント時に日付と時刻を生成
  useEffect(() => {
    const now = new Date();
    const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setCurrentTime(formatted);
  }, []);

  // 履歴データにマスターデータ（名前や画像、価格など）を紐付け
  const historyWithDetails = orderHistory.map((historyItem) => {
    const detail = FOOD_ITEMS.find((food) => food.id === historyItem.id);
    return {
      ...historyItem,
      detail,
    };
  });

  // 合計金額の計算
  const totalAmount = historyWithDetails.reduce((sum, item) => {
    if (!item.detail) return sum;
    const priceNum = parseInt(item.detail.price.replace(/[^0-9]/g, ''), 10);
    return sum + (priceNum * item.quantity);
  }, 0);

  // 1人あたりの金額（割り勘目安）
  const amountPerGuest = guestCount > 0 ? Math.ceil(totalAmount / guestCount) : totalAmount;

  const handleBillRequest = () => {
    setIsBillModalOpen(true);
  };

  const handleBillConfirm = () => {
    setIsBillModalOpen(false);
    clearOrderHistory(); // 履歴をクリア
    clearCart();         // カートをクリア
    navigate('/');       // 最初の画面に戻る（チェックアウト完了）
  };

  return (
    <div className={styles.container}>
      {/* ヘッダーエリア */}
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.titleEn}>Check Out</span>
          <span className={styles.titleJa}>ご注文履歴・お会計</span>
        </h1>
      </header>

      {/* メインレイアウト */}
      <div className={styles.mainLayout}>
        {historyWithDetails.length === 0 ? (
          /* 履歴が空の状態 */
          <div className={styles.emptyState}>
            <div className={styles.emptyIconWrapper}>
              <Note01Icon size={64} className={styles.emptyIcon} />
            </div>
            <h2>注文履歴はありません</h2>
            <p>まだご注文された商品がありません。</p>
          </div>
        ) : (
          /* レシート風お会計画面（カードのみスクロールし、ボタンは固定） */
          <div className={styles.receiptContentArea}>
            <div className={styles.receiptContainer}>
              <div className={styles.receiptCard}>
                {/* レシートのジグザグ切り取り線（上部） */}
                <div className={styles.zigzagTop} />

                {/* 店舗ロゴエリア */}
                <div className={styles.receiptHeader}>
                  <div className={styles.shopName}>The Spanish Heaven</div>
                  <div className={styles.shopDetails}>
                    <p>{SHOP_ADDRESS}</p>
                    <p>{SHOP_PHONE}</p>
                  </div>
                </div>

                {/* 点線区切り */}
                <div className={styles.dashedDivider} />

                {/* テーブル情報 */}
                <div className={styles.tableInfoGrid}>
                  <div className={styles.infoCol}>
                    <span className={styles.label}>DATE:</span>
                    <span className={styles.val}>{currentTime}</span>
                  </div>
                  <div className={styles.infoCol}>
                    <span className={styles.label}>TABLE:</span>
                    <span className={styles.val}>01</span>
                  </div>
                  <div className={styles.infoCol}>
                    <span className={styles.label}>GUESTS:</span>
                    <span className={styles.val}>{guestCount}</span>
                  </div>
                </div>

                {/* 点線区切り */}
                <div className={styles.dashedDivider} />

                {/* 注文明細リスト */}
                <div className={styles.receiptItems}>
                  {historyWithDetails.map((item) => {
                    if (!item.detail) return null;
                    const priceNum = parseInt(item.detail.price.replace(/[^0-9]/g, ''), 10);
                    const subtotal = priceNum * item.quantity;

                    return (
                      <div key={item.id} className={styles.receiptRow}>
                        <div className={styles.itemQtyCol}>
                          {item.quantity}x
                        </div>
                        <div className={styles.itemNameCol}>
                          <span className={styles.itemEn}>{item.detail.name}</span>
                          <span className={styles.itemJa}>{item.detail.japanese_name}</span>
                        </div>
                        <div className={styles.itemPriceCol}>
                          ¥{subtotal.toLocaleString()}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 点線区切り */}
                <div className={styles.dashedDivider} />

                {/* 金額総計セクション */}
                <div className={styles.amountSection}>
                  <div className={styles.amountRow}>
                    <span className={styles.totalLabel}>TOTAL AMOUNT</span>
                    <span className={styles.totalValue}>¥{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className={styles.amountRow}>
                    <span className={styles.splitLabel}>1人あたり目安 (SPLIT)</span>
                    <span className={styles.splitValue}>¥{amountPerGuest.toLocaleString()}</span>
                  </div>
                </div>

                {/* 点線区切り */}
                <div className={styles.dashedDivider} />

                {/* バーコード再現セクション */}
                <div className={styles.barcodeSection}>
                  <div className={styles.barcodeContainer}>
                    <div className={styles.barcodeLines}>
                      {/* CSSで様々な太さの線を引いてバーコードを再現 */}
                      {[2, 1, 3, 1, 4, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 4, 1, 3, 2, 1, 3].map((width, idx) => (
                        <div
                          key={idx}
                          className={styles.barcodeLine}
                          style={{
                            width: `${width}px`,
                            backgroundColor: '#000',
                            height: '50px',
                            marginRight: idx % 3 === 0 ? '3px' : '1px'
                          }}
                        />
                      ))}
                    </div>
                    <div className={styles.barcodeText}>
                      *0001-01-{guestCount}G*
                    </div>
                  </div>
                </div>

                {/* レシートのジグザグ切り取り線（下部） */}
                <div className={styles.zigzagBottom} />
              </div>
            </div>

            {/* お会計リクエストボタン（スクロール外に固定、中央寄せ width 50%） */}
            <Button
              variant="cta"
              text="Request Bill"
              onClick={handleBillRequest}
              layoutClass={styles.billBtn}
            />
          </div>
        )}
      </div>

      {/* 画面左下のメニュー戻るボタン（常時表示、container直下） */}
      <Button
        variant="secondary"
        text="Menu"
        icon={ArrowLeft01Icon}
        iconPosition="left"
        onClick={() => navigate('/menu')}
        layoutClass={styles.backBtn}
      />

      {/* お会計確認モーダル */}
      <BillConfirmModal
        isOpen={isBillModalOpen}
        onClose={() => setIsBillModalOpen(false)}
        totalAmount={totalAmount}
        onConfirm={handleBillConfirm}
      />
    </div>
  );
}

export default OrderHistory;
