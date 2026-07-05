import { motion } from "framer-motion";
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
        <motion.article
            className={`${styles.card} ${isSoldOut ? styles.soldOut : ""}`}
            onClick={isSoldOut ? undefined : onClick}
            whileTap={isSoldOut ? undefined : { scale: 0.97, y: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
        </motion.article>
    );
}

export default FoodCard;