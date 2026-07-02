import styles from "./style.module.scss";

interface FoodCardProps {
    id: string;
    name: string;
    price: string;
    image: string;
    onClick?: () => void;
}

function FoodCard({ id, name, price, image, onClick }: FoodCardProps) {
    return (
        <article className={styles.card} onClick={onClick}>
            <div className={styles.header}>
                <h3 className={styles.foodName}>{name}</h3>
                <span className={styles.priceText}>{price}</span>
            </div>
            <img src={image} alt={name} className={styles.foodImage} />
            <div className={styles.idSec}>
                <span>Item ID:</span>
                <span>{id}</span>
            </div>
        </article>
    );
}

export default FoodCard;