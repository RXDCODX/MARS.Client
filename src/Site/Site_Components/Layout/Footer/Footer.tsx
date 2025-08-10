import {
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link as ChakraLink,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useSiteColors } from "@/shared/Utils/useSiteColors";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const colors = useSiteColors();
  const bgColor = useColorModeValue(colors.background.secondary, "gray.800");
  const borderColor = useColorModeValue(colors.border.primary, "gray.600");

  return (
    <Box
      as="footer"
      bg={bgColor}
      color={colors.text.primary}
      borderTop={`1px solid ${borderColor}`}
      py={10}
      mt="auto"
    >
      <Container maxW="full" px={4}>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={8}
        >
          <GridItem>
            <Stack spacing={4}>
              <Heading size="md" color={colors.text.primary}>
                🚀 MARS Client
              </Heading>
              <Text color={colors.text.secondary}>
                Мощная платформа для управления стримингом и создания
                интерактивных компонентов для OBS.
              </Text>
            </Stack>
          </GridItem>

          <GridItem>
            <Stack spacing={4}>
              <Heading size="sm" color={colors.text.primary}>
                Быстрые ссылки
              </Heading>
              <Stack spacing={2}>
                <ChakraLink
                  as={Link}
                  to="/"
                  color={colors.text.secondary}
                  _hover={{ color: colors.text.primary }}
                >
                  Главная
                </ChakraLink>
                <ChakraLink
                  as={Link}
                  to="/about"
                  color={colors.text.secondary}
                  _hover={{ color: colors.text.primary }}
                >
                  О проекте
                </ChakraLink>
                <ChakraLink
                  as={Link}
                  to="/docs"
                  color={colors.text.secondary}
                  _hover={{ color: colors.text.primary }}
                >
                  Документация
                </ChakraLink>
                <ChakraLink
                  as={Link}
                  to="/contacts"
                  color={colors.text.secondary}
                  _hover={{ color: colors.text.primary }}
                >
                  Контакты
                </ChakraLink>
              </Stack>
            </Stack>
          </GridItem>

          <GridItem>
            <Stack spacing={4}>
              <Heading size="sm" color={colors.text.primary}>
                OBS Компоненты
              </Heading>
              <Stack spacing={2}>
                <ChakraLink
                  as={Link}
                  to="/pyroalerts"
                  color={colors.text.secondary}
                  _hover={{ color: colors.text.primary }}
                >
                  Pyro Alerts
                </ChakraLink>
                <ChakraLink
                  as={Link}
                  to="/waifu"
                  color={colors.text.secondary}
                  _hover={{ color: colors.text.primary }}
                >
                  Waifu Alerts
                </ChakraLink>
                <ChakraLink
                  as={Link}
                  to="/chath"
                  color={colors.text.secondary}
                  _hover={{ color: colors.text.primary }}
                >
                  Горизонтальный чат
                </ChakraLink>
                <ChakraLink
                  as={Link}
                  to="/chatv"
                  color={colors.text.secondary}
                  _hover={{ color: colors.text.primary }}
                >
                  Вертикальный чат
                </ChakraLink>
              </Stack>
            </Stack>
          </GridItem>

          <GridItem>
            <Stack spacing={4}>
              <Heading size="sm" color={colors.text.primary}>
                Панель управления
              </Heading>
              <Stack spacing={2}>
                <ChakraLink
                  as={Link}
                  to="/admin"
                  color={colors.text.secondary}
                  _hover={{ color: colors.text.primary }}
                >
                  Админ панель
                </ChakraLink>
                <ChakraLink
                  as={Link}
                  to="/dashboard"
                  color={colors.text.secondary}
                  _hover={{ color: colors.text.primary }}
                >
                  Дашборд
                </ChakraLink>
                <ChakraLink
                  as={Link}
                  to="/main"
                  color={colors.text.secondary}
                  _hover={{ color: colors.text.primary }}
                >
                  Просмотр серверов
                </ChakraLink>
                <ChakraLink
                  as={Link}
                  to="/services"
                  color={colors.text.secondary}
                  _hover={{ color: colors.text.primary }}
                >
                  Сервисы
                </ChakraLink>
              </Stack>
            </Stack>
          </GridItem>
        </Grid>

        <Divider my={8} borderColor={borderColor} />

        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "center", md: "center" }}
          gap={4}
        >
          <Text
            color={colors.text.muted}
            textAlign={{ base: "center", md: "left" }}
          >
            &copy; {currentYear} MARS Client. Все права защищены.
          </Text>

          <Flex gap={4} justify="center">
            <ChakraLink
              href="#"
              aria-label="GitHub"
              color={colors.text.secondary}
              _hover={{ color: colors.text.primary }}
            >
              <Text fontSize="lg">🐙</Text>
            </ChakraLink>
            <ChakraLink
              href="#"
              aria-label="Discord"
              color={colors.text.secondary}
              _hover={{ color: colors.text.primary }}
            >
              <Text fontSize="lg">💬</Text>
            </ChakraLink>
            <ChakraLink
              href="#"
              aria-label="Twitter"
              color={colors.text.secondary}
              _hover={{ color: colors.text.primary }}
            >
              <Text fontSize="lg">🐦</Text>
            </ChakraLink>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
