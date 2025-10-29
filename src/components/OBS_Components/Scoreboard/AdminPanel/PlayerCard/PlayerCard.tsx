import {
  ArrowDown,
  ArrowUp,
  RotateCw as ArrowRepeat,
  Trophy as TrophyFill,
  User as PersonFill,
  XCircle as XCircleFill,
} from "lucide-react";
import { Button, Card, Form } from "react-bootstrap";

import { useSiteColors } from "../../../../../shared/Utils";
import FlagSelector from "../FlagCard/FlagSelector";
import {
  useColor,
  usePlayer1,
  usePlayer2,
  usePlayerActions,
} from "../store/scoreboardStore";

type PlayerCardProps = {
  playerIndex: 1 | 2; // 1 для player1, 2 для player2
  label: string;
  accent: string;
};

const PlayerCard: React.FC<PlayerCardProps> = ({
  playerIndex,
  label,
  accent,
}) => {
  const colors = useSiteColors();
  const player1 = usePlayer1();
  const player2 = usePlayer2();
  const { setPlayer1, setPlayer2 } = usePlayerActions();
  const scoreboardColors = useColor();

  const player = playerIndex === 1 ? player1 : player2;
  const setPlayer = playerIndex === 1 ? setPlayer1 : setPlayer2;

  const handleNameChange = (name: string) => {
    try {
      setPlayer({ ...player, name });
    } catch (error) {
      console.error(`Error updating player${playerIndex} name:`, error);
    }
  };

  const handleScoreChange = (score: number) => {
    try {
      setPlayer({
        ...player,
        score: Math.max(0, Math.min(99, score)),
      });
    } catch (error) {
      console.error(`Error updating player${playerIndex} score:`, error);
    }
  };

  const handleWin = () => {
    try {
      setPlayer({ ...player, final: "winner" });
    } catch (error) {
      console.error(`Error setting player${playerIndex} as winner:`, error);
    }
  };

  const handleLose = () => {
    try {
      setPlayer({ ...player, final: "loser" });
    } catch (error) {
      console.error(`Error setting player${playerIndex} as loser:`, error);
    }
  };

  const handleTagChange = (tag: string) => {
    try {
      setPlayer({ ...player, tag });
    } catch (error) {
      console.error(`Error updating player${playerIndex} tag:`, error);
    }
  };

  const handleFlagChange = (flag: string) => {
    try {
      setPlayer({ ...player, flag });
    } catch (error) {
      console.error(`Error updating player${playerIndex} flag:`, error);
    }
  };

  const handleClearFinal = () => {
    try {
      setPlayer({ ...player, final: "none" });
    } catch (error) {
      console.error(`Error clearing player${playerIndex} final status:`, error);
    }
  };

  return (
    <Card
      className="shadow-lg p-4 mb-2 player-card-responsive"
      style={{
        minWidth: 280,
        borderRadius: 18,
        border: `2px solid ${accent}`,
        backgroundColor: colors.background.card,
      }}
    >
      <Card.Body>
        <div className="d-flex flex-column align-items-center mb-3 gap-2">
          <PersonFill color={accent} size={22} />
          <span
            className="fw-bold text-uppercase text-center w-100"
            style={{ color: accent, letterSpacing: 1 }}
          >
            {label}
          </span>
        </div>
        <div className="d-flex align-items-center w-100 gap-2 mb-3">
          <Form.Control
            placeholder="Tag"
            value={player.tag}
            onChange={e => handleTagChange(e.target.value)}
            size="sm"
            className="border-info border-2 fw-bold rounded-3"
            style={{
              maxWidth: 90,
              backgroundColor: colors.background.card,
              color: scoreboardColors?.playerNamesColor || colors.text.primary,
              borderColor: scoreboardColors?.mainColor || colors.border.info,
            }}
          />
          <Form.Control
            placeholder="Name"
            value={
              (player.final === "winner"
                ? "[W] "
                : player.final === "loser"
                  ? "[L] "
                  : "") + player.name
            }
            onChange={e => {
              const val = e.target.value.replace(/^\[W\] |^\[L\] /, "");
              handleNameChange(val);
            }}
            size="sm"
            className="fw-bold border-primary border-2 w-100 rounded-3"
            style={{
              backgroundColor: colors.background.card,
              color: scoreboardColors?.playerNamesColor || colors.text.primary,
              borderColor: scoreboardColors?.mainColor || colors.border.primary,
            }}
          />
        </div>
        <div className="d-flex align-items-center gap-2 mb-3">
          <FlagSelector
            selectedFlag={player.flag}
            onFlagChange={handleFlagChange}
            placeholder="Флаг"
          />
        </div>
        <div className="d-flex align-items-center justify-content-between mb-3 gap-2">
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => handleScoreChange(player.score + 1)}
          >
            <ArrowUp />
          </Button>
          <span
            className="fw-bold text-center w-100"
            style={{
              fontSize: "2.5rem",
              color: scoreboardColors?.scoreColor || colors.text.accent,
              minWidth: 48,
              textAlign: "center",
            }}
          >
            {player.score}
          </span>
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => handleScoreChange(player.score - 1)}
          >
            <ArrowDown />
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => handleScoreChange(0)}
          >
            <ArrowRepeat />
          </Button>
        </div>
        <div className="d-flex gap-2 justify-content-center align-items-center mt-2">
          <Button
            variant="success"
            size="sm"
            className="px-3 d-flex align-items-center gap-1"
            onClick={handleWin}
            style={{
              backgroundColor: colors.background.success,
              borderColor: colors.border.success,
              color: colors.text.light,
            }}
          >
            <TrophyFill style={{ color: colors.text.warning }} /> W
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="px-3 d-flex align-items-center gap-1"
            onClick={handleLose}
            style={{
              backgroundColor: colors.background.danger,
              borderColor: colors.border.danger,
              color: colors.text.light,
            }}
          >
            <XCircleFill style={{ color: colors.text.light }} /> L
          </Button>
          {player.final !== "none" && (
            <Button
              variant="outline-secondary"
              size="sm"
              className="ms-2 px-2 py-0"
              style={{ fontSize: 14 }}
              onClick={handleClearFinal}
              title="Убрать статус W/L"
            >
              ✕
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PlayerCard;
