import { ActivityType } from 'discord.js';
import { createStore } from '@syrflover/simple-store';

export interface IStateStore {
    name: string;
    type: ActivityType;
}

export const stateStore = createStore<IStateStore>('./.store/state.json');
