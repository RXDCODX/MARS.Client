import { Box, Container, Flex, Grid, GridItem, Heading, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useSiteColors } from "@/shared/Utils/useSiteColors";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const colors = useSiteColors();
  const bgColor = colors.background.secondary;
  const borderColor = colors.border.primary;

  return (
    <Box as="footer" bg={bgColor} color={colors.text.primary} borderTop={`1px solid ${borderColor}`} py={10} mt="auto">
      <Container maxW="full" px={4}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={8}>
          <GridItem>
            <Stack gap={4}>
              <Heading size="md" color={colors.text.primary}>
                🚀 MARS Client
              </Heading>
              <Text color={colors.text.secondary}>
                Мощная платформа для управления стримингом и создания интерактивных компонентов для OBS.
              </Text>
            </Stack>
          </GridItem>

          <GridItem>
            <Stack gap={4}>
              <Heading size="sm" color={colors.text.primary}>
                Быстрые ссылки
              </Heading>
              <Stack gap={2}>
                <Link to="/" style={{ color: colors.text.secondary }}>
                  Главная
                </Link>
                <Link to="/about" style={{ color: colors.text.secondary }}>
                  О проекте
                </Link>
                <Link to="/docs" style={{ color: colors.text.secondary }}>
                  Документация
                </Link>
                <Link to="/contacts" style={{ color: colors.text.secondary }}>
                  Контакты
                </Link>
              </Stack>
            </Stack>
          </GridItem>

          <GridItem>
            <Stack gap={4}>
              <Heading size="sm" color={colors.text.primary}>
                OBS Компоненты
              </Heading>
              <Stack gap={2}>
                <Link to="/pyroalerts" style={{ color: colors.text.secondary }}>
                  Pyro Alerts
                </Link>
                <Link to="/waifu" style={{ color: colors.text.secondary }}>
                  Waifu Alerts
                </Link>
                <Link to="/chath" style={{ color: colors.text.secondary }}>
                  Горизонтальный чат
                </Link>
                <Link to="/chatv" style={{ color: colors.text.secondary }}>
                  Вертикальный чат
                </Link>
              </Stack>
            </Stack>
          </GridItem>

          <GridItem>
            <Stack gap={4}>
              <Heading size="sm" color={colors.text.primary}>
                Панель управления
              </Heading>
              <Stack gap={2}>
                <Link to="/admin" style={{ color: colors.text.secondary }}>
                  Админ панель
                </Link>
                <Link to="/dashboard" style={{ color: colors.text.secondary }}>
                  Дашборд
                </Link>
                <Link to="/main" style={{ color: colors.text.secondary }}>
                  Просмотр серверов
                </Link>
                <Link to="/services" style={{ color: colors.text.secondary }}>
                  Сервисы
                </Link>
              </Stack>
            </Stack>
          </GridItem>
        </Grid>

        <Box my={8} borderTop={`1px solid ${borderColor}`} />

        <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "center", md: "center" }} gap={4}>
          <Text color={colors.text.muted} textAlign={{ base: "center", md: "left" }}>
            &copy; {currentYear} MARS Client. Все права защищены.
          </Text>

          <Flex gap={4} justify="center">
            <a href="#" aria-label="GitHub" style={{ color: colors.text.secondary }}>
              <Text fontSize="lg">🐙</Text>
            </a>
            <a href="#" aria-label="Discord" style={{ color: colors.text.secondary }}>
              <Text fontSize="lg">💬</Text>
            </a>
            <a href="#" aria-label="Twitter" style={{ color: colors.text.secondary }}>
              <Text fontSize="lg">🐦</Text>
            </a>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
