export interface Deferred<T> extends PromiseLike<T> {
    resolve: (value?: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
}

export function deferred<T>(): Deferred<T> {
    let methods: any;

    const promise = new Promise<T>((resolve, reject) => {
        methods = {
            resolve,
            reject,
        };
    });

    return Object.assign(promise, methods);
}
