import { Box, Button, Container, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { useSiteColors } from "@/shared/Utils/useSiteColors";
import { useState } from "react";

import AutoMessageBillboardTest from "@/components/OBS_Components/AutoMessageBillboard/AutoMessageBillboardTest";

export default function AutoMessageBillboardPage() {
  const [testMessage, setTestMessage] = useState("");

  // Цветовые переменные
  const colors = useSiteColors();
  const bgPrimary = colors.background.primary;
  const bgSecondary = colors.background.secondary;
  const textPrimary = colors.text.primary;
  const textSecondary = colors.text.secondary;
  const borderColor = colors.border.primary;

  const handleSendTestMessage = () => {
    if (testMessage.trim()) {
      // Симулируем SignalR событие
      const event = new CustomEvent("AutoMessage", { detail: testMessage });
      window.dispatchEvent(event);
      setTestMessage("");
    }
  };

  const sendRandomMessages = () => {
    const messages = [
      "Привет всем! Как дела?",
      "Не забудьте подписаться на канал!",
      "Спасибо за поддержку!",
      "Сегодня отличный день для стрима!",
      "Донатеры - вы лучшие!",
      "Нажмите на колокольчик!",
      "Лайк за старания!",
      "Комментарий для алгоритма!",
    ];

    messages.forEach((message, index) => {
      setTimeout(() => {
        const event = new CustomEvent("AutoMessage", { detail: message });
        window.dispatchEvent(event);
      }, index * 2000); // Каждые 2 секунды
    });
  };

  const sendEmoteMessages = () => {
    const emoteMessages = [
      "Kappa это круто!",
      "PogChamp момент!",
      "FeelsGoodMan",
      "monkaS",
      "LUL",
      "PepeHands",
    ];

    emoteMessages.forEach((message, index) => {
      setTimeout(() => {
        const event = new CustomEvent("AutoMessage", { detail: message });
        window.dispatchEvent(event);
      }, index * 2000); // Каждые 2 секунды
    });
  };

  return (
    <Container maxW="container.xl" py={6}>
      <Stack gap={8} align="stretch">
        {/* Заголовок и описание */}
        <Box textAlign="center">
          <Heading as="h1" size="xl" color={textPrimary} mb={3}>
            AutoMessageBillboard Demo
          </Heading>
          <Text fontSize="lg" color={textSecondary}>
            Демонстрация компонента для отображения автоматических сообщений
          </Text>
        </Box>

        {/* Управление */}
        <Box
          bg={bgSecondary}
          p={6}
          borderRadius="xl"
          borderWidth="1px"
          borderColor={borderColor}
          shadow="md"
        >
          <Stack gap={4} align="stretch">
            {/* Поле ввода и кнопка отправки */}
            <Box>
              <Input
                type="text"
                value={testMessage}
                onChange={e => setTestMessage(e.target.value)}
                placeholder="Введите тестовое сообщение..."
                bg={bgPrimary}
                borderColor={borderColor}
                _focus={{ borderColor: "blue.400", boxShadow: "outline" }}
                size="lg"
                mb={3}
              />
              <Button
                onClick={handleSendTestMessage}
                colorScheme="blue"
                size="lg"
                w="100%"
              >
                Отправить
              </Button>
            </Box>

            {/* Кнопки для отправки серий сообщений */}
            <Button
              onClick={sendRandomMessages}
              colorScheme="green"
              variant="outline"
              size="lg"
            >
              Отправить серию сообщений
            </Button>

            <Button
              onClick={sendEmoteMessages}
              colorScheme="purple"
              variant="outline"
              size="lg"
            >
              Отправить сообщения с эмодзи
            </Button>
          </Stack>
        </Box>

        {/* Информация о работе */}
        <Box
          bg={bgSecondary}
          p={6}
          borderRadius="xl"
          borderWidth="1px"
          borderColor={borderColor}
          shadow="md"
        >
          <Heading as="h3" size="md" color={textPrimary} mb={4}>
            Как это работает:
          </Heading>
          <Box as="ul" color={textSecondary} pl={6}>
            <Box as="li" mb={2}>
              Компонент подписывается на SignalR событие "AutoMessage"
            </Box>
            <Box as="li" mb={2}>
              При получении сообщения появляется билборд справа
            </Box>
            <Box as="li" mb={2}>
              Билборд отображается 3 секунды с анимацией пульсации
            </Box>
            <Box as="li" mb={2}>
              Затем плавно исчезает за пределы экрана
            </Box>
            <Box as="li">Поддерживает эмодзи 7TV, BTTV, FFZ и Twitch</Box>
          </Box>
        </Box>

        {/* Тестовый компонент */}
        <Box>
          <AutoMessageBillboardTest />
        </Box>
      </Stack>
    </Container>
  );
}
