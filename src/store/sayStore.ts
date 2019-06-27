import { createStore } from 'simply-store';

/* export type sayStoreType = Map<
    string,
    { voiceChannelID: string; expire: number; mode: string }
>; */

export interface ISayStore {
    [userid: string]: {
        voiceChannelID: string;
        expire: number;
        mode: string;
    };
}

// const sayStore: sayStoreType = new Map();

export const sayStore = createStore<ISayStore>('./.store/say.json');
