import { Client, Message } from 'discord.js';
import { deferred } from './deferred';

export async function* messageIterator({ client }: { client: Client }): AsyncIterable<Message> {
    while (true) {
        const message_p = deferred<Message>();

        client.once('message', (message) => {
            message_p.resolve(message);
        });

        yield message_p;
    }
}
