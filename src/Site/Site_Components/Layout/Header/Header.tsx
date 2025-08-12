import { Box, Button, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

import { useSiteColors } from "@/shared/Utils/useSiteColors";

const Header: React.FC = () => {
  const location = useLocation();
  const colors = useSiteColors();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  const navItems = [
    { path: "/", label: "Главная" },
    { path: "/about", label: "О проекте" },
    { path: "/docs", label: "Документация" },
    { path: "/framedata", label: "Фреймдата" },
    { path: "/commands", label: "Команды" },
    { path: "/contacts", label: "Контакты" },
  ];

  return (
    <Box
      as="header"
      bg={bgColor}
      borderBottom="1px solid"
      borderColor={borderColor}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Flex
        maxW="container.xl"
        mx="auto"
        px={4}
        py={4}
        align="center"
        justify="space-between"
      >
        <Link to="/">
          <Flex align="center" gap={3}>
            <Text fontSize="2xl">🚀</Text>
            <Heading as="h1" size="lg" color={colors.primary}>
              MARS
            </Heading>
          </Flex>
        </Link>

        <Flex as="nav" gap={2}>
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={location.pathname === item.path ? "solid" : "ghost"}
                colorScheme={location.pathname === item.path ? "blue" : "gray"}
                size="md"
                _hover={{ bg: hoverBg }}
                transition="all 0.2s ease"
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </Flex>

        <Flex align="center" gap={3}>
          <Link to="/admin">
            <Button
              variant="outline"
              colorScheme="blue"
              size="md"
              _hover={{ bg: hoverBg }}
            >
              Панель управления
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
