import { Message, TextChannel, DMChannel, NewsChannel } from 'discord.js';

export const awaitMessage = (
    prefixes: string[] | null,
    channel: TextChannel | DMChannel | NewsChannel,
    callback: (message: Message) => boolean,
) => {
    channel.awaitMessages((message: Message) => {
        if (!prefixes) {
            return callback(message);
        }
        if (prefixes.some((pf) => message.content.trim().startsWith(pf))) {
            message.content = prefixes.reduce((pf) => message.content.trim().replace(pf, ''));
            return callback(message);
        }
        return false;
    });
};
