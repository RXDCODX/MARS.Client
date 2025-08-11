import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import { Menu } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useSiteColors } from "@/shared/Utils/useSiteColors";

import ThemeToggle from "@/components/ThemeToggle";

const Header: React.FC = () => {
  const colors = useSiteColors();
  const bgColor = colors.background.secondary;
  const borderColor = colors.border.primary;
  const cardBg = colors.background.card;

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
    <Box as="header" bg={bgColor} borderBottom={`1px solid ${borderColor}`} boxShadow="md" position="sticky" top={0} zIndex={1000}>
      <Container maxW="full" px={4}>
        <Flex justify="space-between" align="center" py={4}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Text fontSize="xl" fontWeight="bold" color={colors.text.primary}>
              🚀 MARS Client
            </Text>
          </Link>

          <Flex align="center" gap={4}>
            {/* Страницы сайта */}
            <Menu.Root>
              <Menu.Trigger>
                <Button variant="ghost" color={colors.text.primary}>
                  Страницы сайта <ChevronDownIcon style={{ marginLeft: 8 }} />
                </Button>
              </Menu.Trigger>
              <Menu.Content bg={cardBg} borderColor={borderColor}>
                {sitePages.map((item, index) => (
                  <Menu.Item key={index} value={item.path}>
                    <Link to={item.path} style={{ color: colors.text.primary, textDecoration: "none" }}>
                      {item.label}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Root>

            {/* OBS Компоненты */}
            <Menu.Root>
              <Menu.Trigger>
                <Button variant="ghost" color={colors.text.primary}>
                  OBS Компоненты <ChevronDownIcon style={{ marginLeft: 8 }} />
                </Button>
              </Menu.Trigger>
              <Menu.Content bg={cardBg} borderColor={borderColor}>
                {obsComponents.map((item, index) => (
                  <Menu.Root key={index} positioning={{ placement: "right-start" }}>
                    <Menu.TriggerItem value={item.label}>
                      {item.label} <ChevronRightIcon style={{ marginLeft: 8 }} />
                    </Menu.TriggerItem>
                    <Menu.Content bg={cardBg} borderColor={borderColor}>
                      {item.children.map((child, childIndex) => (
                        <Menu.Item key={childIndex} value={child.path}>
                          <Link to={child.path} style={{ color: colors.text.primary, textDecoration: "none" }}>
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
                <Button variant="ghost" color={colors.text.primary}>
                  Панель управления <ChevronDownIcon style={{ marginLeft: 8 }} />
                </Button>
              </Menu.Trigger>
              <Menu.Content bg={cardBg} borderColor={borderColor}>
                {controlRoomPages.map((item, index) => (
                  <Menu.Item key={index} value={item.path}>
                    <Link to={item.path} style={{ color: colors.text.primary, textDecoration: "none" }}>
                      {item.label}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Root>

            <ThemeToggle />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
