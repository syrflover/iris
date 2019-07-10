import { createStore } from 'simply-store';

export interface ISayStore {
    [userid: string]: {
        voiceChannelID: string;
        expire: number;
        mode: string;
    };
}

export const sayStore = createStore<ISayStore>('./.store/say.json');
