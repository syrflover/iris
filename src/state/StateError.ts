import { Message } from 'discord.js';

export class StateError extends Error {
    constructor(errorMessage: string | undefined, dm: Message) {
        super(errorMessage || 'Unknown Error');
        this.dm = dm;
    }
    public dm!: Message;
}
