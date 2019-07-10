import { ActivityType } from 'discord.js';
import { createStore } from 'simply-store';

export interface IStateStore {
    name: string;
    type: ActivityType;
}

export const stateStore = createStore<IStateStore>('./.store/state.json');
