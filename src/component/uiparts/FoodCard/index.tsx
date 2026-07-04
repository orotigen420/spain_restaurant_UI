import styles from "./style.module.scss";

interface FoodCardProps {
    id: string;
    name: string;
    price: string;
    image: string;
    isSoldOut?: boolean;
    onClick?: () => void;
}

function FoodCard({ id, name, price, image, isSoldOut = false, onClick }: FoodCardProps) {
    return (
        // 在庫切れの場合、isSoldOutがtrueになり、soldOutクラスが適用
        <article
            className={`${styles.card} ${isSoldOut ? styles.soldOut : ""}`}
            onClick={isSoldOut ? undefined : onClick}
        >
            <div className={styles.header}>
                <div className={styles.foodName}>{name}</div>
                <span className={styles.priceText}>{price}</span>
            </div>
            <div className={styles.bottomContent}>
                <img src={image} alt={name} className={styles.foodImage} />
                <div className={styles.idSec}>
                    <span>Item ID:</span>
                    <span>{id}</span>
                </div>
            </div>

            {/* 在庫切れバッジ */}
            {isSoldOut && (
                <div className={styles.soldOutSeal}>
                    SOLD OUT
                </div>
            )}
        </article>
    );
}

export default FoodCard;