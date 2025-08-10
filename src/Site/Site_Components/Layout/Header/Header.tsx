import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useSiteColors } from "@/shared/Utils/useSiteColors";

import ThemeToggle from "../../../ThemeToggle";

const Header: React.FC = () => {
  const colors = useSiteColors();
  const bgColor = useColorModeValue(colors.background.secondary, "gray.800");
  const borderColor = useColorModeValue(colors.border.primary, "gray.600");
  const cardBg = useColorModeValue(colors.background.card, "gray.700");

  const sitePages = [
    { label: "Главная", path: "/" },
    { label: "О проекте", path: "/about" },
    { label: "Документация", path: "/docs" },
    { label: "Команды", path: "/commands" },
    { label: "Фреймдата", path: "/framedata" },
    { label: "Контакты", path: "/contacts" },
  ];

  const obsComponents: {
    label: string;
    children: { label: string; path: string }[];
  }[] = [
    {
      label: "Чат",
      children: [
        { label: "Горизонтальный чат", path: "/chath" },
        { label: "Вертикальный чат", path: "/chatv" },
      ],
    },
    {
      label: "Алерты",
      children: [
        { label: "Pyro Alerts", path: "/pyroalerts" },
        { label: "Waifu Alerts", path: "/waifu" },
        { label: "Highlight Message", path: "/highlite" },
        { label: "Auto Message Billboard", path: "/automessage" },
      ],
    },
    {
      label: "Развлечения",
      children: [
        { label: "Fumo Friday", path: "/fumofriday" },
        { label: "Random Mem", path: "/randommem" },
        { label: "Экранные частицы", path: "/confetti" },
      ],
    },
    {
      label: "Звук",
      children: [{ label: "Текущий трек", path: "/sr/currenttrack" }],
    },
  ];

  const controlRoomPages = [
    { label: "Панель управления", path: "/admin" },
    { label: "Дашборд", path: "/dashboard" },
    { label: "Просмотр серверов", path: "/main" },
    { label: "Сервисы", path: "/services" },
  ];

  return (
    <Box
      as="header"
      bg={bgColor}
      borderBottom={`1px solid ${borderColor}`}
      boxShadow="md"
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Container maxW="full" px={4}>
        <Flex justify="space-between" align="center" py={4}>
          <Text
            as={Link}
            to="/"
            fontSize="xl"
            fontWeight="bold"
            color={colors.text.primary}
            _hover={{ textDecoration: "none" }}
          >
            🚀 MARS Client
          </Text>

          <HStack spacing={4} align="center">
            {/* Страницы сайта */}
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="ghost"
                color={colors.text.primary}
                _hover={{ bg: cardBg }}
              >
                Страницы сайта
              </MenuButton>
              <MenuList bg={cardBg} borderColor={borderColor}>
                {sitePages.map((item, index) => (
                  <MenuItem
                    key={index}
                    as={Link}
                    to={item.path}
                    bg={cardBg}
                    color={colors.text.primary}
                    _hover={{ bg: colors.background.primary }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            {/* OBS Компоненты */}
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="ghost"
                color={colors.text.primary}
                _hover={{ bg: cardBg }}
              >
                OBS Компоненты
              </MenuButton>
              <MenuList bg={cardBg} borderColor={borderColor}>
                {obsComponents.map((item, index) => (
                  <Menu key={index}>
                    <MenuButton
                      as={MenuItem}
                      rightIcon={<ChevronRightIcon />}
                      bg={cardBg}
                      color={colors.text.primary}
                      _hover={{ bg: colors.background.primary }}
                    >
                      {item.label}
                    </MenuButton>
                    <MenuList bg={cardBg} borderColor={borderColor}>
                      {item.children.map((child, childIndex) => (
                        <MenuItem
                          key={childIndex}
                          as={Link}
                          to={child.path}
                          bg={cardBg}
                          color={colors.text.primary}
                          _hover={{ bg: colors.background.primary }}
                        >
                          {child.label}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                ))}
              </MenuList>
            </Menu>

            {/* Панель управления */}
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="ghost"
                color={colors.text.primary}
                _hover={{ bg: cardBg }}
              >
                Панель управления
              </MenuButton>
              <MenuList bg={cardBg} borderColor={borderColor}>
                {controlRoomPages.map((item, index) => (
                  <MenuItem
                    key={index}
                    as={Link}
                    to={item.path}
                    bg={cardBg}
                    color={colors.text.primary}
                    _hover={{ bg: colors.background.primary }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            <ThemeToggle />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
