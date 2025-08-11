import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Menu } from "@chakra-ui/react";
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

  const bgColor = colors.background.secondary;
  const borderColor = colors.border.primary;
  const cardBg = colors.background.card;
  const textPrimary = colors.text.primary;
  const textSecondary = colors.text.secondary;
  const accentColor = colors.text.accent;
  const lightText = colors.text.light;
  const hoverBg = colors.hover.background;

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
              /* v3: иконку рендерим вручную */
              _hover={{ bg: hoverBg, transform: "translateY(-2px)" }}
              transition="all 0.3s ease"
              whiteSpace="nowrap"
> {tab.icon} {tab.label}
            </Button>
          ))}
        </Flex>

        {/* Страницы сайта */}
        <Menu.Root>
          <Menu.Trigger>
            <Button variant="ghost" color={textPrimary} px={4} py={3} borderRadius="lg" fontWeight="medium" _hover={{ bg: hoverBg, transform: "translateY(-2px)" }}>
              🌐 Страницы сайта <ChevronDownIcon style={{ marginLeft: 8 }} />
            </Button>
          </Menu.Trigger>
          <Menu.Content bg={cardBg} borderColor={borderColor} style={{ boxShadow: "var(--chakra-shadows-md)", borderRadius: 12, padding: 8, minWidth: 200, zIndex: 1001 }}>
            {sitePages.map((item, index) => (
              <Menu.Item key={index} value={item.path}>
                <Link to={item.path} style={{ color: textPrimary as any, textDecoration: "none", display: "block", padding: "8px 12px", borderRadius: 8 }}>
                  {item.label}
                </Link>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Root>

        {/* OBS Компоненты */}
        <Menu.Root>
          <Menu.Trigger>
            <Button variant="ghost" color={textPrimary} px={4} py={3} borderRadius="lg" fontWeight="medium" _hover={{ bg: hoverBg, transform: "translateY(-2px)" }}>
              🎮 OBS Компоненты <ChevronDownIcon style={{ marginLeft: 8 }} />
            </Button>
          </Menu.Trigger>
          <Menu.Content bg={cardBg} borderColor={borderColor} style={{ boxShadow: "var(--chakra-shadows-md)", borderRadius: 12, padding: 8, minWidth: 200, zIndex: 1001 }}>
            {obsComponents.map((item, index) => (
              <Menu.Root key={index} positioning={{ placement: "right-start" }}>
                <Menu.TriggerItem>
                  {item.label} <ChevronRightIcon style={{ marginLeft: 8 }} />
                </Menu.TriggerItem>
                <Menu.Content bg={cardBg} borderColor={borderColor} style={{ boxShadow: "var(--chakra-shadows-md)", borderRadius: 12, padding: 8, minWidth: 200, zIndex: 1002 }}>
                  {item.children?.map((child, childIndex) => (
                    <Menu.Item key={childIndex} value={child.path}>
                      <Link to={child.path} style={{ color: textPrimary as any, textDecoration: "none", display: "block", padding: "8px 12px", borderRadius: 8 }}>
                        {child.label}
                      </Link>
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu.Root>
            ))}
          </Menu.Content>
        </Menu.Root>

        {/* Панель управления */}
        <Menu.Root>
          <Menu.Trigger>
            <Button variant="ghost" color={textPrimary} px={4} py={3} borderRadius="lg" fontWeight="medium" _hover={{ bg: hoverBg, transform: "translateY(-2px)" }}>
              ⚙️ Панель управления <ChevronDownIcon style={{ marginLeft: 8 }} />
            </Button>
          </Menu.Trigger>
          <Menu.Content bg={cardBg} borderColor={borderColor} style={{ boxShadow: "var(--chakra-shadows-md)", borderRadius: 12, padding: 8, minWidth: 200, zIndex: 1001 }}>
            {controlRoomPages.map((item, index) => (
              <Menu.Item key={index} value={item.path}>
                <Link to={item.path} style={{ color: textPrimary as any, textDecoration: "none", display: "block", padding: "8px 12px", borderRadius: 8 }}>
                  {item.label}
                </Link>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Root>

        <Flex
          bg={colors.background.tertiary}
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
