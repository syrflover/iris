import axios from 'axios';
import { IBaseCommandParseResult } from 'command-parser';
import { Message } from 'discord.js';

import { CommandFunc } from '..';
import { StateError } from '../../state';

export const image: CommandFunc<IBaseCommandParseResult> = (
    { content }: IBaseCommandParseResult,
    message: Message,
) =>
    new Promise(async (resolve, reject) => {
        try {
            const img_url = await axios
                .get('https://image.syrflover.co/random?get-url=true')
                .then((res) => res.data);

            await message.channel.send(img_url);
            resolve();
        } catch (error) {
            reject(new StateError(error.message, message));
        }
    });
