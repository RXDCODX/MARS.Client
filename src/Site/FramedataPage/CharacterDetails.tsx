import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { TekkenCharacter } from "@/shared/api/data-contracts";

import { getCharacterImage, handleImageError } from "./imageUtils";

interface CharacterDetailsProps {
  character: TekkenCharacter;
  onBack: () => void;
  onViewMoves: (character: TekkenCharacter) => void;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  character,
  onBack,
  onViewMoves,
}) => {
  const charName =
    character.name.charAt(0).toUpperCase() + character.name.slice(1);

  // Chakra UI color mode values
  const bgPrimary = useColorModeValue("white", "gray.800");
  const bgSecondary = useColorModeValue("gray.50", "gray.700");
  const bgCard = useColorModeValue("white", "gray.700");
  const textPrimary = useColorModeValue("gray.800", "white");
  const textSecondary = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const accentColor = useColorModeValue("blue.500", "blue.300");
  const shadowMedium = useColorModeValue("md", "xl");
  const shadowLight = useColorModeValue("sm", "lg");

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
        <Flex align="center">
          <Image
            src={getCharacterImage(character, "100x120")}
            alt={charName}
            boxSize="100px"
            objectFit="cover"
            borderRadius="md"
            border="3px solid"
            borderColor={bgPrimary} // Use bgPrimary for border to simulate white border in light mode
            shadow={shadowMedium}
            onError={(e: any) => handleImageError(e, charName, "100x120")}
          />
          <Box ml={4}>
            <Heading as="h1" size="xl" color={textPrimary} mb={1}>
              {charName}
            </Heading>
            <Text fontSize="lg" color={textSecondary}>
              Персонаж Tekken 8 • {character.movelist?.length || "Нет"} ударов
            </Text>
          </Box>
        </Flex>
      </Flex>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <Box>
          <Card
            bg={bgCard}
            borderColor={borderColor}
            shadow={shadowMedium}
            borderRadius="xl"
            overflow="hidden"
          >
            <Box position="relative" overflow="hidden" h="400px">
              <Image
                src={getCharacterImage(character, "400x500")}
                alt={charName}
                objectFit="cover"
                w="100%"
                h="100%"
                transition="transform 0.4s ease"
                _hover={{ transform: "scale(1.05)" }}
                onError={(e: any) => handleImageError(e, charName, "400x500")}
              />
              <Flex
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                background="linear-gradient(to bottom, transparent 70%, rgba(0, 0, 0, 0.6) 100%)"
                align="flex-end"
                justify="center"
                p={4}
              >
                <Badge
                  colorScheme="blue"
                  px={4}
                  py={2}
                  borderRadius="full"
                  shadow="md"
                >
                  {character.movelist?.length || 0} ударов
                </Badge>
              </Flex>
            </Box>
            <CardBody p={6} textAlign="center">
              <Button
                colorScheme="blue"
                size="lg"
                width="100%"
                leftIcon={<i className="bi bi-list-ul" />}
                onClick={() => onViewMoves(character)}
              >
                Изучить фреймдату
              </Button>
            </CardBody>
          </Card>
        </Box>

        <Box>
          <Card
            bg={bgCard}
            borderColor={borderColor}
            shadow={shadowMedium}
            borderRadius="xl"
          >
            <CardHeader
              p={6}
              borderBottom="1px solid"
              borderColor={borderColor}
            >
              <Heading as="h4" size="md" color={textPrimary}>
                <Text as="span" color={accentColor} mr={2}>
                  <i className="bi bi-person-badge"></i>
                </Text>
                Информация о персонаже
              </Heading>
            </CardHeader>
            <CardBody p={6}>
              {character.description && (
                <Box
                  mb={6}
                  pb={6}
                  borderBottom="1px solid"
                  borderColor={borderColor}
                >
                  <Heading as="h5" size="sm" color={textPrimary} mb={3}>
                    <Text as="span" color={accentColor} mr={2}>
                      <i className="bi bi-chat-quote"></i>
                    </Text>
                    Описание
                  </Heading>
                  <Text color={textSecondary}>{character.description}</Text>
                </Box>
              )}

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
                <Box>
                  {character.strengths && character.strengths.length > 0 && (
                    <Box>
                      <Heading as="h5" size="sm" color={textPrimary} mb={3}>
                        <Text as="span" color="green.500" mr={2}>
                          <i className="bi bi-shield-check"></i>
                        </Text>
                        Сильные стороны
                      </Heading>
                      <Flex wrap="wrap" gap={2}>
                        {character.strengths.map((strength, index) => (
                          <Badge
                            key={index}
                            colorScheme="green"
                            px={3}
                            py={1}
                            borderRadius="full"
                          >
                            {strength}
                          </Badge>
                        ))}
                      </Flex>
                    </Box>
                  )}
                </Box>

                <Box>
                  {character.weaknesess && character.weaknesess.length > 0 && (
                    <Box>
                      <Heading as="h5" size="sm" color={textPrimary} mb={3}>
                        <Text as="span" color="orange.500" mr={2}>
                          <i className="bi bi-exclamation-triangle"></i>
                        </Text>
                        Слабые стороны
                      </Heading>
                      <Flex wrap="wrap" gap={2}>
                        {character.weaknesess.map((weakness, index) => (
                          <Badge
                            key={index}
                            colorScheme="orange"
                            px={3}
                            py={1}
                            borderRadius="full"
                          >
                            {weakness}
                          </Badge>
                        ))}
                      </Flex>
                    </Box>
                  )}
                </Box>
              </SimpleGrid>

              <Flex
                align="center"
                mt={6}
                pt={6}
                borderTop="1px solid"
                borderColor={borderColor}
              >
                <Text as="span" mr={2} color={textSecondary}>
                  <i className="bi bi-clock"></i>
                </Text>
                <Text fontSize="sm" color={textSecondary}>
                  Последнее обновление:{" "}
                  <Text as="span" fontWeight="bold">
                    {new Date(character.lastUpdateTime).toLocaleDateString(
                      "ru-RU",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </Text>
                </Text>
              </Flex>
            </CardBody>
          </Card>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default CharacterDetails;
