import { spawnp } from '../lib/spawnp';

export const update = () => spawnp('git pull', []);
