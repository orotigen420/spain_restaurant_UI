import styles from "./style.module.scss";
import Button from '../../uiparts/Button';
import { ArrowRight01Icon } from "hugeicons-react";

function FirstView() {
    return (
        <div className={styles.container}>
            <img src="/img/paeria_top.jpeg" alt="Paeria Top" />
            <div className={styles.colorOverlay}></div>
            <div className={styles.infoHolder}>
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