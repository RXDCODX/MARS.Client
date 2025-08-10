import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";

import Dashboard from "../Dashboard/Dashboard";
import Navbar from "../Navbar/Navbar";
import { AdminPanelProps } from "./AdminPanel.types";

const AdminPanel: React.FC<AdminPanelProps> = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Chakra UI color mode values
  const bgColor = useColorModeValue("white", "gray.800");
  const textPrimary = useColorModeValue("gray.800", "white");
  const textSecondary = useColorModeValue("gray.600", "gray.300");
  const primaryGradientLight = useColorModeValue(
    "linear(to-r, blue.500, purple.500)",
    "linear(to-r, blue.300, purple.300)"
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "servers":
        return (
          <Flex
            direction="column"
            align="center"
            justify="center"
            height="calc(100vh - 70px)"
            textAlign="center"
            p={6}
          >
            <Heading
              as="h2"
              size="xl"
              color={textPrimary}
              mb={4}
              bgGradient={primaryGradientLight}
              bgClip="text"
            >
              🖥️ Управление серверами
            </Heading>
            <Text fontSize="lg" color={textSecondary}>
              Здесь будет интерфейс для управления серверами
            </Text>
          </Flex>
        );
      case "logs":
        return (
          <Flex
            direction="column"
            align="center"
            justify="center"
            height="calc(100vh - 70px)"
            textAlign="center"
            p={6}
          >
            <Heading
              as="h2"
              size="xl"
              color={textPrimary}
              mb={4}
              bgGradient={primaryGradientLight}
              bgClip="text"
            >
              📝 Системные логи
            </Heading>
            <Text fontSize="lg" color={textSecondary}>
              Здесь будет детальный просмотр логов
            </Text>
          </Flex>
        );
      case "users":
        return (
          <Flex
            direction="column"
            align="center"
            justify="center"
            height="calc(100vh - 70px)"
            textAlign="center"
            p={6}
          >
            <Heading
              as="h2"
              size="xl"
              color={textPrimary}
              mb={4}
              bgGradient={primaryGradientLight}
              bgClip="text"
            >
              👥 Управление пользователями
            </Heading>
            <Text fontSize="lg" color={textSecondary}>
              Здесь будет интерфейс для управления пользователями
            </Text>
          </Flex>
        );
      case "performance":
        return (
          <Flex
            direction="column"
            align="center"
            justify="center"
            height="calc(100vh - 70px)"
            textAlign="center"
            p={6}
          >
            <Heading
              as="h2"
              size="xl"
              color={textPrimary}
              mb={4}
              bgGradient={primaryGradientLight}
              bgClip="text"
            >
              ⚡ Детальная производительность
            </Heading>
            <Text fontSize="lg" color={textSecondary}>
              Здесь будут расширенные метрики производительности
            </Text>
          </Flex>
        );
      case "settings":
        return (
          <Flex
            direction="column"
            align="center"
            justify="center"
            height="calc(100vh - 70px)"
            textAlign="center"
            p={6}
          >
            <Heading
              as="h2"
              size="xl"
              color={textPrimary}
              mb={4}
              bgGradient={primaryGradientLight}
              bgClip="text"
            >
              ⚙️ Настройки системы
            </Heading>
            <Text fontSize="lg" color={textSecondary}>
              Здесь будут настройки админ панели
            </Text>
          </Flex>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Box bg={bgColor} minH="100vh">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <Box as="main" bg={bgColor} minH="calc(100vh - 70px)">
        {renderContent()}
      </Box>
    </Box>
  );
};

export default AdminPanel;
