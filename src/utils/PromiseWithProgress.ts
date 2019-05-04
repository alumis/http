import { o, Observable } from '@alumis/observables';

var progress: Observable<number>;

export class PromiseWithProgress<T> extends Promise<T> {

    constructor(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void, progressObservable: Observable<number>) => void) {

        super((resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => {

            executor(resolve, reject, (progress = o(0)));
        });
    }

    progress = progress;
}