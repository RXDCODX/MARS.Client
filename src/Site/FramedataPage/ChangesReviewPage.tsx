import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface FramedataChange {
  id: number;
  characterName: string;
  changeType: string;
  detectedAt: string;
  appliedAt: string | null;
  status: string;
  description: string;
  changeInfo?: any;
  currentInfo?: any;
}

interface ChangesReviewPageProps {
  onBack: () => void;
}

const ChangesReviewPage: React.FC<ChangesReviewPageProps> = ({ onBack }) => {
  const [changes, setChanges] = useState<FramedataChange[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedChange, setSelectedChange] = useState<FramedataChange | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI modal hook
  const [processingChanges, setProcessingChanges] = useState<Set<number>>(
    new Set()
  );

  // Chakra UI color mode values
  const bgPrimary = useColorModeValue("white", "gray.800");
  const bgSecondary = useColorModeValue("gray.50", "gray.700");
  const bgCard = useColorModeValue("white", "gray.700");
  const textPrimary = useColorModeValue("gray.800", "white");
  const textSecondary = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const accentColor = useColorModeValue("blue.500", "blue.300");
  const shadowLight = useColorModeValue("sm", "lg");
  const shadowMedium = useColorModeValue("md", "xl");

  useEffect(() => {
    loadPendingChanges();
  }, []);

  const loadPendingChanges = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch("/api/framedatachanges/pending");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const changesData = await response.json();
      setChanges(changesData);
    } catch (error) {
      console.error("Error loading pending changes:", error);
      setError(error instanceof Error ? error.message : "Неизвестная ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveChange = async (changeId: number) => {
    try {
      setProcessingChanges(prev => new Set(prev).add(changeId));

      const response = await fetch(`/api/framedatachanges/apply/${changeId}`, {
        method: "POST",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка при применении изменения");
      }

      // Remove the change from the list
      setChanges(prev => prev.filter(change => change.id !== changeId));
    } catch (error) {
      console.error("Error approving change:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Ошибка при применении изменения"
      );
    } finally {
      setProcessingChanges(prev => {
        const newSet = new Set(prev);
        newSet.delete(changeId);
        return newSet;
      });
    }
  };

  const handleRejectChange = async (changeId: number) => {
    try {
      setProcessingChanges(prev => new Set(prev).add(changeId));

      const response = await fetch(`/api/framedatachanges/reject/${changeId}`, {
        method: "POST",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка при отклонении изменения");
      }

      // Remove the change from the list
      setChanges(prev => prev.filter(change => change.id !== changeId));
    } catch (error) {
      console.error("Error rejecting change:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Ошибка при отклонении изменения"
      );
    } finally {
      setProcessingChanges(prev => {
        const newSet = new Set(prev);
        newSet.delete(changeId);
        return newSet;
      });
    }
  };

  const handleViewDetails = (change: FramedataChange) => {
    setSelectedChange(change);
    onOpen(); // Open Chakra UI modal
  };

  const getChangeTypeColor = (changeType: string) => {
    switch (changeType.toLowerCase()) {
      case "newcharacter":
        return "green"; // Chakra color scheme name
      case "newmove":
        return "blue";
      case "moveupdate":
        return "orange";
      case "moveremoval":
        return "red";
      case "characterupdate":
        return "teal";
      default:
        return "gray";
    }
  };

  const getChangeTypeLabel = (changeType: string) => {
    switch (changeType.toLowerCase()) {
      case "newcharacter":
        return "Новый персонаж";
      case "newmove":
        return "Новый удар";
      case "moveupdate":
        return "Изменение удара";
      case "moveremoval":
        return "Удаление удара";
      case "characterupdate":
        return "Изменение персонажа";
      default:
        return changeType;
    }
  };

  if (isLoading) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        py={10}
        height="100vh"
      >
        <Spinner size="xl" color={accentColor} />
        <Text mt={3} color={textSecondary}>
          Загрузка изменений...
        </Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert status="error" mb={6} borderRadius="md">
        <AlertIcon />
        <Box>
          <Heading as="h4" size="md" color={textPrimary}>
            Ошибка загрузки
          </Heading>
          <Text color={textSecondary}>{error}</Text>
          <Button
            mt={3}
            variant="outline"
            colorScheme="red"
            onClick={loadPendingChanges}
          >
            Попробовать снова
          </Button>
        </Box>
      </Alert>
    );
  }

  return (
    <Box py={4}>
      {/* Header */}
      <Flex
        justify="space-between"
        align="center"
        mb={6}
        p={4}
        bg={bgSecondary}
        borderRadius="lg"
      >
        <Button
          variant="outline"
          onClick={onBack}
          leftIcon={<i className="bi bi-arrow-left" />}
        >
          К персонажам
        </Button>
        <Box textAlign="right">
          <Heading as="h2" size="xl" color={textPrimary} mb={1}>
            <Text as="span" color={accentColor} mr={3}>
              <i className="bi bi-clipboard-check"></i>
            </Text>
            Рассмотрение изменений
          </Heading>
          <Text fontSize="lg" color={textSecondary}>
            Проверьте и примите решение по ожидающим изменениям в framedata
          </Text>
        </Box>
      </Flex>

      {/* Summary Card */}
      <Card
        bg={accentColor}
        color="white"
        shadow={shadowMedium}
        mb={6}
        borderRadius="xl"
      >
        <CardBody p={6}>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={6}
            alignItems="center"
          >
            <Box>
              <Heading as="h5" size="md" mb={3}>
                Сводка изменений
              </Heading>
              <Flex wrap="wrap" gap={2}>
                {Object.entries(
                  changes.reduce(
                    (acc, change) => {
                      acc[change.changeType] =
                        (acc[change.changeType] || 0) + 1;
                      return acc;
                    },
                    {} as Record<string, number>
                  )
                ).map(([type, count]) => (
                  <Badge
                    key={type}
                    colorScheme={getChangeTypeColor(type)}
                    px={3}
                    py={1}
                    borderRadius="full"
                    bg="whiteAlpha.300"
                    color="white"
                  >
                    {getChangeTypeLabel(type)}: {count}
                  </Badge>
                ))}
              </Flex>
            </Box>
            <Box textAlign={{ base: "start", md: "end" }}>
              <Box>
                <Heading as="h3" size="2xl" color="white" mb={0}>
                  {changes.length}
                </Heading>
                <Text fontSize="md" color="whiteAlpha.800">
                  всего изменений
                </Text>
              </Box>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>

      {changes.length === 0 ? (
        <Alert status="info" mb={6} borderRadius="md">
          <AlertIcon />
          <Box>
            <Heading as="h4" size="md" color={textPrimary}>
              Нет ожидающих изменений
            </Heading>
            <Text color={textSecondary}>
              Все изменения обработаны. Проверьте позже.
            </Text>
          </Box>
        </Alert>
      ) : (
        <Card
          bg={bgCard}
          borderColor={borderColor}
          shadow={shadowLight}
          borderRadius="xl"
          overflowX="auto"
        >
          <CardHeader p={4} borderBottom="1px solid" borderColor={borderColor}>
            <Heading as="h5" size="md" color={textPrimary}>
              Ожидающие изменения
            </Heading>
          </CardHeader>
          <CardBody p={0}>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th
                    bg={bgSecondary}
                    color={textPrimary}
                    py={3}
                    px={4}
                    textTransform="uppercase"
                    letterSpacing="wider"
                    fontSize="xs"
                  >
                    Персонаж
                  </Th>
                  <Th
                    bg={bgSecondary}
                    color={textPrimary}
                    py={3}
                    px={4}
                    textTransform="uppercase"
                    letterSpacing="wider"
                    fontSize="xs"
                  >
                    Тип изменения
                  </Th>
                  <Th
                    bg={bgSecondary}
                    color={textPrimary}
                    py={3}
                    px={4}
                    textTransform="uppercase"
                    letterSpacing="wider"
                    fontSize="xs"
                  >
                    Обнаружено
                  </Th>
                  <Th
                    bg={bgSecondary}
                    color={textPrimary}
                    py={3}
                    px={4}
                    textTransform="uppercase"
                    letterSpacing="wider"
                    fontSize="xs"
                  >
                    Описание
                  </Th>
                  <Th
                    bg={bgSecondary}
                    color={textPrimary}
                    py={3}
                    px={4}
                    textTransform="uppercase"
                    letterSpacing="wider"
                    fontSize="xs"
                  >
                    Действия
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {changes.map(change => (
                  <Tr key={change.id} _hover={{ bg: bgSecondary }}>
                    <Td py={3} px={4}>
                      <Text fontWeight="semibold" color={textPrimary}>
                        {change.characterName}
                      </Text>
                    </Td>
                    <Td py={3} px={4}>
                      <Badge
                        colorScheme={getChangeTypeColor(change.changeType)}
                      >
                        {getChangeTypeLabel(change.changeType)}
                      </Badge>
                    </Td>
                    <Td py={3} px={4}>
                      <Text fontSize="sm" color={textSecondary}>
                        {new Date(change.detectedAt).toLocaleString("ru-RU")}
                      </Text>
                    </Td>
                    <Td py={3} px={4}>
                      <Text
                        fontSize="sm"
                        color={textSecondary}
                        isTruncated
                        maxW="200px"
                      >
                        {change.description || "Нет описания"}
                      </Text>
                    </Td>
                    <Td py={3} px={4}>
                      <Flex gap={2} justify="center">
                        <Button
                          variant="outline"
                          colorScheme="blue"
                          size="sm"
                          onClick={() => handleViewDetails(change)}
                        >
                          <i className="bi bi-eye"></i>
                        </Button>
                        <Button
                          variant="outline"
                          colorScheme="green"
                          size="sm"
                          onClick={() => handleApproveChange(change.id)}
                          isDisabled={processingChanges.has(change.id)}
                        >
                          {processingChanges.has(change.id) ? (
                            <Spinner size="xs" />
                          ) : (
                            <i className="bi bi-check"></i>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          colorScheme="red"
                          size="sm"
                          onClick={() => handleRejectChange(change.id)}
                          isDisabled={processingChanges.has(change.id)}
                        >
                          {processingChanges.has(change.id) ? (
                            <Spinner size="xs" />
                          ) : (
                            <i className="bi bi-x"></i>
                          )}
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      )}

      {/* Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent
          bg={bgCard}
          color={textPrimary}
          borderRadius="lg"
          shadow={shadowMedium}
        >
          <ModalHeader
            borderBottom="1px solid"
            borderColor={borderColor}
            pb={3}
          >
            <Heading size="lg" color={textPrimary}>
              Детали изменения
            </Heading>
          </ModalHeader>
          <ModalBody p={6}>
            {selectedChange && (
              <Box>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
                  <Box>
                    <Text fontWeight="semibold" color={textPrimary}>
                      Персонаж:
                    </Text>
                    <Text color={textSecondary}>
                      {selectedChange.characterName}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="semibold" color={textPrimary}>
                      Тип:
                    </Text>
                    <Badge
                      colorScheme={getChangeTypeColor(
                        selectedChange.changeType
                      )}
                    >
                      {getChangeTypeLabel(selectedChange.changeType)}
                    </Badge>
                  </Box>
                </SimpleGrid>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
                  <Box>
                    <Text fontWeight="semibold" color={textPrimary}>
                      Обнаружено:
                    </Text>
                    <Text color={textSecondary}>
                      {new Date(selectedChange.detectedAt).toLocaleString(
                        "ru-RU"
                      )}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="semibold" color={textPrimary}>
                      Статус:
                    </Text>
                    <Badge
                      colorScheme={
                        selectedChange.status === "Pending" ? "orange" : "gray"
                      }
                    >
                      {selectedChange.status}
                    </Badge>
                  </Box>
                </SimpleGrid>

                {selectedChange.description && (
                  <Box mb={4}>
                    <Text fontWeight="semibold" color={textPrimary}>
                      Описание:
                    </Text>
                    <Text color={textSecondary} mt={1}>
                      {selectedChange.description}
                    </Text>
                  </Box>
                )}

                {selectedChange.changeInfo && (
                  <Accordion allowToggle mt={6}>
                    <AccordionItem>
                      <AccordionButton
                        bg={bgSecondary}
                        color={textPrimary}
                        _hover={{ bg: bgSecondary }}
                      >
                        <Box flex="1" textAlign="left" fontWeight="semibold">
                          Новые данные
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel
                        pb={4}
                        bg={bgPrimary}
                        border="1px solid"
                        borderColor={borderColor}
                        borderRadius="md"
                        mt={2}
                      >
                        <Text
                          as="pre"
                          fontSize="sm"
                          p={2}
                          borderRadius="md"
                          overflowX="auto"
                          whiteSpace="pre-wrap"
                          wordBreak="break-word"
                          color={textPrimary}
                          bg={bgSecondary}
                        >
                          {JSON.stringify(
                            JSON.parse(selectedChange.changeInfo.jsonData),
                            null,
                            2
                          )}
                        </Text>
                      </AccordionPanel>
                    </AccordionItem>
                    {selectedChange.currentInfo && (
                      <AccordionItem mt={2}>
                        <AccordionButton
                          bg={bgSecondary}
                          color={textPrimary}
                          _hover={{ bg: bgSecondary }}
                        >
                          <Box flex="1" textAlign="left" fontWeight="semibold">
                            Текущие данные
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel
                          pb={4}
                          bg={bgPrimary}
                          border="1px solid"
                          borderColor={borderColor}
                          borderRadius="md"
                          mt={2}
                        >
                          <Text
                            as="pre"
                            fontSize="sm"
                            p={2}
                            borderRadius="md"
                            overflowX="auto"
                            whiteSpace="pre-wrap"
                            wordBreak="break-word"
                            color={textPrimary}
                            bg={bgSecondary}
                          >
                            {JSON.stringify(
                              JSON.parse(selectedChange.currentInfo.jsonData),
                              null,
                              2
                            )}
                          </Text>
                        </AccordionPanel>
                      </AccordionItem>
                    )}
                  </Accordion>
                )}
              </Box>
            )}
          </ModalBody>
          <ModalFooter borderTop="1px solid" borderColor={borderColor} pt={4}>
            <Button
              colorScheme="green"
              onClick={() =>
                selectedChange && handleApproveChange(selectedChange.id)
              }
              isDisabled={
                !selectedChange || processingChanges.has(selectedChange.id)
              }
              mr={3}
            >
              {processingChanges.has(selectedChange?.id) ? (
                <Spinner size="sm" />
              ) : (
                <i className="bi bi-check"></i>
              )}
              Применить
            </Button>
            <Button
              colorScheme="red"
              onClick={() =>
                selectedChange && handleRejectChange(selectedChange.id)
              }
              isDisabled={
                !selectedChange || processingChanges.has(selectedChange.id)
              }
              mr={3}
            >
              {processingChanges.has(selectedChange?.id) ? (
                <Spinner size="sm" />
              ) : (
                <i className="bi bi-x"></i>
              )}
              Отклонить
            </Button>
            <Button variant="outline" onClick={onClose} colorScheme="gray">
              Закрыть
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ChangesReviewPage;
