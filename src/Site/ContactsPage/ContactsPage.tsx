import {
  ChatIcon,
  EmailIcon,
  ExternalLinkIcon,
  PhoneIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Icon,
  Link as ChakraLink, // Import Link from Chakra UI
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Form, Toast, ToastContainer } from "react-bootstrap"; // Import Form, Toast, ToastContainer from react-bootstrap

const ContactsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastStatus, setToastStatus] = useState("success");

  const bgPrimary = "white";
  const bgSecondary = "gray.50";
  const bgCard = "white";
  const textPrimary = "gray.800";
  const textSecondary = "gray.600";
  const borderColor = "gray.200";

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Имитация отправки формы
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", email: "", subject: "", message: "" });

      setToastMessage("Сообщение отправлено!");
      setToastStatus("success");
      setShowToast(true);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: EmailIcon,
      title: "Email",
      value: "support@marsclient.com",
      link: "mailto:support@marsclient.com",
    },
    {
      icon: ChatIcon,
      title: "Discord",
      value: "MARS Client Community",
      link: "#",
    },
    {
      icon: ExternalLinkIcon,
      title: "GitHub",
      value: "github.com/marsclient",
      link: "#",
    },
    {
      icon: PhoneIcon,
      title: "Telegram",
      value: "@marsclient_support",
      link: "#",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box bg={bgSecondary} py={20}>
        <Container maxW="container.xl" textAlign="center">
          <Box display="flex" flexDirection="column" gap={6}>
            {/* Keep spacing for now */}
            <Heading as="h1" size="2xl" color={textPrimary}>
              Свяжитесь с нами
            </Heading>
            <Text fontSize="xl" color={textSecondary} maxW="2xl" mx="auto">
              У вас есть вопросы или предложения? Мы будем рады услышать от вас!
            </Text>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" py={20}>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={12}>
          {/* Contact Info */}
          <GridItem>
            <Box
              display="flex"
              flexDirection="column"
              gap={8}
              alignItems="flex-start"
            >
              {/* Keep spacing for now */}
              <Box>
                <Heading as="h2" size="xl" mb={4} color={textPrimary}>
                  Контактная информация
                </Heading>
                <Text fontSize="lg" color={textSecondary} mb={6}>
                  Выберите удобный для вас способ связи
                </Text>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                gap={4}
                alignItems="stretch"
                w="100%"
              >
                {" "}
                {/* Keep spacing for now */}
                {contactInfo.map((contact, index) => (
                  <ChakraLink
                    key={index}
                    href={contact.link}
                    target={
                      contact.link.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      contact.link.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    p={4}
                    bg={bgCard}
                    border="1px solid"
                    borderColor={borderColor}
                    borderRadius="lg"
                    _hover={{
                      bg: bgSecondary,
                      transform: "translateY(-2px)",
                      shadow: "lg",
                    }}
                    transition="all 0.2s"
                    display="flex"
                    alignItems="center"
                    gap={3}
                  >
                    <Icon as={contact.icon} boxSize={6} color="blue.500" />
                    <Box>
                      <Text fontWeight="semibold" color={textPrimary}>
                        {contact.title}
                      </Text>
                      <Text fontSize="sm" color={textSecondary}>
                        {contact.value}
                      </Text>
                    </Box>
                  </ChakraLink>
                ))}
              </Box>
            </Box>
          </GridItem>

          {/* Contact Form */}
          <GridItem>
            <Box
              bg={bgCard}
              p={8}
              borderRadius="xl"
              border="1px solid"
              borderColor={borderColor}
              shadow="md"
            >
              <Box
                display="flex"
                flexDirection="column"
                gap={6}
                alignItems="stretch"
              >
                <Box>
                  <Heading as="h2" size="lg" mb={2} color={textPrimary}>
                    Отправить сообщение
                  </Heading>
                  <Text color={textSecondary}>
                    Заполните форму ниже, и мы свяжемся с вами в ближайшее время
                  </Text>
                </Box>

                <Form onSubmit={handleSubmit}>
                  {" "}
                  {/* Use react-bootstrap Form */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={4}
                    alignItems="stretch"
                  >
                    <Form.Group controlId="formName" className="mb-4">
                      {" "}
                      {/* Use Form.Group and className for margin */}
                      <Form.Label style={{ color: textPrimary }}>
                        Имя
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ваше имя"
                        style={{
                          backgroundColor: bgPrimary,
                          borderColor: borderColor,
                          color: textPrimary,
                        }}
                      />
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="mb-4">
                      {" "}
                      {/* Use Form.Group and className for margin */}
                      <Form.Label style={{ color: textPrimary }}>
                        Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        style={{
                          backgroundColor: bgPrimary,
                          borderColor: borderColor,
                          color: textPrimary,
                        }}
                      />
                    </Form.Group>

                    <Form.Group controlId="formSubject" className="mb-4">
                      {" "}
                      {/* Use Form.Group and className for margin */}
                      <Form.Label style={{ color: textPrimary }}>
                        Тема
                      </Form.Label>
                      <Form.Select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: bgPrimary,
                          borderColor: borderColor,
                          color: textPrimary,
                        }}
                      >
                        <option value="">Выберите тему</option>
                        <option value="general">Общий вопрос</option>
                        <option value="technical">Техническая поддержка</option>
                        <option value="partnership">Сотрудничество</option>
                        <option value="feedback">Обратная связь</option>
                        <option value="other">Другое</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formMessage" className="mb-4">
                      {" "}
                      {/* Use Form.Group and className for margin */}
                      <Form.Label style={{ color: textPrimary }}>
                        Сообщение
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        placeholder="Опишите ваш вопрос или предложение..."
                        style={{
                          backgroundColor: bgPrimary,
                          borderColor: borderColor,
                          color: textPrimary,
                        }}
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      colorScheme="blue"
                      size="lg"
                      loading={isSubmitting}
                      loadingText="Отправка..."
                      w="100%"
                    >
                      Отправить сообщение
                    </Button>
                  </Box>
                </Form>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Container>

      {/* FAQ Section */}
      <Box bg={bgSecondary} py={20}>
        <Container maxW="container.xl">
          <Box display="flex" flexDirection="column" gap={12}>
            <Heading as="h2" size="xl" color={textPrimary} textAlign="center">
              Часто задаваемые вопросы
            </Heading>
            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
              }}
              gap={8}
            >
              <GridItem>
                <Box
                  bg={bgCard}
                  p={6}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={borderColor}
                  shadow="md"
                >
                  <Heading as="h3" size="md" mb={3} color={textPrimary}>
                    Как начать использовать MARS Client?
                  </Heading>
                  <Text color={textSecondary}>
                    Скачайте приложение, создайте аккаунт и следуйте инструкциям
                    по настройке. Наша документация поможет вам быстро освоить
                    все функции.
                  </Text>
                </Box>
              </GridItem>

              <GridItem>
                <Box
                  bg={bgCard}
                  p={6}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={borderColor}
                  shadow="md"
                >
                  <Heading as="h3" size="md" mb={3} color={textPrimary}>
                    Поддерживаются ли мобильные устройства?
                  </Heading>
                  <Text color={textSecondary}>
                    Да, MARS Client работает на всех современных устройствах,
                    включая смартфоны и планшеты.
                  </Text>
                </Box>
              </GridItem>

              <GridItem>
                <Box
                  bg={bgCard}
                  p={6}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={borderColor}
                  shadow="md"
                >
                  <Heading as="h3" size="md" mb={3} color={textPrimary}>
                    Есть ли бесплатная версия?
                  </Heading>
                  <Text color={textSecondary}>
                    Да, мы предлагаем бесплатный план с базовыми функциями. Для
                    расширенных возможностей доступны платные подписки.
                  </Text>
                </Box>
              </GridItem>

              <GridItem>
                <Box
                  bg={bgCard}
                  p={6}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={borderColor}
                  shadow="md"
                >
                  <Heading as="h3" size="md" mb={3} color={textPrimary}>
                    Как получить техническую поддержку?
                  </Heading>
                  <Text color={textSecondary}>
                    Вы можете обратиться к нам через форму выше, Discord сервер
                    или email. Мы отвечаем в течение 24 часов.
                  </Text>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Container>
      </Box>
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg={toastStatus}
        >
          <Toast.Header>
            <strong className="me-auto">Уведомление</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Box>
  );
};

export default ContactsPage;
