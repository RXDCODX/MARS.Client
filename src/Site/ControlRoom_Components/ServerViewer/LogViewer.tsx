import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

export interface LogViewerProps {
  logs: {
    timestamp: string;
    level: string;
    message: string;
    exception?: string;
  }[];
  loading: boolean;
  onClose: () => void;
  serviceName?: string;
}

const levelOptions = [
  { value: "", label: "Все" },
  { value: "Error", label: "Error" },
  { value: "Warning", label: "Warning" },
  { value: "Info", label: "Info" },
];

const LogViewer: React.FC<LogViewerProps> = ({
  logs,
  loading,
  onClose,
  serviceName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");

  // Chakra UI color mode values
  const bgColor = useColorModeValue("gray.800", "gray.800"); // Dark background for logs
  const textColor = useColorModeValue("gray.100", "gray.100");
  const borderColor = useColorModeValue("gray.400", "gray.600");
  const inputBg = useColorModeValue("whiteAlpha.900", "gray.700");
  const inputColor = useColorModeValue("gray.800", "gray.100");
  const buttonBg = useColorModeValue("blue.500", "blue.300");
  const buttonColor = useColorModeValue("white", "gray.800");
  const highlightErrorColor = useColorModeValue("red.500", "red.300");
  const highlightWarningColor = useColorModeValue("orange.500", "orange.300");
  const highlightInfoColor = useColorModeValue("green.500", "green.300");
  const scrollbarBg = useColorModeValue("gray.700", "gray.600");

  // Auto-scroll to end on new logs
  useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  // Scroll to top
  const scrollToTop = () => {
    if (containerRef.current) containerRef.current.scrollTop = 0;
    setAutoScroll(false);
  };
  // Scroll to bottom
  const scrollToBottom = () => {
    if (containerRef.current)
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    setAutoScroll(true);
  };
  // Disable auto-scroll if user scrolls up
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollHeight - scrollTop - clientHeight > 50) setAutoScroll(false);
    else setAutoScroll(true);
  };

  // Filter logs
  const filteredLogs = useMemo(
    () =>
      logs.filter(
        log =>
          (!level || log.level === level) &&
          (!search ||
            log.message.toLowerCase().includes(search.toLowerCase()) ||
            (log.exception &&
              log.exception.toLowerCase().includes(search.toLowerCase())))
      ),
    [logs, level, search]
  );

  const getLogLevelColor = (logLevel: string) => {
    switch (logLevel) {
      case "Error":
        return highlightErrorColor;
      case "Warning":
        return highlightWarningColor;
      case "Info":
        return highlightInfoColor;
      default:
        return textColor; // Default to main text color
    }
  };

  return (
    <Box
      bg={bgColor}
      color={textColor}
      fontFamily="monospace"
      fontSize="sm"
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Flex
        align="center"
        justify="space-between"
        p={4}
        borderBottom="1px solid"
        borderColor={borderColor}
      >
        <Heading as="h2" size="md" color={textColor}>
          Логи сервиса: {serviceName}
        </Heading>
        <Button
          onClick={onClose}
          variant="outline"
          colorScheme="gray"
          size="sm"
        >
          Закрыть
        </Button>
      </Flex>
      <Flex gap={2} align="center" p={4}>
        <Input
          size="sm"
          placeholder="Поиск по сообщению или exception..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          maxWidth="220px"
          bg={inputBg}
          color={inputColor}
          borderColor={borderColor}
        />
        <Select
          size="sm"
          value={level}
          onChange={e => setLevel(e.target.value)}
          maxWidth="120px"
          bg={inputBg}
          color={inputColor}
          borderColor={borderColor}
        >
          {levelOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      </Flex>
      <Flex gap={2} mx={4} mb={4}>
        <Button
          size="sm"
          variant="outline"
          colorScheme="blue"
          onClick={scrollToTop}
          flex="1"
        >
          В начало
        </Button>
        <Button
          size="sm"
          variant="outline"
          colorScheme="blue"
          onClick={scrollToBottom}
          flex="1"
        >
          В конец
        </Button>
        <Button
          size="sm"
          variant={autoScroll ? "solid" : "outline"}
          colorScheme={autoScroll ? "green" : "gray"}
          onClick={() => setAutoScroll(v => !v)}
          flex="1"
        >
          {autoScroll ? "Автоскролл" : "Без автоскролла"}
        </Button>
      </Flex>
      <Box
        ref={containerRef}
        onScroll={handleScroll}
        flex="1"
        overflowY="auto"
        p={4}
        bg={bgColor}
        sx={{
          // Custom scrollbar for Webkit browsers
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: scrollbarBg,
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: useColorModeValue("gray.600", "gray.400"),
          },
        }}
      >
        {loading ? (
          <Flex justify="center" align="center" py={4}>
            <Spinner size="md" color={highlightInfoColor} mr={2} />
            <Text color={textColor}>Загрузка логов...</Text>
          </Flex>
        ) : filteredLogs.length === 0 ? (
          <Text color={textColor} textAlign="center" py={4}>
            Нет логов
          </Text>
        ) : (
          filteredLogs.map((log, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
            >
              <Text fontSize="sm" mb={2} color={textColor}>
                <Text as="span" color={getLogLevelColor(log.level)} mr={2}>
                  [{new Date(log.timestamp).toLocaleTimeString()}] {log.level}:
                </Text>
                {log.message}
              </Text>
              {log.exception && (
                <Text fontSize="sm" color={highlightErrorColor} ml={4}>
                  Exception: {log.exception}
                </Text>
              )}
            </motion.div>
          ))
        )}
      </Box>
    </Box>
  );
};

export default LogViewer;
