import {
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const SystemStatus: React.FC = () => {
  const services = [
    {
      name: "Web API",
      status: "online",
      uptime: "2д 14ч 32м",
    },
    {
      name: "Database",
      status: "online",
      uptime: "5д 8ч 15м",
    },
    {
      name: "Redis Cache",
      status: "online",
      uptime: "1д 22ч 8м",
    },
    {
      name: "File Storage",
      status: "online",
      uptime: "3д 6ч 45м",
    },
    {
      name: "Email Service",
      status: "warning",
      uptime: "12ч 30м",
    },
    {
      name: "Background Jobs",
      status: "online",
      uptime: "4д 1ч 20м",
    },
  ];

  // Chakra UI color mode values
  const bgCard = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const boxShadow = useColorModeValue("sm", "xl");
  const bgLight = useColorModeValue("gray.100", "gray.800");
  const textPrimary = useColorModeValue("gray.800", "white");
  const textSecondary = useColorModeValue("gray.600", "gray.300");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return "🟢";
      case "warning":
        return "🟡";
      case "error":
        return "🔴";
      default:
        return "⚪";
    }
  };

  const getStatusColors = (status: string) => {
    switch (status) {
      case "online":
        return {
          bg: useColorModeValue("green.100", "green.800"),
          color: useColorModeValue("green.500", "green.300"),
        };
      case "warning":
        return {
          bg: useColorModeValue("orange.100", "orange.800"),
          color: useColorModeValue("orange.500", "orange.300"),
        };
      case "error":
        return {
          bg: useColorModeValue("red.100", "red.800"),
          color: useColorModeValue("red.500", "red.300"),
        };
      default:
        return {
          bg: useColorModeValue("gray.100", "gray.800"),
          color: useColorModeValue("gray.600", "gray.300"),
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
          Статус сервисов
        </Heading>
        <Text fontSize="sm" color={textSecondary}>
          Обновлено: {new Date().toLocaleTimeString("ru-RU")}
        </Text>
      </Flex>

      <VStack spacing={3} align="stretch">
        {services.map((service, index) => {
          const statusColors = getStatusColors(service.status);
          return (
            <Flex
              key={index}
              justify="space-between"
              align="center"
              p={3}
              bg={bgLight}
              borderRadius="md"
              border="1px solid"
              borderColor={borderColor}
              transition="all 0.2s ease"
              _hover={{
                bg: bgCard,
                transform: "translateX(4px)",
                boxShadow: "md",
              }}
            >
              <Box>
                <Text fontWeight="semibold" color={textPrimary} mb={1}>
                  {service.name}
                </Text>
                <Text fontSize="sm" color={textSecondary}>
                  Uptime: {service.uptime}
                </Text>
              </Box>
              <Flex
                align="center"
                gap={2}
                px={3}
                py={1}
                borderRadius="md"
                fontSize="sm"
                fontWeight="medium"
                bg={statusColors.bg}
                color={statusColors.color}
              >
                <Box fontSize="md">{getStatusIcon(service.status)}</Box>
                <Text>
                  {service.status === "online"
                    ? "Работает"
                    : service.status === "warning"
                      ? "Предупреждение"
                      : "Ошибка"}
                </Text>
              </Flex>
            </Flex>
          );
        })}
      </VStack>
    </Box>
  );
};

export default SystemStatus;
