import Header from "./Header";
import styles from '../../styles/modules/Layout.module.css';

export default function Layout({ children, ...props }) {
    return (
        <div className={styles.rootLayout}>
            <Header />
            <main {...props} className={styles.main}>{children}</main>
        </div>
    );
}