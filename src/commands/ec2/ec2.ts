import * as F from 'nodekell';
import { EC2, Credentials } from 'aws-sdk';

import type { Message } from 'discord.js';

import { CommandFunc } from '..';
import { IBaseCommandParseResult } from '@syrflover/command-parser';
import { StateError } from '../../state';

import { env } from '../../env';

const ec2 = new EC2({
    region: 'ap-northeast-1',
    credentials: new Credentials({
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    }),
});

export const ec2_: CommandFunc<IBaseCommandParseResult, string> = (
    { content }: IBaseCommandParseResult,
    message: Message,
) =>
    new Promise(async (resolve, reject) => {
        try {
            switch (content) {
                case 'start':
                    {
                        const a = await ec2
                            .startInstances({
                                InstanceIds: [env.EC2_INSTANCE_ID],
                            })
                            .promise();

                        let b;

                        checkInstanceState: while (true) {
                            if (!message.channel.typing) message.channel.startTyping();
                            await F.sleep(2000);

                            b = await ec2
                                .describeInstances({
                                    InstanceIds: [env.EC2_INSTANCE_ID],
                                })
                                .promise();

                            const started =
                                b.Reservations![0].Instances![0].State!.Name === 'running';

                            if (started) {
                                message.channel.stopTyping();
                                break checkInstanceState;
                            }
                        }

                        console.log(b.Reservations![0].Instances![0]);

                        const ip = b.Reservations![0].Instances![0].PublicIpAddress;

                        await message.channel.send(`Started EC2 Instance.`);

                        resolve();
                    }
                    break;
                case 'stop':
                    {
                        const a = await ec2
                            .stopInstances({
                                InstanceIds: [env.EC2_INSTANCE_ID],
                            })
                            .promise();

                        checkInstanceState: while (true) {
                            if (!message.channel.typing) message.channel.startTyping();
                            await F.sleep(2000);

                            const b = await ec2
                                .describeInstances({
                                    InstanceIds: [env.EC2_INSTANCE_ID],
                                })
                                .promise();

                            const stopped =
                                b.Reservations![0].Instances![0].State!.Name === 'stopped';

                            if (stopped) {
                                message.channel.stopTyping();
                                break checkInstanceState;
                            }
                        }
                        await message.channel.send('Stopped EC2 Instance.');

                        resolve();
                    }
                    break;
                case 'state': {
                    const b = await ec2
                        .describeInstances({
                            InstanceIds: [env.EC2_INSTANCE_ID],
                        })
                        .promise();

                    await message.channel.send(b.Reservations![0].Instances![0].State!.Name);

                    resolve();
                    break;
                }
            }
        } catch (error) {
            reject(new StateError(error.message, message));
        }
    });
