import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  useColorModeValue, // Import useColorModeValue
} from "@chakra-ui/react";

import ColorDemo from "@/Site/Site_Components/ColorDemo/ColorDemo";

/**
 * Страница для демонстрации глобальных цветовых переменных
 */
const ColorDemoPage: React.FC = () => {
  // Цветовые переменные
  const bgSecondary = useColorModeValue("gray.50", "gray.700");
  const bgCard = useColorModeValue("white", "gray.700");
  const textPrimary = useColorModeValue("gray.800", "white");
  const textSecondary = useColorModeValue("gray.600", "gray.300");
  const textMuted = useColorModeValue("gray.500", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const shadowLight = useColorModeValue("sm", "lg");

  return (
    <Container maxW="container.xl" py={6}>
      <Stack gap={8} align="stretch">
        {/* Заголовок */}
        <Box
          bg={bgCard}
          p={8}
          borderRadius="xl"
          borderWidth="1px"
          borderColor={borderColor}
          shadow={shadowLight}
          textAlign="center"
        >
          <Heading as="h1" size="xl" color={textPrimary} mb={4}>
            Глобальные цветовые переменные
          </Heading>
          <Text fontSize="lg" color={textSecondary} mb={4}>
            Демонстрация системы глобальных цветовых переменных, которые
            автоматически адаптируются к теме
          </Text>
          <Box
            bg={bgSecondary}
            px={4}
            py={2}
            borderRadius="full"
            display="inline-block"
          >
            <Text color={textMuted} fontSize="sm">
              Текущая тема:{" "}
              <Text as="span" fontWeight="bold">
                светлая
              </Text>
            </Text>
          </Box>
        </Box>

        {/* Компонент демонстрации цветов */}
        <Box>
          <ColorDemo />
        </Box>

        {/* Информационная секция */}
        <Box
          bg={bgCard}
          p={8}
          borderRadius="xl"
          borderWidth="1px"
          borderColor={borderColor}
          shadow={shadowLight}
        >
          <Heading as="h2" size="lg" color={textPrimary} mb={6}>
            Как использовать
          </Heading>

          <Stack gap={6} align="stretch">
            {/* Пример с TypeScript хуком */}
            <Box>
              <Heading as="h3" size="md" color={textSecondary} mb={3}>
                TypeScript хук
              </Heading>
              <Box
                bg={bgSecondary}
                p={4}
                borderRadius="md"
                borderWidth="1px"
                borderColor={borderColor}
                overflowX="auto"
              >
                <Text
                  as="pre"
                  fontFamily="mono"
                  fontSize="sm"
                  color={textPrimary}
                >
                  {`import { useColorModeValue } from "@chakra-ui/react";

const colors = useColorModeValue("light", "dark");

return (
  <Box bg={useColorModeValue("white", "gray.800")}>
    <Heading color={useColorModeValue("gray.800", "white")}>
      Заголовок
    </Heading>
  </Box>
);`}
                </Text>
              </Box>
            </Box>

            {/* Пример с CSS классами */}
            <Box>
              <Heading as="h3" size="md" color={textSecondary} mb={3}>
                CSS классы
              </Heading>
              <Box
                bg={bgSecondary}
                p={4}
                borderRadius="md"
                borderWidth="1px"
                borderColor={borderColor}
                overflowX="auto"
              >
                <Text
                  as="pre"
                  fontFamily="mono"
                  fontSize="sm"
                  color={textPrimary}
                >
                  {`<Box className="chakra-ui-light">
  <Container className="chakra-container">
    <Text className="chakra-text">
      Контент
    </Text>
  </Container>
</Box>`}
                </Text>
              </Box>
            </Box>

            {/* Пример с CSS переменными */}
            <Box>
              <Heading as="h3" size="md" color={textSecondary} mb={3}>
                CSS переменные
              </Heading>
              <Box
                bg={bgSecondary}
                p={4}
                borderRadius="md"
                borderWidth="1px"
                borderColor={borderColor}
                overflowX="auto"
              >
                <Text
                  as="pre"
                  fontFamily="mono"
                  fontSize="sm"
                  color={textPrimary}
                >
                  {`.myComponent {
  color: var(--chakra-colors-gray-800);
  background-color: var(--chakra-colors-white);
  border: 1px solid var(--chakra-colors-gray-200);
  box-shadow: var(--chakra-shadows-sm);
}`}
                </Text>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default ColorDemoPage;
