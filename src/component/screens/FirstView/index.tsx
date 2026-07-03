import styles from "./style.module.scss";
import Button from '../../uiparts/Button';
import { ArrowRight01Icon } from "hugeicons-react";

function FirstView() {
    //-を含む場合は.でつなぐのではなくブラケット記法を使う。jsに誤解されないように
    return (
        <div className={styles.container}>
            <img src="/jpeg/paeria_top.jpeg" alt="Paeria Top" />
            <div className={styles['color-overlay']}></div>
            <div className={styles['info-holder']}>
                <h2>スペインの天国</h2>
                <h1>
                    The<br />
                    Spanish<br />
                    Heaven
                </h1>
                <Button
                    variant="cta"
                    text="Check in"
                    icon={ArrowRight01Icon}
                    iconPosition="right"
                    layoutClass={styles.ctaButton}
                    to="selectGuestNumber"
                />
            </div>
        </div>
    )
}

export default FirstView