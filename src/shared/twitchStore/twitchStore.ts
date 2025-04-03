import { EmoteFetcher, EmoteParser } from "@mkody/twitch-emoticons";
import type {} from "@redux-devtools/extension";
import { ApiClient, HelixChatBadgeSet } from "@twurple/api";
import { AppTokenAuthProvider } from "@twurple/auth";
import { ChatMessage } from "@twurple/chat";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { SignalRContext } from "../../app";

interface Actions {
  init: (clientId: string, clientSecret: string) => void;
  setBadges: (badges: HelixChatBadgeSet[]) => void;
  parse: (text: string, size?: number) => string;
  sendMsgToPyrokxnezxz: (msg: string) => Promise<void>;
}

interface State {
  fetcher?: EmoteFetcher;
  parser?: EmoteParser;
  badges: HelixChatBadgeSet[];
  twitchApiClient?: ApiClient;
  twitchMessages: ChatMessage[];
}

const initialState: State = {
  badges: [],
  twitchMessages: [],
};

export const useTwitchStore = create<State & Actions>()(
  devtools((set) => ({
    ...initialState,
    init: (clientId: string, clientSecret: string) => {
      const { client, fetcher, parser } = initialization(
        clientId,
        clientSecret,
      );
      getBadges(client)
        .then((badges) => set({ badges }))
        .catch((err) => {
          console.error(err);
          set({ badges: [] });
        });

      Promise.all([
        // Twitch global
        fetcher.fetchTwitchEmotes(),
        // Twitch channel
        fetcher.fetchTwitchEmotes(785975641),
        //BTTV global
        fetcher.fetchBTTVEmotes(),
        // BTTV channel
        //fetcher.fetchBTTVEmotes(785975641),
        // 7TV global
        fetcher.fetchSevenTVEmotes(),
        // 7TV channel
        fetcher.fetchSevenTVEmotes(785975641),
        // FFZ global
        fetcher.fetchFFZEmotes(),
        // FFZ channel
        //fetcher.fetchFFZEmotes(785975641),
      ])
        .then(() => {
          console.log("Emotes loaded");
          set({ fetcher, parser, twitchApiClient: client });
        })
        .catch((err) => {
          console.error("Error loading emotes...");
          console.error(err);
          set({ fetcher, parser, twitchApiClient: client });
        });
    },
    sendMsgToPyrokxnezxz: async (msg: string) => {
      await SignalRContext.invoke("TwitchMsg", msg);
    },
  })),
);

function initialization(clientId: string, clientSecret: string) {
  const provider = new AppTokenAuthProvider(clientId, clientSecret);
  const client = new ApiClient({ authProvider: provider });
  const fetcher = new EmoteFetcher(undefined, undefined, {
    apiClient: client,
  });
  const parser = new EmoteParser(fetcher, {
    template:
      '<img class="emote" crossorigin="anonymous" alt="{name}" src="{link}" />',
    match: /(\w+)+?/g,
  });

  return { fetcher, parser, client };
}

async function getBadges(apiClient: ApiClient) {
  const badges = await apiClient.chat.getChannelBadges(785975641);
  const globalBadges: HelixChatBadgeSet[] =
    await apiClient.chat.getGlobalBadges();

  const result = [...badges, ...globalBadges];
  return result;
}

export default useTwitchStore;
