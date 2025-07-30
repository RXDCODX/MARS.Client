import { Container } from "react-bootstrap";

import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className={`${styles.layout} site-component`}>
    <Header />
    <Container fluid className={styles.main}>
      {children}
    </Container>
    <Footer />
  </div>
);

export default Layout;
