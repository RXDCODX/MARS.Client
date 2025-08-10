import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const PerformanceChart: React.FC = () => {
  // Имитация данных для графика
  const generateData = () => {
    const data = [];
    const now = new Date();
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      data.push({
        time: time.toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
        requests: Math.floor(Math.random() * 500),
      });
    }
    return data;
  };

  const chartData = generateData();

  const getBarHeight = (value: number, max: number) => (value / max) * 100;

  const maxRequests = Math.max(...chartData.map(d => d.requests));

  // Chakra UI color mode values
  const bgCard = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const boxShadow = useColorModeValue("sm", "xl");
  const textPrimary = useColorModeValue("gray.800", "white");
  const textSecondary = useColorModeValue("gray.600", "gray.300");

  // Bar colors
  const cpuColor = useColorModeValue("blue.500", "blue.300");
  const cpuColorLight = useColorModeValue("blue.300", "blue.100");
  const memoryColor = useColorModeValue("green.500", "green.300");
  const memoryColorLight = useColorModeValue("green.300", "green.100");
  const requestsColor = useColorModeValue("orange.500", "orange.300");
  const requestsColorLight = useColorModeValue("orange.300", "orange.100");

  return (
    <Box
      bg={bgCard}
      borderRadius="lg"
      p={6}
      boxShadow={boxShadow}
      border="1px solid"
      borderColor={borderColor}
    >
      <Flex
        justify="space-between"
        align="center"
        mb={6}
        pb={4}
        borderBottom="1px solid"
        borderColor={borderColor}
      >
        <Heading as="h3" size="md" color={textPrimary}>
          Производительность за 24 часа
        </Heading>
        <Flex gap={4}>
          <Flex align="center" gap={2}>
            <Box boxSize="12px" borderRadius="sm" bg={cpuColor}></Box>
            <Text fontSize="sm" color={textSecondary}>
              CPU
            </Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Box boxSize="12px" borderRadius="sm" bg={memoryColor}></Box>
            <Text fontSize="sm" color={textSecondary}>
              Память
            </Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Box boxSize="12px" borderRadius="sm" bg={requestsColor}></Box>
            <Text fontSize="sm" color={textSecondary}>
              Запросы
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Box mb={6}>
        <Flex align="flex-end" gap={"2px"} h="200px" px={2}>
          {chartData.map((data, index) => (
            <Flex
              key={index}
              direction="column"
              align="center"
              flex="1"
              gap={2}
            >
              <Flex align="flex-end" gap="1px" w="100%" h="100%">
                <Box
                  flex="1"
                  minH="2px"
                  borderRadius="2px 2px 0 0"
                  transition="all 0.2s ease"
                  cursor="pointer"
                  bgGradient={`linear(to-t, ${cpuColor}, ${cpuColorLight})`}
                  h={`${getBarHeight(data.cpu, 100)}%`}
                  title={`CPU: ${data.cpu.toFixed(1)}%`}
                  _hover={{ opacity: 0.8, transform: "scaleY(1.05)" }}
                ></Box>
                <Box
                  flex="1"
                  minH="2px"
                  borderRadius="2px 2px 0 0"
                  transition="all 0.2s ease"
                  cursor="pointer"
                  bgGradient={`linear(to-t, ${memoryColor}, ${memoryColorLight})`}
                  h={`${getBarHeight(data.memory, 100)}%`}
                  title={`Память: ${data.memory.toFixed(1)}%`}
                  _hover={{ opacity: 0.8, transform: "scaleY(1.05)" }}
                ></Box>
                <Box
                  flex="1"
                  minH="2px"
                  borderRadius="2px 2px 0 0"
                  transition="all 0.2s ease"
                  cursor="pointer"
                  bgGradient={`linear(to-t, ${requestsColor}, ${requestsColorLight})`}
                  h={`${getBarHeight(data.requests, maxRequests)}%`}
                  title={`Запросы: ${data.requests}`}
                  _hover={{ opacity: 0.8, transform: "scaleY(1.05)" }}
                ></Box>
              </Flex>
              <Text
                fontSize="xs"
                color={textSecondary}
                textAlign="center"
                transform="rotate(-45deg)"
                whiteSpace="nowrap"
              >
                {data.time}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Box>

      <SimpleGrid
        columns={3}
        spacing={4}
        pt={4}
        borderTop="1px solid"
        borderColor={borderColor}
      >
        <Box textAlign="center">
          <Text fontSize="sm" color={textSecondary} mb={1}>
            Среднее CPU
          </Text>
          <Text fontSize="xl" fontWeight="bold" color={textPrimary}>
            {(
              chartData.reduce((sum, d) => sum + d.cpu, 0) / chartData.length
            ).toFixed(1)}
            %
          </Text>
        </Box>
        <Box textAlign="center">
          <Text fontSize="sm" color={textSecondary} mb={1}>
            Средняя память
          </Text>
          <Text fontSize="xl" fontWeight="bold" color={textPrimary}>
            {(
              chartData.reduce((sum, d) => sum + d.memory, 0) / chartData.length
            ).toFixed(1)}
            %
          </Text>
        </Box>
        <Box textAlign="center">
          <Text fontSize="sm" color={textSecondary} mb={1}>
            Всего запросов
          </Text>
          <Text fontSize="xl" fontWeight="bold" color={textPrimary}>
            {chartData.reduce((sum, d) => sum + d.requests, 0).toLocaleString()}
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default PerformanceChart;
