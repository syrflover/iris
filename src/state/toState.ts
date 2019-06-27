import { StateType } from './index';

export const toState = <T, Y>(t: T) => (y: Y): StateType<T, Y> => [t, y, ''];
