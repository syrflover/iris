import { ActivityType } from 'discord.js';
import { createStore } from 'simply-store';

/* export type sayStoreType = Map<
    string,
    { voiceChannelID: string; expire: number; mode: string }
>; */

export interface IStateStore {
    name: string;
    type: ActivityType;
}

// const sayStore: sayStoreType = new Map();

export const stateStore = createStore<IStateStore>('./.store/state.json');
