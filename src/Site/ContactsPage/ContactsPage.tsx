import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const ContactsPage = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      description: "Основной способ связи",
      value: "info@mars-project.com",
      action: "Написать письмо",
    },
    {
      icon: "💬",
      title: "Discord",
      description: "Присоединяйтесь к нашему серверу",
      value: "@mars-project",
      action: "Присоединиться",
    },
    {
      icon: "🐙",
      title: "GitHub",
      description: "Исходный код и issues",
      value: "github.com/mars-project",
      action: "Перейти",
    },
    {
      icon: "📖",
      title: "Документация",
      description: "Подробные руководства",
      value: "docs.mars-project.com",
      action: "Изучить",
    },
  ];

  const faqItems = [
    {
      question: "Как начать использовать MARS?",
      answer:
        "Начните с изучения документации, затем установите базовые компоненты и настройте их под свои нужды.",
    },
    {
      question: "Поддерживается ли мобильная версия?",
      answer:
        "Да, веб-интерфейс MARS полностью адаптивен и работает на всех устройствах.",
    },
    {
      question: "Можно ли создавать собственные компоненты?",
      answer:
        "Конечно! MARS предоставляет API для создания кастомных компонентов и интеграций.",
    },
    {
      question: "Есть ли платная версия?",
      answer: "В настоящее время MARS полностью бесплатен для использования.",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно для заполнения";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен для заполнения";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Тема обязательна для заполнения";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Сообщение обязательно для заполнения";
    }

    if (!formData.category) {
      newErrors.category = "Выберите категорию";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Имитация отправки формы
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Сообщение отправлено!",
        description: "Мы свяжемся с вами в ближайшее время.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Сброс формы
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "",
      });
    } catch (error) {
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте отправить сообщение позже.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box p={8} bg="white" minH="100vh">
      <VStack gap={16} align="stretch">
        {/* Hero Section */}
        <Box textAlign="center" py={12}>
          <VStack gap={8}>
            <Text fontSize="6xl" fontWeight="bold">
              📞
            </Text>
            <Heading as="h1" size="2xl" color="gray.800">
              Свяжитесь с нами
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="2xl">
              У вас есть вопросы по MARS? Хотите поделиться идеями или сообщить
              об ошибке? Мы всегда готовы помочь и выслушать ваши предложения.
            </Text>
          </VStack>
        </Box>

        {/* Contact Methods Grid */}
        <Box>
          <Heading
            as="h2"
            size="xl"
            color="gray.800"
            textAlign="center"
            mb={12}
          >
            Способы связи
          </Heading>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={6}
          >
            {contactMethods.map((method, index) => (
              <Box
                key={index}
                p={6}
                bg="gray.50"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.200"
                textAlign="center"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "lg",
                }}
              >
                <VStack gap={4}>
                  <Text
                    fontSize="4xl"
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                  >
                    {method.icon}
                  </Text>
                  <Heading as="h3" size="md" color="gray.800">
                    {method.title}
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    {method.description}
                  </Text>
                  <Text fontWeight="semibold" color="blue.600" fontSize="sm">
                    {method.value}
                  </Text>
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="blue"
                    _hover={{ bg: "blue.500", color: "white" }}
                  >
                    {method.action}
                  </Button>
                </VStack>
              </Box>
            ))}
          </Grid>
        </Box>

        {/* Contact Form and FAQ */}
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={12}>
          {/* Contact Form */}
          <Box>
            <Heading as="h2" size="xl" color="gray.800" mb={8}>
              Отправить сообщение
            </Heading>
            <Box
              as="form"
              onSubmit={handleSubmit}
              p={6}
              bg="gray.50"
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.200"
            >
              <VStack gap={6}>
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>Имя *</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ваше имя"
                    bg="white"
                    borderColor="gray.300"
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px blue.500",
                    }}
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>Email *</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    bg="white"
                    borderColor="gray.300"
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px blue.500",
                    }}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.category}>
                  <FormLabel>Категория *</FormLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Выберите категорию"
                    bg="white"
                    borderColor="gray.300"
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px blue.500",
                    }}
                  >
                    <option value="general">Общие вопросы</option>
                    <option value="technical">Техническая поддержка</option>
                    <option value="feature">Предложение функций</option>
                    <option value="bug">Сообщение об ошибке</option>
                    <option value="partnership">Сотрудничество</option>
                  </Select>
                  <FormErrorMessage>{errors.category}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.subject}>
                  <FormLabel>Тема *</FormLabel>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Краткое описание вопроса"
                    bg="white"
                    borderColor="gray.300"
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px blue.500",
                    }}
                  />
                  <FormErrorMessage>{errors.subject}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.message}>
                  <FormLabel>Сообщение *</FormLabel>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Подробно опишите ваш вопрос или предложение..."
                    rows={6}
                    bg="white"
                    borderColor="gray.300"
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px blue.500",
                    }}
                  />
                  <FormErrorMessage>{errors.message}</FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  w="full"
                  isLoading={isSubmitting}
                  loadingText="Отправка..."
                >
                  Отправить сообщение
                </Button>
              </VStack>
            </Box>
          </Box>

          {/* FAQ Section */}
          <Box>
            <Heading as="h2" size="xl" color="gray.800" mb={8}>
              Часто задаваемые вопросы
            </Heading>
            <VStack gap={4} align="stretch">
              {faqItems.map((item, index) => (
                <Box
                  key={index}
                  p={6}
                  bg="gray.50"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="gray.200"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateX(4px)",
                    boxShadow: "md",
                  }}
                >
                  <VStack gap={3} align="stretch">
                    <Heading as="h3" size="md" color="gray.800">
                      {item.question}
                    </Heading>
                    <Text color="gray.600" fontSize="sm">
                      {item.answer}
                    </Text>
                  </VStack>
                </Box>
              ))}
            </VStack>
          </Box>
        </Grid>

        {/* Additional Info */}
        <Box
          p={8}
          bg="blue.50"
          borderRadius="xl"
          border="1px solid"
          borderColor="blue.200"
          textAlign="center"
        >
          <VStack gap={6}>
            <Heading as="h2" size="xl" color="blue.800">
              Нужна срочная помощь?
            </Heading>
            <Text fontSize="lg" color="blue.700" maxW="2xl">
              Для критических проблем или срочных вопросов используйте Discord
              сервер. Наша команда обычно отвечает в течение нескольких часов.
            </Text>
            <Button
              size="lg"
              colorScheme="blue"
              variant="solid"
              _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
            >
              🚀 Присоединиться к Discord
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default ContactsPage;
