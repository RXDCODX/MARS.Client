import { useCallback, useEffect, useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";

import { TekkenCharacter } from "@/shared/api/data-contracts";

import CharacterDetails from "./CharacterDetails";
import CharacterGrid from "./CharacterGrid";
import styles from "./FramedataPage.module.scss";
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
      // Если у персонажа уже есть удары, сразу переходим к ним
      if (character.movelist) {
        updateNavigationState({
          currentView: "moves",
          selectedCharacter: character,
        });
      } else {
        // Иначе загружаем удары
        loadCharacterMoves(character);
        updateNavigationState({ currentView: "moves" });
      }
    },
    [updateNavigationState, loadCharacterMoves]
  );

  const handleBackToCharacters = useCallback(() => {
    updateNavigationState({
      currentView: "characters",
      selectedCharacter: null,
    });
  }, [updateNavigationState]);

  const handleBackToCharacterDetails = useCallback(() => {
    updateNavigationState({ currentView: "character-details" });
  }, [updateNavigationState]);

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  // Обработка ошибок
  if (navigationState.error && navigationState.currentView === "characters") {
    return (
      <Container className={styles.framedataPage}>
        <Alert variant="danger">
          <Alert.Heading>Ошибка загрузки данных</Alert.Heading>
          <p>{navigationState.error}</p>
          <Button onClick={loadCharacters} variant="outline-danger">
            Попробовать снова
          </Button>
        </Alert>
      </Container>
    );
  }

  // Рендер компонента в зависимости от текущего представления
  const renderCurrentView = () => {
    switch (navigationState.currentView) {
      case "characters":
        return (
          <CharacterGrid
            characters={characters}
            isLoading={navigationState.isLoadingCharacters}
            error={navigationState.error}
            onCharacterSelect={handleCharacterSelect}
          />
        );

      case "character-details":
        if (!navigationState.selectedCharacter) {
          return (
            <Alert variant="warning">
              <Alert.Heading>Персонаж не выбран</Alert.Heading>
              <p>Вернитесь к списку персонажей.</p>
            </Alert>
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
            <Alert variant="warning">
              <Alert.Heading>Персонаж не выбран</Alert.Heading>
              <p>Вернитесь к списку персонажей.</p>
            </Alert>
          );
        }
        return (
          <MovesView
            character={navigationState.selectedCharacter}
            onBack={handleBackToCharacterDetails}
            isLoading={navigationState.isLoadingMoves}
          />
        );

      default:
        return (
          <Alert variant="warning">
            <Alert.Heading>Неизвестное представление</Alert.Heading>
            <p>Произошла ошибка навигации.</p>
          </Alert>
        );
    }
  };

  return (
    <Container className={styles.framedataPage}>
      {renderCurrentView()}
    </Container>
  );
};

export default FramedataPage;
