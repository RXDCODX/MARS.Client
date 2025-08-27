import { BreakingNews } from "./components/BreakingNews";
import { Catisa } from "./components/Catisa";
import { DVDLogos } from "./components/DVDLogos";
import { FitnessVideo } from "./components/FitnessVideo";
import { HydraulicMobileVideo } from "./components/HydraulicMobileVideo";
import { LOFIGirl } from "./components/LOFI-Girl";
import { MukbangVideo } from "./components/MukbangVideo";
import { Notifications } from "./components/Notifications";
import { Quiz } from "./components/Quiz";
import { SlimeVideo } from "./components/SlimeVideo";
import { StreamerVideo } from "./components/StreamerVideo";
import { Surfer } from "./components/Surfer";

export function ADHDPage() {
  return (
    <>
      <DVDLogos />
      <BreakingNews />
      <StreamerVideo />
      <FitnessVideo />
      <HydraulicMobileVideo />
      <SlimeVideo />
      <MukbangVideo />
      <Quiz />
      <Surfer />
      <LOFIGirl />
      <Catisa />
      <Notifications />
    </>
  );
}
