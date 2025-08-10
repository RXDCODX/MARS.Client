import { Box, Container } from "@chakra-ui/react";

import { useSiteColors } from "@/shared/Utils/useSiteColors";

import Footer from "./Footer/Footer";
import Header from "./Header/Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const colors = useSiteColors();

  return (
    <Box
      className="site-component"
      bg={colors.background.primary}
      color={colors.text.primary}
      minH="100vh"
      display="flex"
      flexDirection="column"
    >
      <Header />
      <Container maxW="full" flex="1" px={4} py={6}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
