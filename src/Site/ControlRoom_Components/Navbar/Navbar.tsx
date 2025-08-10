import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
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

import { NavbarProps } from "./Navbar.types";

interface NavItem {
  label: string;
  path?: string;
  children?: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const colors = useSiteColors();

  // Chakra UI color mode values
  const bgColor = useColorModeValue(colors.background.secondary, "gray.800");
  const borderColor = useColorModeValue(colors.border.primary, "gray.600");
  const cardBg = useColorModeValue(colors.background.card, "gray.700");
  const textPrimary = useColorModeValue(colors.text.primary, "white");
  const textSecondary = useColorModeValue(colors.text.secondary, "gray.300");
  const accentColor = useColorModeValue(colors.text.accent, colors.text.accent);
  const lightText = useColorModeValue(colors.text.light, "black"); // Assuming light text needs to be black in dark mode for contrast if used directly
  const hoverBg = useColorModeValue(colors.hover.background, "whiteAlpha.200");

  const tabs = [
    { id: "dashboard", label: "Дашборд", icon: "📊" },
    { id: "servers", label: "Серверы", icon: "🖥️" },
    { id: "logs", label: "Логи", icon: "📝" },
    { id: "users", label: "Пользователи", icon: "👥" },
    { id: "performance", label: "Производительность", icon: "⚡" },
    { id: "settings", label: "Настройки", icon: "⚙️" },
  ];

  const sitePages = [
    { label: "Главная", path: "/" },
    { label: "О проекте", path: "/about" },
    { label: "Документация", path: "/docs" },
    { label: "Фреймдата", path: "/framedata" },
    { label: "Команды", path: "/commands" },
    { label: "Контакты", path: "/contacts" },
  ];

  const controlRoomPages = [
    { label: "Панель управления", path: "/admin" },
    { label: "Дашборд", path: "/dashboard" },
    { label: "Просмотр серверов", path: "/main" },
    { label: "Сервисы", path: "/services" },
  ];

  const obsComponents: NavItem[] = [
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

  return (
    <Box
      as="nav"
      bg={bgColor}
      boxShadow="md"
      position="sticky"
      top={0}
      zIndex={1000}
      backdropFilter="blur(10px)"
      borderBottom="1px solid"
      borderColor={borderColor}
    >
      <Flex
        maxW="container.xl"
        mx="auto"
        px={4}
        align="center"
        justify="space-between"
        h="70px"
      >
        <Flex
          align="center"
          gap={3}
          color={textPrimary}
          fontWeight="bold"
          fontSize="xl"
        >
          <Text
            fontSize="2xl"
            filter="drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))"
          >
            🚀
          </Text>
          <Text>MARS Admin</Text>
        </Flex>

        <Flex align="center" gap={2}>
          {tabs.map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "solid" : "ghost"}
              colorScheme={activeTab === tab.id ? "blue" : "gray"}
              onClick={() => onTabChange(tab.id)}
              size="md"
              px={4}
              py={3}
              borderRadius="lg"
              fontWeight="medium"
              leftIcon={<Text fontSize="lg">{tab.icon}</Text>}
              _hover={{ bg: hoverBg, transform: "translateY(-2px)" }}
              transition="all 0.3s ease"
              whiteSpace="nowrap"
            >
              {tab.label}
            </Button>
          ))}
        </Flex>

        {/* Страницы сайта */}
        <Menu placement="bottom-start">
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant="ghost"
            color={textPrimary}
            px={4}
            py={3}
            borderRadius="lg"
            fontWeight="medium"
            leftIcon={<Text fontSize="lg">🌐</Text>}
            _hover={{ bg: hoverBg, transform: "translateY(-2px)" }}
            transition="all 0.3s ease"
            whiteSpace="nowrap"
          >
            Страницы сайта
          </MenuButton>
          <MenuList
            bg={cardBg}
            borderColor={borderColor}
            boxShadow="md"
            borderRadius="lg"
            p={2}
            minW="200px"
            zIndex={1001}
          >
            {sitePages.map((item, index) => (
              <MenuItem
                key={index}
                as={Link}
                to={item.path}
                bg={cardBg}
                color={textPrimary}
                borderRadius="md"
                _hover={{
                  bg: hoverBg,
                  color: accentColor,
                  transform: "translateX(5px)",
                }}
                transition="all 0.2s ease"
                py={2}
                px={4}
              >
                {item.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        {/* OBS Компоненты */}
        <Menu placement="bottom-start">
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant="ghost"
            color={textPrimary}
            px={4}
            py={3}
            borderRadius="lg"
            fontWeight="medium"
            leftIcon={<Text fontSize="lg">🎮</Text>}
            _hover={{ bg: hoverBg, transform: "translateY(-2px)" }}
            transition="all 0.3s ease"
            whiteSpace="nowrap"
          >
            OBS Компоненты
          </MenuButton>
          <MenuList
            bg={cardBg}
            borderColor={borderColor}
            boxShadow="md"
            borderRadius="lg"
            p={2}
            minW="200px"
            zIndex={1001}
          >
            {obsComponents.map((item, index) => (
              <Menu key={index} placement="right-start" gutter={4}>
                {" "}
                {/* Nested Menu */}
                <MenuButton
                  as={MenuItem}
                  rightIcon={<ChevronRightIcon />}
                  bg={cardBg}
                  color={textPrimary}
                  borderRadius="md"
                  _hover={{ bg: hoverBg, color: accentColor }}
                  transition="all 0.2s ease"
                  py={2}
                  px={4}
                >
                  {item.label}
                </MenuButton>
                <MenuList
                  bg={cardBg}
                  borderColor={borderColor}
                  boxShadow="md"
                  borderRadius="lg"
                  p={2}
                  minW="200px"
                  zIndex={1002}
                >
                  {item.children?.map((child, childIndex) => (
                    <MenuItem
                      key={childIndex}
                      as={Link}
                      to={child.path || "#"}
                      bg={cardBg}
                      color={textPrimary}
                      borderRadius="md"
                      _hover={{
                        bg: hoverBg,
                        color: accentColor,
                        transform: "translateX(5px)",
                      }}
                      transition="all 0.2s ease"
                      py={2}
                      px={4}
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
        <Menu placement="bottom-start">
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant="ghost"
            color={textPrimary}
            px={4}
            py={3}
            borderRadius="lg"
            fontWeight="medium"
            leftIcon={<Text fontSize="lg">⚙️</Text>}
            _hover={{ bg: hoverBg, transform: "translateY(-2px)" }}
            transition="all 0.3s ease"
            whiteSpace="nowrap"
          >
            Панель управления
          </MenuButton>
          <MenuList
            bg={cardBg}
            borderColor={borderColor}
            boxShadow="md"
            borderRadius="lg"
            p={2}
            minW="200px"
            zIndex={1001}
          >
            {controlRoomPages.map((item, index) => (
              <MenuItem
                key={index}
                as={Link}
                to={item.path}
                bg={cardBg}
                color={textPrimary}
                borderRadius="md"
                _hover={{
                  bg: hoverBg,
                  color: accentColor,
                  transform: "translateX(5px)",
                }}
                transition="all 0.2s ease"
                py={2}
                px={4}
              >
                {item.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        <Flex
          bg={useColorModeValue(colors.background.tertiary, "gray.700")}
          color={textPrimary}
          borderColor={borderColor}
          borderRadius="lg"
          p={3}
          align="center"
          gap={2}
          fontWeight="medium"
          whiteSpace="nowrap"
        >
          <Text fontSize="lg">👤</Text>
          <Text>Администратор</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
