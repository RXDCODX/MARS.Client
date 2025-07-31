import { Container } from "react-bootstrap";

import { useSiteColors } from "../../../shared/Utils/useSiteColors";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const colors = useSiteColors();

  return (
    <div
      className={`${styles.layout} site-component`}
      style={{
        backgroundColor: colors.background.primary,
        color: colors.text.primary,
      }}
    >
      <Header />
      <Container fluid className={styles.main}>
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
