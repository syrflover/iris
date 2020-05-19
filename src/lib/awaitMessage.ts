import { Message, TextChannel, DMChannel, NewsChannel, Client } from 'discord.js';
import { messageIterator } from './messageIterator';

export const awaitMessage = async (
    prefixes: string[] | null,
    message: Message,
    callback: (message: Message) => { stop: boolean } | Promise<{ stop: boolean }>,
) => {
    for await (const msg of messageIterator({ client: message.client })) {
        let r: { stop: boolean } = { stop: false };
        if (!prefixes) {
            r = await callback(msg);
        } else if (prefixes.some((pf) => msg.content.trim().startsWith(pf))) {
            msg.content = prefixes.reduce((pf) => msg.content.trim().replace(pf, ''));
            r = await callback(msg);
        }
        if (r.stop) {
            return;
        }
    }
};
