import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { TekkenCharacter } from "@/shared/api/data-contracts";

import { getCharacterImage, handleImageError } from "./imageUtils";

interface CharacterGridProps {
  characters: TekkenCharacter[];
  isLoading: boolean;
  error: string;
  onCharacterSelect: (character: TekkenCharacter) => void;
  onNavigateToChangesReview: () => void;
}

interface FramedataStats {
  totalPending: number;
  byType: { [key: string]: number };
  byCharacter: { [key: string]: number };
}

const CharacterGrid: React.FC<CharacterGridProps> = ({
  characters,
  isLoading,
  error,
  onCharacterSelect,
  onNavigateToChangesReview,
}) => {
  const [stats, setStats] = useState<FramedataStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  // Chakra UI color mode values
  const bgPrimary = useColorModeValue("white", "gray.800");
  const bgSecondary = useColorModeValue("gray.50", "gray.700");
  const bgCard = useColorModeValue("white", "gray.700");
  const textPrimary = useColorModeValue("gray.800", "white");
  const textSecondary = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const shadowLight = useColorModeValue("sm", "lg");
  const shadowMedium = useColorModeValue("md", "xl");
  const accentColor = useColorModeValue("blue.500", "blue.300");

  // Load framedata changes statistics
  useEffect(() => {
    const loadStats = async () => {
      try {
        setIsLoadingStats(true);
        const response = await fetch("/api/framedatachanges/stats");
        if (response.ok) {
          const statsData = await response.json();
          setStats({
            totalPending: statsData.totalPending,
            byType: statsData.byType,
            byCharacter: statsData.byCharacter,
          });
        }
      } catch (error) {
        console.error("Error loading framedata stats:", error);
      } finally {
        setIsLoadingStats(false);
      }
    };

    loadStats();
  }, []);

  const handleAcceptAll = async () => {
    try {
      const pendingChanges = await fetch("/api/framedatachanges/pending");
      if (pendingChanges.ok) {
        const changes = await pendingChanges.json();
        for (const change of changes) {
          await fetch(`/api/framedatachanges/apply/${change.id}`, {
            method: "POST",
          });
        }
        // Reload stats after applying changes
        window.location.reload();
      }
    } catch (error) {
      console.error("Error accepting all changes:", error);
    }
  };

  const handleRejectAll = async () => {
    try {
      const pendingChanges = await fetch("/api/framedatachanges/pending");
      if (pendingChanges.ok) {
        const changes = await pendingChanges.json();
        for (const change of changes) {
          await fetch(`/api/framedatachanges/reject/${change.id}`, {
            method: "POST",
          });
        }
        // Reload stats after rejecting changes
        window.location.reload();
      }
    } catch (error) {
      console.error("Error rejecting all changes:", error);
    }
  };

  if (isLoading) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        py={10}
        height="100%"
      >
        <Spinner size="xl" color={accentColor} />
        <Text mt={3} color={textSecondary}>
          Загрузка персонажей...
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
        </Box>
      </Alert>
    );
  }

  if (characters.length === 0) {
    return (
      <Alert status="info" mb={6} borderRadius="md">
        <AlertIcon />
        <Box>
          <Heading as="h4" size="md" color={textPrimary}>
            Персонажи не найдены
          </Heading>
          <Text color={textSecondary}>Пока нет доступных персонажей.</Text>
        </Box>
      </Alert>
    );
  }

  return (
    <Box py={4}>
      {/* Modern Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading as="h1" size="xl" color={textPrimary} mb={2}>
            <Text as="span" color={accentColor} mr={3}>
              <i className="bi bi-people-fill"></i>
            </Text>
            Персонажи Tekken 8
          </Heading>
          <Text fontSize="lg" color={textSecondary}>
            Выберите персонажа для просмотра детальной информации и фреймдаты
          </Text>
        </Box>
        <Badge colorScheme="blue" px={4} py={2} borderRadius="full">
          {characters.length} персонажей
        </Badge>
      </Flex>

      {/* Framedata Changes Statistics Card */}
      <Card
        bg={bgCard}
        borderColor={borderColor}
        shadow={shadowMedium}
        mb={6}
        borderRadius="xl"
      >
        <CardBody p={6}>
          <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
            <Flex align="center">
              <Box
                bg={accentColor}
                p={3}
                borderRadius="lg"
                mr={3}
                color="white"
              >
                <i className="bi bi-graph-up-arrow"></i>
              </Box>
              <Box>
                <Heading as="h5" size="md" mb={1} color={textPrimary}>
                  Изменения Framedata
                </Heading>
                <Text fontSize="sm" color={textSecondary}>
                  {isLoadingStats ? (
                    <Spinner size="sm" color={accentColor} />
                  ) : stats ? (
                    <>Ожидает рассмотрения: {stats.totalPending} изменений</>
                  ) : (
                    "Не удалось загрузить статистику"
                  )}
                </Text>
              </Box>
            </Flex>

            <Flex gap={3} wrap="wrap">
              <Button
                colorScheme="green"
                size="sm"
                leftIcon={<i className="bi bi-check-all" />}
                isDisabled={!stats || stats.totalPending === 0}
                onClick={handleAcceptAll}
              >
                Принять все
              </Button>
              <Button
                colorScheme="blue"
                size="sm"
                leftIcon={<i className="bi bi-eye" />}
                isDisabled={!stats || stats.totalPending === 0}
                onClick={onNavigateToChangesReview}
              >
                Рассмотреть
              </Button>
              <Button
                colorScheme="red"
                size="sm"
                leftIcon={<i className="bi bi-x-lg" />}
                isDisabled={!stats || stats.totalPending === 0}
                onClick={handleRejectAll}
              >
                Отклонить все
              </Button>
            </Flex>
          </Flex>

          {/* Quick stats */}
          {stats && stats.totalPending > 0 && (
            <Box bg={bgSecondary} p={4} borderRadius="md" mt={4}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <Box>
                  <Text fontSize="sm" color={textSecondary} mb={2}>
                    По типам:
                  </Text>
                  <Flex wrap="wrap" gap={2}>
                    {Object.entries(stats.byType).map(([type, count]) => (
                      <Badge key={type} colorScheme="gray" size="sm">
                        {type}: {count}
                      </Badge>
                    ))}
                  </Flex>
                </Box>
                <Box>
                  <Text fontSize="sm" color={textSecondary} mb={2}>
                    Топ персонажи:
                  </Text>
                  <Flex wrap="wrap" gap={2}>
                    {Object.entries(stats.byCharacter)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 3)
                      .map(([character, count]) => (
                        <Badge key={character} colorScheme="purple" size="sm">
                          {character}: {count}
                        </Badge>
                      ))}
                  </Flex>
                </Box>
              </SimpleGrid>
            </Box>
          )}
        </CardBody>
      </Card>

      {/* Character Cards Grid */}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 6 }} spacing={6}>
        {characters.map(character => {
          const charName =
            character.name.charAt(0).toUpperCase() + character.name.slice(1);

          const hasPendingChanges = stats?.byCharacter[character.name] > 0;

          return (
            <Card
              key={charName}
              onClick={() => onCharacterSelect(character)}
              cursor="pointer"
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              border="none"
              borderRadius="xl"
              overflow="hidden"
              shadow={shadowLight}
              _hover={{
                transform: "translateY(-8px) scale(1.02)",
                shadow: shadowMedium,
              }}
              _active={{ transform: "translateY(-6px) scale(1.01)" }}
            >
              <Box position="relative" overflow="hidden" h="240px">
                <Image
                  src={getCharacterImage(character, "200x300")}
                  alt={charName}
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  transition="transform 0.4s ease"
                  _hover={{ transform: "scale(1.1)" }}
                  onError={(e: any) => handleImageError(e, charName, "200x300")}
                />
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  background="linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%)"
                  display="flex"
                  alignItems="flex-end"
                  justifyContent="center"
                  p={4}
                  opacity={0}
                  transition="opacity 0.3s ease"
                  _groupHover={{ opacity: 1 }}
                >
                  <Button
                    colorScheme="blue"
                    size="sm"
                    borderRadius="full"
                    px={4}
                    py={2}
                    fontWeight="semibold"
                  >
                    <i className="bi bi-arrow-right"></i>
                  </Button>
                </Box>
                {hasPendingChanges && (
                  <Badge
                    colorScheme="orange"
                    position="absolute"
                    top={2}
                    right={2}
                    px={2}
                    py={1}
                    borderRadius="lg"
                    fontWeight="semibold"
                    animation="pulse 2s infinite"
                    shadow="md"
                  >
                    {stats?.byCharacter[character.name]} изменений
                  </Badge>
                )}
              </Box>

              <CardBody p={4}>
                <Box textAlign="center">
                  <Heading as="h3" size="md" mb={2} color={textPrimary}>
                    {charName}
                  </Heading>
                  {character.description && (
                    <Text fontSize="sm" color={textSecondary} mb={2}>
                      {character.description.length > 80
                        ? `${character.description.substring(0, 80)}...`
                        : character.description}
                    </Text>
                  )}
                </Box>

                <Flex
                  justify="center"
                  align="center"
                  mt={"auto"}
                  pt={2}
                  borderTop="1px solid"
                  borderColor={borderColor}
                >
                  <Text fontSize="xs" color={textSecondary}>
                    <Text as="span" mr={1}>
                      <i className="bi bi-calendar3"></i>
                    </Text>
                    {new Date(character.lastUpdateTime).toLocaleDateString(
                      "ru-RU"
                    )}
                  </Text>
                </Flex>
              </CardBody>
            </Card>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default CharacterGrid;
