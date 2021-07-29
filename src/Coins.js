import styles from './Coins.module.css'
import Searchbar from './components/Searchbar'

const Coins = () => {
    return (  
        <div>
            <h1 className={styles.orange}>Coins</h1>
            <Searchbar/>
        </div>
    );
}
 
export default Coins;
