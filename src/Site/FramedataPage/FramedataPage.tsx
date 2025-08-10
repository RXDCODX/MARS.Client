import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

import { TekkenCharacter } from "@/shared/api/data-contracts";

import ChangesReviewPage from "./ChangesReviewPage";
import CharacterDetails from "./CharacterDetails";
import CharacterGrid from "./CharacterGrid";
import { NavigationState } from "./FramedataPage.types";
import MovesView from "./MovesView";

const FramedataPage: React.FC = () => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentView: "characters",
    selectedCharacter: null,
    isLoadingCharacters: true,
    isLoadingMoves: false,
    error: "",
  });

  const [characters, setCharacters] = useState<TekkenCharacter[]>([]);

  // Цветовые переменные
  const bgPrimary = useColorModeValue("white", "gray.800");
  const bgSecondary = useColorModeValue("gray.50", "gray.700");
  const textPrimary = useColorModeValue("gray.800", "white");
  const textSecondary = useColorModeValue("gray.600", "gray.300");

  // Обновление состояния навигации
  const updateNavigationState = useCallback(
    (updates: Partial<NavigationState>) => {
      setNavigationState(prev => ({ ...prev, ...updates }));
    },
    []
  );

  // Загрузка персонажей
  const loadCharacters = useCallback(async () => {
    try {
      updateNavigationState({ isLoadingCharacters: true, error: "" });
      const response = await fetch("/api/framedata/characters");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const charactersData = await response.json();
      setCharacters(charactersData);
      updateNavigationState({ isLoadingCharacters: false });
    } catch (error) {
      console.error("Ошибка загрузки персонажей:", error);
      updateNavigationState({
        isLoadingCharacters: false,
        error: error instanceof Error ? error.message : "Неизвестная ошибка",
      });
    }
  }, [updateNavigationState]);

  // Загрузка ударов для персонажа
  const loadCharacterMoves = useCallback(
    async (character: TekkenCharacter) => {
      try {
        updateNavigationState({ isLoadingMoves: true, error: "" });
        const response = await fetch(
          `/api/framedata/characters/${encodeURIComponent(character.name)}/moves`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const moves = await response.json();
        const updatedCharacter = { ...character, movelist: moves };

        // Обновляем персонажа в списке
        setCharacters(prev =>
          prev.map(char =>
            char.name === character.name ? updatedCharacter : char
          )
        );

        updateNavigationState({
          selectedCharacter: updatedCharacter,
          isLoadingMoves: false,
        });
      } catch (error) {
        console.error("Ошибка загрузки ударов:", error);
        updateNavigationState({
          isLoadingMoves: false,
          error: error instanceof Error ? error.message : "Неизвестная ошибка",
        });
      }
    },
    [updateNavigationState]
  );

  // Обработчики навигации
  const handleCharacterSelect = useCallback(
    (character: TekkenCharacter) => {
      updateNavigationState({
        currentView: "character-details",
        selectedCharacter: character,
      });
    },
    [updateNavigationState]
  );

  const handleViewMoves = useCallback(
    (character: TekkenCharacter) => {
      if (!character.movelist) {
        loadCharacterMoves(character);
      }
      updateNavigationState({
        currentView: "moves",
        selectedCharacter: character,
      });
    },
    [loadCharacterMoves, updateNavigationState]
  );

  const handleBackToCharacters = useCallback(() => {
    updateNavigationState({
      currentView: "characters",
      selectedCharacter: null,
    });
  }, [updateNavigationState]);

  const handleBackToCharacterDetails = useCallback(() => {
    updateNavigationState({
      currentView: "character-details",
    });
  }, [updateNavigationState]);

  const handleNavigateToChangesReview = useCallback(() => {
    updateNavigationState({
      currentView: "changes-review",
    });
  }, [updateNavigationState]);

  const handleBackFromChangesReview = useCallback(() => {
    updateNavigationState({
      currentView: "characters",
    });
  }, [updateNavigationState]);

  // Загрузка персонажей при монтировании компонента
  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  // Рендер текущего представления
  const renderCurrentView = () => {
    switch (navigationState.currentView) {
      case "characters":
        return (
          <CharacterGrid
            characters={characters}
            isLoading={navigationState.isLoadingCharacters}
            error={navigationState.error}
            onCharacterSelect={handleCharacterSelect}
            onNavigateToChangesReview={handleNavigateToChangesReview}
          />
        );

      case "character-details":
        if (!navigationState.selectedCharacter) {
          return (
            <Box textAlign="center" py={10}>
              <Text color={textSecondary}>Персонаж не выбран</Text>
            </Box>
          );
        }
        return (
          <CharacterDetails
            character={navigationState.selectedCharacter}
            onBack={handleBackToCharacters}
            onViewMoves={handleViewMoves}
          />
        );

      case "moves":
        if (!navigationState.selectedCharacter) {
          return (
            <Box textAlign="center" py={10}>
              <Text color={textSecondary}>Персонаж не выбран</Text>
            </Box>
          );
        }
        return (
          <MovesView
            character={navigationState.selectedCharacter}
            onBack={handleBackToCharacterDetails}
            isLoading={navigationState.isLoadingMoves}
          />
        );

      case "changes-review":
        return <ChangesReviewPage onBack={handleBackFromChangesReview} />;

      default:
        return (
          <Box textAlign="center" py={10}>
            <Text color={textSecondary}>Неизвестное представление</Text>
          </Box>
        );
    }
  };

  return (
    <Container maxW="container.xl" py={6}>
      <Box mb={6}>
        <Heading as="h1" size="xl" color={textPrimary} mb={2}>
          Фреймдата Tekken
        </Heading>
        <Text color={textSecondary}>
          Управление данными о персонажах и ударах в игре Tekken
        </Text>
      </Box>

      {navigationState.error && (
        <Alert status="error" mb={6}>
          <AlertIcon />
          {navigationState.error}
        </Alert>
      )}

      {renderCurrentView()}
    </Container>
  );
};

export default FramedataPage;
