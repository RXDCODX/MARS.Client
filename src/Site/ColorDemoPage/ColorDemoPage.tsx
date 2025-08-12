import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";

import ColorDemo from "../Site_Components/ColorDemo/ColorDemo";

const ColorDemoPage: React.FC = () => {
  const bgColor = useColorModeValue("white", "gray.900");

  return (
    <Box bg={bgColor} minH="100vh">
      <ColorDemo />
    </Box>
  );
};

export default ColorDemoPage;
