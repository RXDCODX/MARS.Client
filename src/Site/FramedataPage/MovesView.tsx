import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";

import { Move, TekkenCharacter } from "@/shared/api/data-contracts";

import { getCharacterImage, handleImageError } from "./imageUtils";

interface MovesViewProps {
  character: TekkenCharacter;
  onBack: () => void;
}

const MovesView: React.FC<MovesViewProps> = ({ character, onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stanceFilter, setStanceFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showHeatOnly, setShowHeatOnly] = useState(false);
  const [showPowerCrushOnly, setShowPowerCrushOnly] = useState(false);
  const [showThrow, setShowThrow] = useState(false);
  const [showHoming, setShowHoming] = useState(false);
  const [showTornado, setShowTornado] = useState(false);

  const charName = character.name;
  const bgPrimary = "white";
  const bgSecondary = "gray.50";
  const bgCard = "white";
  const textPrimary = "gray.800";
  const textSecondary = "gray.600";
  const borderColor = "gray.200";
  const accentColor = "blue.500";
  const shadowLight = "sm";

  const filteredMoves = useMemo(() => {
    if (!character.movelist) return [];

    const moves = character.movelist.filter((move: Move) => {
      const matchesSearch = move.command
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesStance = !stanceFilter || move.stanceCode === stanceFilter;

      const matchesHeat = !showHeatOnly || move.heatEngage || move.heatSmash;
      const matchesPowerCrush = !showPowerCrushOnly || move.powerCrush;
      const matchesThrow = !showThrow || move.throw;
      const matchesHoming = !showHoming || move.homing;
      const matchesTornado = !showTornado || move.tornado;

      return (
        matchesSearch &&
        matchesStance &&
        matchesHeat &&
        matchesPowerCrush &&
        matchesThrow &&
        matchesHoming &&
        matchesTornado
      );
    });

    return moves;
  }, [
    character.movelist,
    searchTerm,
    stanceFilter,
    showHeatOnly,
    showPowerCrushOnly,
    showThrow,
    showHoming,
    showTornado,
  ]);

  const stances = useMemo(() => {
    if (!character.movelist) return [];
    const uniqueStances = new Set(
      character.movelist.map((move: Move) => move.stanceCode).filter(Boolean)
    );
    return Array.from(uniqueStances);
  }, [character.movelist]);

  if (!character.movelist) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" color={accentColor} />
        <Text mt={4} color={textSecondary}>
          Загрузка списка движений...
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Flex
        justify="space-between"
        align="center"
        mb={6}
        p={4}
        bg={bgCard}
        borderRadius="lg"
        border="1px solid"
        borderColor={bgPrimary}
        shadow={shadowLight}
      >
        <Button variant="outline" onClick={onBack}>
          <i className="bi bi-arrow-left" />К персонажу
        </Button>
        <Flex align="center">
          <Image
            src={getCharacterImage(character)}
            alt={charName}
            w="80px"
            h="100px"
            objectFit="cover"
            borderRadius="md"
            border="2px solid"
            borderColor={bgPrimary}
            shadow={shadowLight}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
              handleImageError(e, charName, "80x100")
            }
          />
          <Box ml={4}>
            <Heading as="h2" size="lg" color={textPrimary} mb={1}>
              {charName}
            </Heading>
            <Text color={textSecondary}>Список движений</Text>
          </Box>
        </Flex>
      </Flex>

      {/* Compact Search Bar */}
      <Box
        bg={bgCard}
        borderColor={borderColor}
        shadow={shadowLight}
        mb={6}
        borderRadius="xl"
        p={6}
      >
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} alignItems="center">
          <Box>
            <Input
              type="text"
              placeholder="Поиск по названию или вводу..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              bg={bgPrimary}
              borderColor={borderColor}
              _focus={{ borderColor: accentColor, boxShadow: "outline" }}
              size="sm"
            />
          </Box>
          <Box>
            <select
              value={stanceFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setStanceFilter(e.target.value)
              }
              style={{
                backgroundColor: bgPrimary,
                borderColor: borderColor,
                color: textPrimary,
                border: "1px solid",
                borderRadius: "6px",
                padding: "8px 12px",
                width: "100%",
              }}
            >
              <option value="">Все стойки</option>
              {stances.map(stance => (
                <option key={stance} value={stance}>
                  {stance}
                </option>
              ))}
            </select>
          </Box>
          <Box>
            <Button
              variant="outline"
              colorScheme="blue"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <i className="bi bi-funnel" />
              Фильтры
              <Badge
                colorScheme="blue"
                ml={2}
                px={2}
                py={1}
                borderRadius="full"
              >
                {
                  [
                    showHeatOnly,
                    showPowerCrushOnly,
                    showThrow,
                    showHoming,
                    showTornado,
                  ].filter(Boolean).length
                }
              </Badge>
            </Button>
          </Box>
        </SimpleGrid>

        {/* Additional Filters */}
        {showFilters && (
          <Box mt={4} pt={4} borderTop="1px solid" borderColor={borderColor}>
            <HStack wrap="wrap" gap={3}>
              <label
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="checkbox"
                  checked={showHeatOnly}
                  onChange={e => setShowHeatOnly(e.target.checked)}
                  style={{ accentColor: "orange" }}
                />
                Heat
              </label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="checkbox"
                  checked={showPowerCrushOnly}
                  onChange={e => setShowPowerCrushOnly(e.target.checked)}
                  style={{ accentColor: "purple" }}
                />
                Power Crush
              </label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="checkbox"
                  checked={showThrow}
                  onChange={e => setShowThrow(e.target.checked)}
                  style={{ accentColor: "teal" }}
                />
                Throw
              </label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="checkbox"
                  checked={showHoming}
                  onChange={e => setShowHoming(e.target.checked)}
                  style={{ accentColor: "green" }}
                />
                Homing
              </label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="checkbox"
                  checked={showTornado}
                  onChange={e => setShowTornado(e.target.checked)}
                  style={{ accentColor: "red" }}
                />
                Tornado
              </label>
            </HStack>
          </Box>
        )}
      </Box>

      {/* Results */}
      {filteredMoves.length === 0 ? (
        <Box
          bg="blue.50"
          border="1px solid"
          borderColor="blue.200"
          borderRadius="md"
          p={4}
          mb={6}
        >
          <Heading as="h4" size="md" color={textPrimary}>
            Движения не найдены
          </Heading>
          <Text color={textSecondary}>
            Попробуйте изменить параметры поиска или фильтры
          </Text>
        </Box>
      ) : (
        <Box
          overflowX="auto"
          bg={bgCard}
          borderRadius="xl"
          shadow={shadowLight}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th
                  style={{
                    backgroundColor: accentColor,
                    color: "white",
                    textTransform: "uppercase",
                    letterSpacing: "wider",
                    padding: "12px 16px",
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Команда
                </th>
                <th
                  style={{
                    backgroundColor: accentColor,
                    color: "white",
                    textTransform: "uppercase",
                    letterSpacing: "wider",
                    padding: "12px 16px",
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Позиция
                </th>
                <th
                  style={{
                    backgroundColor: accentColor,
                    color: "white",
                    textTransform: "uppercase",
                    letterSpacing: "wider",
                    padding: "12px 16px",
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Урон
                </th>
                <th
                  style={{
                    backgroundColor: accentColor,
                    color: "white",
                    textTransform: "uppercase",
                    letterSpacing: "wider",
                    padding: "12px 16px",
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Стартап
                </th>
                <th
                  style={{
                    backgroundColor: accentColor,
                    color: "white",
                    textTransform: "uppercase",
                    letterSpacing: "wider",
                    padding: "12px 16px",
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Блок
                </th>
                <th
                  style={{
                    backgroundColor: accentColor,
                    color: "white",
                    textTransform: "uppercase",
                    letterSpacing: "wider",
                    padding: "12px 16px",
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Хит
                </th>
                <th
                  style={{
                    backgroundColor: accentColor,
                    color: "white",
                    textTransform: "uppercase",
                    letterSpacing: "wider",
                    padding: "12px 16px",
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Контр
                </th>
                <th
                  style={{
                    backgroundColor: accentColor,
                    color: "white",
                    textTransform: "uppercase",
                    letterSpacing: "wider",
                    padding: "12px 16px",
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Свойства
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMoves.map((move: Move, index: number) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: `1px solid ${borderColor}`,
                    backgroundColor: index % 2 === 0 ? bgPrimary : bgSecondary,
                  }}
                >
                  <td
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      color: textPrimary,
                      fontWeight: "bold",
                    }}
                  >
                    {move.command}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      textAlign: "center",
                      color: textSecondary,
                    }}
                  >
                    {move.stanceName || move.stanceCode}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      textAlign: "center",
                      color: textPrimary,
                    }}
                  >
                    {move.damage}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      textAlign: "center",
                      color: textPrimary,
                    }}
                  >
                    {move.startUpFrame}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      textAlign: "center",
                      color: textPrimary,
                    }}
                  >
                    {move.blockFrame}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      textAlign: "center",
                      color: textPrimary,
                    }}
                  >
                    {move.hitFrame}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      textAlign: "center",
                      color: textPrimary,
                    }}
                  >
                    {move.counterHitFrame}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <HStack wrap="wrap" gap={1} justify="center">
                      {move.heatEngage && (
                        <Badge
                          colorScheme="orange"
                          size="sm"
                          borderRadius="full"
                          px={2}
                          py={1}
                        >
                          Heat Engage
                        </Badge>
                      )}
                      {move.heatSmash && (
                        <Badge
                          colorScheme="orange"
                          size="sm"
                          borderRadius="full"
                          px={2}
                          py={1}
                        >
                          Heat Smash
                        </Badge>
                      )}
                      {move.powerCrush && (
                        <Badge
                          colorScheme="purple"
                          size="sm"
                          borderRadius="full"
                          px={2}
                          py={1}
                        >
                          Power Crush
                        </Badge>
                      )}
                      {move.throw && (
                        <Badge
                          colorScheme="teal"
                          size="sm"
                          borderRadius="full"
                          px={2}
                          py={1}
                        >
                          Throw
                        </Badge>
                      )}
                      {move.homing && (
                        <Badge
                          colorScheme="green"
                          size="sm"
                          borderRadius="full"
                          px={2}
                          py={1}
                        >
                          Homing
                        </Badge>
                      )}
                      {move.tornado && (
                        <Badge
                          colorScheme="red"
                          size="sm"
                          borderRadius="full"
                          px={2}
                          py={1}
                        >
                          Tornado
                        </Badge>
                      )}
                      {move.heatBurst && (
                        <Badge
                          colorScheme="orange"
                          size="sm"
                          borderRadius="full"
                          px={2}
                          py={1}
                        >
                          Heat Burst
                        </Badge>
                      )}
                      {move.requiresHeat && (
                        <Badge
                          colorScheme="orange"
                          size="sm"
                          borderRadius="full"
                          px={2}
                          py={1}
                        >
                          Requires Heat
                        </Badge>
                      )}
                    </HStack>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}
    </Box>
  );
};

export default MovesView;
