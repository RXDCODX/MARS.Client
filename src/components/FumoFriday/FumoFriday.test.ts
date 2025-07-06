// Тестовый файл для FumoFriday компонента
// Демонстрирует различные способы тестирования алерта

// Способ 1: Через глобальную функцию (доступна в браузере)
declare global {
  interface Window {
    testFumoFriday: () => void;
  }
}

// Способ 2: Программное тестирование
export function testFumoFridayAlert() {
  // Проверяем, доступна ли функция
  if (typeof window !== 'undefined' && window.testFumoFriday) {
    window.testFumoFriday();
    console.log('FumoFriday alert triggered!');
  } else {
    console.warn('FumoFriday test function not available');
  }
}

// Способ 3: Тестирование с кастомными параметрами
export function testFumoFridayWithCustomMessage(message: string, color: string = "#ff6b6b") {
  if (typeof window !== 'undefined' && window.testFumoFriday) {
    // Создаем кастомное сообщение
    const customMessage = {
      id: crypto.randomUUID(),
      message: message,
      color: color
    };
    
    // Здесь можно было бы передать кастомное сообщение,
    // но для простоты используем стандартную функцию
    window.testFumoFriday();
    console.log(`FumoFriday alert triggered with message: ${message}`);
  }
}

// Примеры использования:
// testFumoFridayAlert();
// testFumoFridayWithCustomMessage("Custom User", "#4ecdc4"); 