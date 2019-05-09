import { CancellationToken, OperationCancelledError } from '@alumis/cancellationtoken';
import { HttpRequestError } from '../errors/HttpRequestError';
import { HttpStatusCode } from '../enums/HttpStatusCode';
import { IHttpOptions } from './IHttpArgs';
import { HttpMethod } from 'src/enums/HttpMethod';

export function getJsonAsync<T>(options: IHttpOptions) {

    return new Promise<T>((resolve, reject) => {

        var xhr = new XMLHttpRequest();
        var cancellationListener: () => void;

        xhr.onload = e => {

            if (options.cancellationToken)
                options.cancellationToken.removeListener(cancellationListener);

            if (xhr.status === HttpStatusCode.Ok)
                resolve(xhr.response);

            else reject(new HttpRequestError(xhr, e));
        };

        xhr.onerror = e => {

            if (options.cancellationToken)
                options.cancellationToken.removeListener(cancellationListener);

            reject(new HttpRequestError(xhr, e));
        };

        if (options.cancellationToken)
            options.cancellationToken.addListener(cancellationListener = () => {
                xhr.abort();
                reject(new OperationCancelledError());
            });

        xhr.open(HttpMethod.Get, options.url, true);
        xhr.responseType = "json";

        if (options.headers) 
            for (let key in options.headers) 
                if (options.headers.hasOwnProperty(key))
                    xhr.setRequestHeader(key, options.headers[key]);

        xhr.send();
    });
}