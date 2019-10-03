import { getLogger } from 'log4js';
import { env } from './env';

export const logger = getLogger('iris');

logger.level = env.NODE_ENV === 'development' ? 'debug' : 'info';
