import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const RecentLogs: React.FC = () => {
  const logs = [
    {
      id: 1,
      level: "info",
      message: "Пользователь успешно авторизован",
      timestamp: "2 мин назад",
      service: "Auth",
    },
    {
      id: 2,
      level: "warning",
      message: "Высокое использование памяти",
      timestamp: "5 мин назад",
      service: "System",
    },
    {
      id: 3,
      level: "error",
      message: "Ошибка подключения к базе данных",
      timestamp: "8 мин назад",
      service: "Database",
    },
    {
      id: 4,
      level: "info",
      message: "Новый файл загружен",
      timestamp: "12 мин назад",
      service: "FileService",
    },
    {
      id: 5,
      level: "info",
      message: "Запрос обработан успешно",
      timestamp: "15 мин назад",
      service: "API",
    },
  ];

  // Chakra UI color mode values
  const bgCard = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const boxShadow = useColorModeValue("sm", "xl");
  const bgLight = useColorModeValue("gray.100", "gray.800");
  const textPrimary = useColorModeValue("gray.800", "white");
  const textSecondary = useColorModeValue("gray.600", "gray.300");

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "info":
        return "ℹ️";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      case "debug":
        return "🐛";
      default:
        return "📝";
    }
  };

  const getLevelColors = (level: string) => {
    switch (level) {
      case "info":
        return {
          bg: useColorModeValue("blue.50", "blue.700"),
          borderColor: useColorModeValue("blue.200", "blue.600"),
        };
      case "warning":
        return {
          bg: useColorModeValue("orange.50", "orange.700"),
          borderColor: useColorModeValue("orange.200", "orange.600"),
        };
      case "error":
        return {
          bg: useColorModeValue("red.50", "red.700"),
          borderColor: useColorModeValue("red.200", "red.600"),
        };
      case "debug":
        return {
          bg: useColorModeValue("gray.50", "gray.700"),
          borderColor: useColorModeValue("gray.200", "gray.600"),
        };
      default:
        return {
          bg: useColorModeValue("blue.50", "blue.700"),
          borderColor: useColorModeValue("blue.200", "blue.600"),
        };
    }
  };

  return (
    <Box
      bg={bgCard}
      borderRadius="lg"
      p={6}
      boxShadow={boxShadow}
      border="1px solid"
      borderColor={borderColor}
    >
      <Flex
        justify="space-between"
        align="center"
        mb={5}
        pb={4}
        borderBottom="1px solid"
        borderColor={borderColor}
      >
        <Heading as="h3" size="md" color={textPrimary}>
          Последние логи
        </Heading>
        <Button variant="outline" size="sm" colorScheme="blue">
          🔄 Обновить
        </Button>
      </Flex>

      <VStack spacing={3} align="stretch" mb={5} maxH="300px" overflowY="auto">
        {logs.map(log => {
          const levelColors = getLevelColors(log.level);
          return (
            <Box
              key={log.id}
              p={3}
              borderRadius="md"
              border="1px solid"
              bg={levelColors.bg}
              borderColor={levelColors.borderColor}
              transition="all 0.2s ease"
              _hover={{ transform: "translateX(4px)", boxShadow: "md" }}
            >
              <Flex align="center" mb={2}>
                <Box fontSize="lg" mr={3}>
                  {getLevelIcon(log.level)}
                </Box>
                <Flex flex="1" justify="space-between" align="center">
                  <Text fontWeight="semibold" fontSize="sm" color={textPrimary}>
                    {log.service}
                  </Text>
                  <Text fontSize="xs" color={textSecondary}>
                    {log.timestamp}
                  </Text>
                </Flex>
              </Flex>
              <Text fontSize="sm" color={textPrimary}>
                {log.message}
              </Text>
            </Box>
          );
        })}
      </VStack>

      <Box pt={4} borderTop="1px solid" borderColor={borderColor}>
        <Button
          width="100%"
          colorScheme="blue"
          py={3}
          borderRadius="md"
          fontWeight="semibold"
          bg={useColorModeValue("blue.500", "blue.300")}
          color="white"
          _hover={{
            bg: useColorModeValue("blue.600", "blue.400"),
            boxShadow: "lg",
          }}
        >
          Просмотреть все логи
        </Button>
      </Box>
    </Box>
  );
};

export default RecentLogs;
