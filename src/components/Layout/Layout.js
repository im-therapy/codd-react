import { useLocation } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import styles from '../../styles/modules/Layout.module.css';

export default function Layout({ children, ...props }) {
    const location = useLocation();
    const showFooter = location.pathname !== '/maps';

    return (
        <div className={styles.rootLayout}>
            <Header />
            <main {...props} className={styles.main}>{children}</main>
            {showFooter && <Footer />}
        </div>
    );
}