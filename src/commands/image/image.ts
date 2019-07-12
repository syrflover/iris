import axios from 'axios';
import { Message, TextChannel } from 'discord.js';

import { CommandFunc } from '..';
import { StateError } from '../../state';
import { IImageCommandParseResult } from './flags';

export const image: CommandFunc<IImageCommandParseResult> = (
    { content, nsfw, date }: IImageCommandParseResult,
    message: Message,
): Promise<void> =>
    new Promise(async (resolve, reject) => {
        try {
            const dt = date ? `&date=${date}` : '';
            const url = `https://image.syrflover.co/random?get-url=true${dt}`;

            if (nsfw) {
                if (!(message.channel as TextChannel).nsfw) {
                    reject(new StateError('후방 주의 채널에서만 가능하여요', message));
                    return;
                }

                const nsfw_img_url = await axios.get(`${url}&nsfw=true`).then((res) => res.data);

                await message.channel.send(nsfw_img_url);
                resolve();
                return;
            }

            const img_url = await axios.get(url).then((res) => res.data);

            await message.channel.send(img_url);
            resolve();
        } catch (error) {
            reject(new StateError(error.message, message));
        }
    });
