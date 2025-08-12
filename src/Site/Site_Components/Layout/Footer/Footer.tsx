import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const Footer: React.FC = () => {
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      as="footer"
      bg={bgColor}
      borderTop="1px solid"
      borderColor={borderColor}
      py={6}
      mt="auto"
    >
      <Flex
        maxW="container.xl"
        mx="auto"
        px={4}
        justify="space-between"
        align="center"
        direction={{ base: "column", md: "row" }}
        gap={4}
      >
        <Text color={textColor} fontSize="sm">
          © 2024 MARS Client. Все права защищены.
        </Text>
        
        <Flex gap={6} fontSize="sm" color={textColor}>
          <Text>Версия 1.0.0</Text>
          <Text>Поддержка: support@mars.com</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
