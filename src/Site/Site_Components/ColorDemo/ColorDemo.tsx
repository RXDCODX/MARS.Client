import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { useSiteColors } from "@/shared/Utils/useSiteColors";

const ColorDemo: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>("primary");
  const colors = useSiteColors();

  const colorSchemes = [
    { name: "primary", label: "Основной", color: colors.primary },
    { name: "secondary", label: "Вторичный", color: colors.secondary },
    { name: "accent", label: "Акцент", color: colors.accent },
    { name: "success", label: "Успех", color: colors.success },
    { name: "warning", label: "Предупреждение", color: colors.warning },
    { name: "error", label: "Ошибка", color: colors.error },
    { name: "info", label: "Информация", color: colors.info },
  ];

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box p={8} bg={bgColor} minH="100vh">
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" color={textColor} mb={4}>
            Демонстрация цветовой схемы
          </Heading>
          <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.300")}>
            Изучите доступные цвета и их применение в интерфейсе
          </Text>
        </Box>

        <Grid templateColumns={{ base: "1fr", md: "repeat(auto-fit, minmax(300px, 1fr))" }} gap={6}>
          {colorSchemes.map((scheme) => (
            <Box
              key={scheme.name}
              p={6}
              bg={bgColor}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="lg"
              boxShadow="md"
              cursor="pointer"
              transition="all 0.3s ease"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "lg",
              }}
              onClick={() => setSelectedColor(scheme.name)}
            >
              <VStack spacing={4} align="stretch">
                <Box
                  h="100px"
                  bg={scheme.color}
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                  fontSize="lg"
                  fontWeight="bold"
                  textShadow="0 2px 4px rgba(0,0,0,0.3)"
                >
                  {scheme.label}
                </Box>
                
                <VStack spacing={2} align="stretch">
                  <Text fontWeight="semibold" color={textColor}>
                    {scheme.label}
                  </Text>
                  <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.300")}>
                    {scheme.color}
                  </Text>
                </VStack>

                <Flex gap={2} flexWrap="wrap">
                  <Button
                    size="sm"
                    bg={scheme.color}
                    color="white"
                    _hover={{ opacity: 0.8 }}
                    _active={{ transform: "scale(0.95)" }}
                  >
                    Кнопка
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    borderColor={scheme.color}
                    color={scheme.color}
                    _hover={{ bg: scheme.color, color: "white" }}
                  >
                    Контур
                  </Button>
                </Flex>
              </VStack>
            </Box>
          ))}
        </Grid>

        {selectedColor && (
          <Box
            p={6}
            bg={bgColor}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="lg"
            boxShadow="md"
          >
            <VStack spacing={4} align="stretch">
              <Heading as="h3" size="lg" color={textColor}>
                Выбранный цвет: {colorSchemes.find(c => c.name === selectedColor)?.label}
              </Heading>
              
              <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
                <Box
                  p={4}
                  bg={colorSchemes.find(c => c.name === selectedColor)?.color}
                  color="white"
                  borderRadius="md"
                  textAlign="center"
                >
                  <Text fontWeight="bold">Основной</Text>
                </Box>
                <Box
                  p={4}
                  bg={useColorModeValue("gray.100", "gray.700")}
                  border="2px solid"
                  borderColor={colorSchemes.find(c => c.name === selectedColor)?.color}
                  borderRadius="md"
                  textAlign="center"
                >
                  <Text fontWeight="bold" color={colorSchemes.find(c => c.name === selectedColor)?.color}>
                    Контур
                  </Text>
                </Box>
                <Box
                  p={4}
                  bg={useColorModeValue("gray.50", "gray.800")}
                  borderRadius="md"
                  textAlign="center"
                >
                  <Text fontWeight="bold" color={colorSchemes.find(c => c.name === selectedColor)?.color}>
                    Текст
                  </Text>
                </Box>
              </Grid>
            </VStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default ColorDemo;
