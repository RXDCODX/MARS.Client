import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";

import Footer from "./Footer/Footer";
import Header from "./Header/Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const bgColor = useColorModeValue("white", "gray.900");
  const minH = "100vh";

  return (
    <Flex direction="column" minH={minH} bg={bgColor}>
      <Header />
      <Box as="main" flex="1">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
