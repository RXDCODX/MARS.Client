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

const ActiveUsers: React.FC = () => {
  const users = [
    {
      id: 1,
      name: "Алексей Петров",
      status: "online",
      lastActivity: "2 мин назад",
      avatar: "👤",
    },
    {
      id: 2,
      name: "Мария Сидорова",
      status: "online",
      lastActivity: "5 мин назад",
      avatar: "👤",
    },
    {
      id: 3,
      name: "Дмитрий Козлов",
      status: "away",
      lastActivity: "15 мин назад",
      avatar: "👤",
    },
    {
      id: 4,
      name: "Анна Волкова",
      status: "online",
      lastActivity: "1 мин назад",
      avatar: "👤",
    },
    {
      id: 5,
      name: "Сергей Морозов",
      status: "offline",
      lastActivity: "1 час назад",
      avatar: "👤",
    },
  ];

  // Chakra UI color mode values
  const bgCard = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const boxShadow = useColorModeValue("sm", "xl");
  const bgLight = useColorModeValue("gray.100", "gray.800");
  const textPrimary = useColorModeValue("gray.800", "white");
  const textSecondary = useColorModeValue("gray.600", "gray.300");
  const accentColor = useColorModeValue("blue.500", "blue.300");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return useColorModeValue("green.500", "green.300");
      case "away":
        return useColorModeValue("orange.500", "orange.300");
      case "offline":
        return useColorModeValue("gray.500", "gray.400");
      default:
        return useColorModeValue("gray.500", "gray.400");
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "online":
        return useColorModeValue("green.100", "green.800");
      case "away":
        return useColorModeValue("orange.100", "orange.800");
      case "offline":
        return useColorModeValue("gray.100", "gray.800");
      default:
        return useColorModeValue("gray.100", "gray.800");
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "В сети";
      case "away":
        return "Отошел";
      case "offline":
        return "Не в сети";
      default:
        return "Неизвестно";
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
          Активные пользователи
        </Heading>
        <Text
          bg={bgLight}
          px={3}
          py={1}
          borderRadius="md"
          fontSize="sm"
          color={textSecondary}
        >
          {users.length} пользователей
        </Text>
      </Flex>

      <VStack spacing={3} align="stretch" mb={5}>
        {users.map(user => (
          <Flex
            key={user.id}
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
            <Flex align="center">
              <Box
                boxSize="40px"
                bg={borderColor}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="xl"
                color={textPrimary}
                mr={3}
              >
                {user.avatar}
              </Box>
              <Box>
                <Text fontWeight="semibold" color={textPrimary} mb={0}>
                  {user.name}
                </Text>
                <Text fontSize="sm" color={textSecondary}>
                  {user.lastActivity}
                </Text>
              </Box>
            </Flex>
            <Flex
              align="center"
              gap={2}
              fontSize="sm"
              fontWeight="medium"
              color={getStatusColor(user.status)}
            >
              <Box
                boxSize="8px"
                borderRadius="full"
                bg={getStatusColor(user.status)}
              ></Box>
              <Text>{getStatusText(user.status)}</Text>
            </Flex>
          </Flex>
        ))}
      </VStack>

      <Box pt={4} borderTop="1px solid" borderColor={borderColor}>
        <Button
          width="100%"
          colorScheme="blue"
          py={3}
          borderRadius="md"
          fontWeight="semibold"
          bg={accentColor}
          color="white"
          _hover={{
            bg: useColorModeValue("blue.600", "blue.400"),
            boxShadow: "lg",
          }}
        >
          Посмотреть всех пользователей
        </Button>
      </Box>
    </Box>
  );
};

export default ActiveUsers;
