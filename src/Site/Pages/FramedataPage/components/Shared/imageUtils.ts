import { TekkenCharacter } from "@/shared/api/types/data-contracts";

/**
 * Получить URL аватара персонажа
 */
export const getCharacterAvatar = (
  character: TekkenCharacter,
  fallbackSize: string = "200x300"
): string => {
  // Если есть аватар, используем его
  if (character.avatarImage && character.avatarImage.length > 0) {
    return `/api/framedata/characters/${encodeURIComponent(character.name)}/avatar`;
  }

  // Если есть старое изображение, используем его
  if (character.image && character.image.length > 0) {
    return `/api/framedata/characters/${encodeURIComponent(character.name)}/image`;
  }

  // Если есть ссылка на изображение, используем её
  if (character.linkToImage) {
    return character.linkToImage;
  }

  // Fallback на placeholder
  return `https://via.placeholder.com/${fallbackSize}/cccccc/666666?text=${encodeURIComponent(character.name)}`;
};

/**
 * Получить URL полного изображения персонажа
 */
export const getCharacterFullBody = (
  character: TekkenCharacter,
  fallbackSize: string = "400x600"
): string => {
  // Если есть полное изображение, используем его
  if (character.fullBodyImage && character.fullBodyImage.length > 0) {
    return `/api/framedata/characters/${encodeURIComponent(character.name)}/fullbody`;
  }

  // Если есть старое изображение, используем его
  if (character.image && character.image.length > 0) {
    return `/api/framedata/characters/${encodeURIComponent(character.name)}/image`;
  }

  // Если есть ссылка на изображение, используем её
  if (character.linkToImage) {
    return character.linkToImage;
  }

  // Fallback на placeholder
  return `https://via.placeholder.com/${fallbackSize}/cccccc/666666?text=${encodeURIComponent(character.name)}`;
};

/**
 * Получить URL изображения персонажа (для обратной совместимости)
 * @deprecated Используйте getCharacterAvatar или getCharacterFullBody
 */
export const getCharacterImage = (
  character: TekkenCharacter,
  fallbackSize: string = "200x300"
): string => getCharacterAvatar(character, fallbackSize);

/**
 * Обработчик ошибки загрузки изображения
 */
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  characterName: string,
  fallbackSize: string = "200x300"
): void => {
  const target = e.target as HTMLImageElement;
  target.src = `https://via.placeholder.com/${fallbackSize}/cccccc/666666?text=${encodeURIComponent(characterName)}`;
  target.onerror = null; // Предотвращаем бесконечный цикл
};
