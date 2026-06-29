import styles from "./style.module.scss";

function FirstView(){
    return (
        <div className={styles.container}>
         <img src="/paeria_top.jpeg" alt="Paeria Top"/> 
         <div className={styles['color-overlay']}></div>
         <div className={styles['info-holder']}>
            <h2>スペインの天国</h2>
            <h1>
                The<br/>
                Spanish<br/>
                Heaven
            </h1>
         </div>
        </div>
    )
}

export default FirstView