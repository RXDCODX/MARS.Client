import { HStack, Button } from "@chakra-ui/react";
import { ArrowLeftRight, ArrowClockwise } from "react-bootstrap-icons";

type ActionButtonsProps = {
  onSwapNames: () => void;
  onSwapPlayers: () => void;
  onReset: () => void;
};

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onSwapNames,
  onSwapPlayers,
  onReset,
}) => (
  <HStack gap={3} w="100%" align="center">
    <Button
      colorScheme="cyan"
      variant="solid"
      fontWeight="bold"
      py={2}
      w={{ base: "100%", md: "auto" }}
      mx={2}
      boxShadow="0 2px 8px #0dcaf055"
      onClick={onSwapNames}
      title="Поменять имена"
    >
      <ArrowLeftRight style={{ marginRight: 6 }} /> Name
    </Button>
    <Button
      colorScheme="cyan"
      variant="solid"
      fontWeight="bold"
      py={2}
      w={{ base: "100%", md: "auto" }}
      mx={2}
      boxShadow="0 2px 8px #0dcaf055"
      onClick={onSwapPlayers}
      title="Поменять игроков местами"
    >
      <ArrowLeftRight style={{ marginRight: 6 }} /> All
    </Button>
    <Button
      colorScheme="red"
      variant="solid"
      fontWeight="bold"
      py={2}
      w={{ base: "100%", md: "auto" }}
      mx={2}
      boxShadow="0 2px 8px #dc354555"
      onClick={onReset}
      title="Сбросить всё"
    >
      <ArrowClockwise style={{ marginRight: 6 }} /> Reset
    </Button>
  </HStack>
);

export default ActionButtons;
