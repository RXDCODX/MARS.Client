import { TekkenCharacter } from "@/shared/api/data-contracts";

/**
 * Получает URL изображения персонажа с приоритетом base64
 * @param character - персонаж Tekken
 * @param fallbackSize - размер fallback изображения (например, "200x300")
 * @returns URL изображения
 */
export const getCharacterImage = (
  character: TekkenCharacter,
  fallbackSize: string = "200x300"
): string => {
  // Сначала пробуем base64 изображение
  if (character.image && character.imageExtension) {
    try {
      const base64String = character.image;
      return `data:image/${character.imageExtension};base64,${base64String}`;
    } catch (error) {
      console.warn(
        `Ошибка при обработке base64 изображения для ${character.name}:`,
        error
      );
    }
  }

  // Затем пробуем ссылку на изображение
  if (character.linkToImage) {
    return character.linkToImage;
  }

  // Fallback изображение с именем персонажа
  return `https://via.placeholder.com/${fallbackSize}/6c757d/ffffff?text=${encodeURIComponent(character.name)}`;
};

/**
 * Обработчик ошибки загрузки изображения
 * @param e - событие ошибки
 * @param characterName - имя персонажа
 * @param fallbackSize - размер fallback изображения
 */
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  characterName: string,
  fallbackSize: string = "200x300"
): void => {
  const target = e.target as HTMLImageElement;
  target.src = `https://via.placeholder.com/${fallbackSize}/6c757d/ffffff?text=${encodeURIComponent(characterName)}`;
};
