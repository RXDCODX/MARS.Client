import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";

import { MetricCardProps } from "./MetricCard.types";

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  color,
  trend,
  trendDirection,
}) => {
  // Define color values using useColorModeValue
  const accentColor = useColorModeValue(`${color}.500`, `${color}.300`);
  const accentColorLight = useColorModeValue(`${color}.300`, `${color}.100`);
  const bgCard = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const boxShadow = useColorModeValue("sm", "xl");
  const boxShadowLg = useColorModeValue("md", "2xl");
  const textPrimary = useColorModeValue("gray.800", "white");
  const textSecondary = useColorModeValue("gray.600", "gray.300");
  const bgLight = useColorModeValue("gray.100", "gray.800");
  const trendUpColor = useColorModeValue("green.500", "green.300");
  const trendDownColor = useColorModeValue("red.500", "red.300");
  const trendStableColor = useColorModeValue("gray.600", "gray.300");
  const trendUpBg = useColorModeValue("green.100", "green.800");
  const trendDownBg = useColorModeValue("red.100", "red.800");
  const trendStableBg = useColorModeValue("gray.100", "gray.800");

  const getTrendIcon = () => {
    switch (trendDirection) {
      case "up":
        return "↗️";
      case "down":
        return "↘️";
      case "stable":
        return "→";
      default:
        return "→";
    }
  };

  const getTrendStyle = () => {
    switch (trendDirection) {
      case "up":
        return { color: trendUpColor, bg: trendUpBg };
      case "down":
        return { color: trendDownColor, bg: trendDownBg };
      case "stable":
        return { color: trendStableColor, bg: trendStableBg };
      default:
        return { color: trendStableColor, bg: trendStableBg };
    }
  };

  return (
    <Box
      bg={bgCard}
      borderRadius="lg"
      p={6}
      boxShadow={boxShadow}
      transition="all 0.3s ease"
      border="1px solid"
      borderColor={borderColor}
      position="relative"
      overflow="hidden"
      _before={{
        content: `""`,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: `linear-gradient(90deg, ${accentColor}, ${accentColorLight})`,
      }}
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: boxShadowLg,
      }}
    >
      <Flex justify="space-between" align="flex-start" mb={4}>
        <Box fontSize="2xl" filter="drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))">
          {icon}
        </Box>
        <Flex align="center">
          <Text
            fontSize="sm"
            fontWeight="semibold"
            px={2}
            py={1}
            borderRadius="md"
            {...getTrendStyle()}
          >
            {getTrendIcon()} {trend}
          </Text>
        </Flex>
      </Flex>

      <Box>
        <Heading
          as="h3"
          size="sm"
          color={textPrimary}
          mb={2}
          textTransform="uppercase"
          letterSpacing="0.5px"
        >
          {title}
        </Heading>
        <Text fontSize="2xl" fontWeight="bold" lineHeight="1">
          {value}
        </Text>
      </Box>
    </Box>
  );
};

export default MetricCard;
