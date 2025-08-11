import {
  Box,
  Button,
  Grid,
  Heading,
  Text,

} from "@chakra-ui/react";
import React from "react";

import { useSiteColors } from "@/shared/Utils/useSiteColors";

// Removed styles import as components will use Chakra UI props

/**
 * Демонстрационный компонент для показа использования глобальных цветовых переменных
 */
const ColorDemo: React.FC = () => {
  const colors = useSiteColors();

  const cardBg = colors.background.card;
  const borderPrimary = colors.border.primary;
  const shadowLight = colors.shadow.light as any;
  const shadowMedium = colors.shadow.medium as any;
  const shadowHeavy = colors.shadow.heavy as any;
  const shadowInset = colors.shadow.inset as any;
  const hoverBg = colors.hover.background;

  return (
    <Box
      p={8}
      borderRadius="xl"
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderPrimary}
      shadow={shadowLight} // Apply base shadow to the main Box
      textAlign="center" // Keep global text align if needed
    >
      <Heading as="h2" size="lg" color={colors.text.primary} mb={8}>
        Демонстрация глобальных цветовых переменных
      </Heading>

      <Box mb={8}>
        <Heading as="h3" size="md" color={colors.text.secondary} mb={4}>
          Цвета текста
        </Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(180px, 1fr))" gap={4}>
          <Text color={colors.text.primary}>Primary текст</Text>
          <Text color={colors.text.secondary}>Secondary текст</Text>
          <Text color={colors.text.muted}>Muted текст</Text>
          <Text color={colors.text.accent}>Accent текст</Text>
          <Text color={colors.text.success}>Success текст</Text>
          <Text color={colors.text.warning}>Warning текст</Text>
          <Text color={colors.text.danger}>Danger текст</Text>
          <Text color={colors.text.info}>Info текст</Text>
        </Grid>
      </Box>

      <Box mb={8}>
        <Heading as="h3" size="md" color={colors.text.secondary} mb={4}>
          Цвета фонов
        </Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(180px, 1fr))" gap={4}>
          <Box
            bg={colors.background.primary}
            p={4}
            borderRadius="md"
            minH="60px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={colors.text.primary} // Adjust text color for contrast
            border="1px solid"
            borderColor={borderPrimary}
          >
            Primary фон
          </Box>
          <Box
            bg={colors.background.secondary}
            p={4}
            borderRadius="md"
            minH="60px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={colors.text.primary}
            border="1px solid"
            borderColor={borderPrimary}
          >
            Secondary фон
          </Box>
          <Box
            bg={colors.background.tertiary}
            p={4}
            borderRadius="md"
            minH="60px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={colors.text.primary}
            border="1px solid"
            borderColor={borderPrimary}
          >
            Tertiary фон
          </Box>
          <Box
            bg={colors.background.accent}
            p={4}
            borderRadius="md"
            minH="60px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={colors.text.light}
            border="1px solid"
            borderColor={borderPrimary}
          >
            Accent фон
          </Box>
          <Box
            bg={colors.background.success}
            p={4}
            borderRadius="md"
            minH="60px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={colors.text.dark}
            border="1px solid"
            borderColor={borderPrimary}
          >
            Success фон
          </Box>
          <Box
            bg={colors.background.warning}
            p={4}
            borderRadius="md"
            minH="60px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={colors.text.dark}
            border="1px solid"
            borderColor={borderPrimary}
          >
            Warning фон
          </Box>
          <Box
            bg={colors.background.danger}
            p={4}
            borderRadius="md"
            minH="60px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={colors.text.light}
            border="1px solid"
            borderColor={borderPrimary}
          >
            Danger фон
          </Box>
          <Box
            bg={colors.background.info}
            p={4}
            borderRadius="md"
            minH="60px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={colors.text.dark}
            border="1px solid"
            borderColor={borderPrimary}
          >
            Info фон
          </Box>
        </Grid>
      </Box>

      <Box mb={8}>
        <Heading as="h3" size="md" color={colors.text.secondary} mb={4}>
          Кнопки
        </Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap={4}>
          <Button
            bg={colors.background.accent}
            color={colors.text.light}
            _hover={{ bg: hoverBg }}
            transition="all 0.3s ease"
            py={3}
            px={6}
            borderRadius="md"
          >
            Primary кнопка
          </Button>
          <Button
            bg={colors.background.secondary}
            color={colors.text.primary}
            _hover={{ bg: hoverBg }}
            transition="all 0.3s ease"
            py={3}
            px={6}
            borderRadius="md"
          >
            Secondary кнопка
          </Button>
          <Button
            bg={colors.background.success}
            color={colors.text.dark}
            _hover={{ bg: hoverBg }}
            transition="all 0.3s ease"
            py={3}
            px={6}
            borderRadius="md"
          >
            Success кнопка
          </Button>
          <Button
            bg={colors.background.warning}
            color={colors.text.dark}
            _hover={{ bg: hoverBg }}
            transition="all 0.3s ease"
            py={3}
            px={6}
            borderRadius="md"
          >
            Warning кнопка
          </Button>
          <Button
            bg={colors.background.danger}
            color={colors.text.light}
            _hover={{ bg: hoverBg }}
            transition="all 0.3s ease"
            py={3}
            px={6}
            borderRadius="md"
          >
            Danger кнопка
          </Button>
          <Button
            bg={colors.background.info}
            color={colors.text.dark}
            _hover={{ bg: hoverBg }}
            transition="all 0.3s ease"
            py={3}
            px={6}
            borderRadius="md"
          >
            Info кнопка
          </Button>
        </Grid>
      </Box>

      <Box mb={8}>
        <Heading as="h3" size="md" color={colors.text.secondary} mb={4}>
          Тени
        </Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(180px, 1fr))" gap={4}>
          <Box
            bg={cardBg}
            p={6}
            borderRadius="lg"
            shadow={shadowLight}
            borderWidth="1px"
            borderColor={borderPrimary}
            _hover={{ transform: "translateY(-4px)", shadow: shadowMedium }}
            transition="all 0.3s ease"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={colors.text.primary}
          >
            Легкая тень
          </Box>
          <Box
            bg={cardBg}
            p={6}
            borderRadius="lg"
            shadow={shadowMedium}
            borderWidth="1px"
            borderColor={borderPrimary}
            _hover={{ transform: "translateY(-4px)", shadow: shadowHeavy }}
            transition="all 0.3s ease"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={colors.text.primary}
          >
            Средняя тень
          </Box>
          <Box
            bg={cardBg}
            p={6}
            borderRadius="lg"
            shadow={shadowHeavy}
            borderWidth="1px"
            borderColor={borderPrimary}
            _hover={{ transform: "translateY(-4px)", shadow: "2xl" }} // Hardcoded 2xl for heavy
            transition="all 0.3s ease"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={colors.text.primary}
          >
            Тяжелая тень
          </Box>
          <Box
            bg={cardBg}
            p={6}
            borderRadius="lg"
            shadow={shadowInset} // Use converted inset shadow
            borderWidth="1px"
            borderColor={borderPrimary}
            _hover={{ transform: "translateY(-4px)", shadow: "dark-inset" }} // Example hardcoded hover for inset
            transition="all 0.3s ease"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={colors.text.primary}
          >
            Внутренняя тень
          </Box>
        </Grid>
      </Box>

      <Box mb={8}>
        <Heading as="h3" size="md" color={colors.text.secondary} mb={4}>
          CSS классы
        </Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(220px, 1fr))" gap={4}>
          <Box
            className="site-text-primary"
            p={4}
            borderRadius="md"
            borderWidth="1px"
            borderColor={borderPrimary}
          >
            site-text-primary
          </Box>
          <Box
            className="site-text-secondary"
            p={4}
            borderRadius="md"
            borderWidth="1px"
            borderColor={borderPrimary}
          >
            site-text-secondary
          </Box>
          <Box
            className="site-text-muted"
            p={4}
            borderRadius="md"
            borderWidth="1px"
            borderColor={borderPrimary}
          >
            site-text-muted
          </Box>
          <Box
            className="site-text-accent"
            p={4}
            borderRadius="md"
            borderWidth="1px"
            borderColor={borderPrimary}
          >
            site-text-accent
          </Box>
          <Box
            className="site-bg-primary site-text-light"
            p={4}
            borderRadius="md"
            borderWidth="1px"
            borderColor={borderPrimary}
          >
            site-bg-primary
          </Box>
          <Box
            className="site-bg-secondary site-text-light"
            p={4}
            borderRadius="md"
            borderWidth="1px"
            borderColor={borderPrimary}
          >
            site-bg-secondary
          </Box>
          <Box
            className="site-bg-card site-border-primary site-shadow-light"
            p={4}
            borderRadius="md"
            borderWidth="1px"
            borderColor={borderPrimary} // Ensure borderColor is applied if part of the class name
          >
            site-bg-card + site-border-primary + site-shadow-light
          </Box>
        </Grid>
      </Box>

      <Box mb={8}>
        <Heading as="h3" size="md" color={colors.text.secondary} mb={4}>
          Текущая тема
        </Heading>
        <Box
          bg={colors.background.secondary}
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderPrimary}
        >
          <Text color={colors.text.primary} mb={2}>
            Текущая тема:{" "}
            <Text as="span" fontWeight="bold">
              {colors.theme}
            </Text>
          </Text>
          <Text color={colors.text.muted}>
            Все цвета автоматически адаптируются к теме
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ColorDemo;
