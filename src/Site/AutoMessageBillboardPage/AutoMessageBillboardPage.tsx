import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  VStack,
  Grid,
} from "@chakra-ui/react";
import React, { useState } from "react";

import AutoMessageBillboard from "@/components/OBS_Components/AutoMessageBillboard";

export default function AutoMessageBillboardPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const cardBg = useColorModeValue("gray.50", "gray.700");

  const handleSendTestMessage = () => {
    setCurrentMessage("Тестовое сообщение от пользователя");
    setTimeout(() => setCurrentMessage(""), 5000);
  };

  const sendRandomMessages = () => {
    const messages = [
      "Привет всем! 👋",
      "Как дела? 😊",
      "Отличный стрим! 🎉",
      "Спасибо за контент! 🙏",
      "У вас классно получается! ⭐",
    ];

    setIsRunning(true);
    let index = 0;

    const interval = setInterval(() => {
      setCurrentMessage(messages[index]);
      index = (index + 1) % messages.length;
    }, 3000);

    setTimeout(() => {
      clearInterval(interval);
      setIsRunning(false);
      setCurrentMessage("");
    }, 15000);
  };

  const sendEmoteMessages = () => {
    const emoteMessages = [
      "Kappa 👻",
      "PogChamp 😮",
      "monkaS 😰",
      "FeelsGoodMan 😌",
      "PepeHands 😢",
    ];

    setIsRunning(true);
    let index = 0;

    const interval = setInterval(() => {
      setCurrentMessage(emoteMessages[index]);
      index = (index + 1) % emoteMessages.length;
    }, 2000);

    setTimeout(() => {
      clearInterval(interval);
      setIsRunning(false);
      setCurrentMessage("");
    }, 10000);
  };

  return (
    <Box p={8} bg={bgColor} minH="100vh">
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading as="h1" size="2xl" color={textColor} mb={4}>
            Auto Message Billboard
          </Heading>
          <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.300")} maxW="2xl" mx="auto">
            Автоматическое отображение сообщений в виде красивого билборда для OBS.
            Идеально подходит для стримов и презентаций.
          </Text>
        </Box>

        {/* Controls */}
        <Box
          p={6}
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="xl"
          maxW="2xl"
          mx="auto"
          w="full"
        >
          <VStack spacing={6}>
            <Heading as="h2" size="lg" color={textColor}>
              Управление
            </Heading>
            
            <Flex gap={4} flexWrap="wrap" justify="center">
              <Button
                colorScheme="blue"
                onClick={handleSendTestMessage}
                isDisabled={isRunning}
              >
                Тестовое сообщение
              </Button>
              
              <Button
                colorScheme="green"
                onClick={sendRandomMessages}
                isDisabled={isRunning}
              >
                Случайные сообщения
              </Button>
              
              <Button
                colorScheme="purple"
                onClick={sendEmoteMessages}
                isDisabled={isRunning}
              >
                Emote сообщения
              </Button>
            </Flex>

            {isRunning && (
              <Text color="green.500" fontWeight="semibold">
                🔄 Автоматическая отправка активна...
              </Text>
            )}

            {currentMessage && (
              <Box
                p={4}
                bg="blue.50"
                border="1px solid"
                borderColor="blue.200"
                borderRadius="md"
                textAlign="center"
              >
                <Text color="blue.800" fontWeight="medium">
                  Текущее сообщение: {currentMessage}
                </Text>
              </Box>
            )}
          </VStack>
        </Box>

        {/* Component Preview */}
        <Box>
          <Heading as="h2" size="lg" color={textColor} mb={6} textAlign="center">
            Предварительный просмотр
          </Heading>
          <Box
            border="2px dashed"
            borderColor={borderColor}
            borderRadius="xl"
            p={8}
            bg={cardBg}
            minH="400px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <AutoMessageBillboard />
          </Box>
        </Box>

        {/* Features */}
        <Box>
          <Heading as="h2" size="lg" color={textColor} mb={6} textAlign="center">
            Возможности
          </Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
            <Box
              p={6}
              bg={cardBg}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="lg"
              textAlign="center"
            >
              <Text fontSize="4xl" mb={4}>🎨</Text>
              <Heading as="h3" size="md" color={textColor} mb={3}>
                Красивый дизайн
              </Heading>
              <Text color={useColorModeValue("gray.600", "gray.300")} fontSize="sm">
                Современный и привлекательный интерфейс с плавными анимациями
              </Text>
            </Box>
            
            <Box
              p={6}
              bg={cardBg}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="lg"
              textAlign="center"
            >
              <Text fontSize="4xl" mb={4}>⚡</Text>
              <Heading as="h3" size="md" color={textColor} mb={3}>
                Быстрая настройка
              </Heading>
              <Text color={useColorModeValue("gray.600", "gray.300")} fontSize="sm">
                Простая настройка и интеграция с OBS Studio
              </Text>
            </Box>
            
            <Box
              p={6}
              bg={cardBg}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="lg"
              textAlign="center"
            >
              <Text fontSize="4xl" mb={4}>🔧</Text>
              <Heading as="h3" size="md" color={textColor} mb={3}>
                Гибкая настройка
              </Heading>
              <Text color={useColorModeValue("gray.600", "gray.300")} fontSize="sm">
                Настройка цветов, размеров и поведения компонента
              </Text>
            </Box>
          </Grid>
        </Box>
      </VStack>
    </Box>
  );
}
