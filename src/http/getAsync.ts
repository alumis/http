import { OperationCancelledError, CancellationToken } from '@alumis/cancellationtoken';
import { HttpRequestError } from '../errors/HttpRequestError';
import { HttpStatusCode } from '../enums/HttpStatusCode';
import { IHttpOptions } from './IHttpOptions';
import { HttpMethod } from '../enums/HttpMethod';

export function getAsync(options: IHttpOptions, cancellationToken?: CancellationToken) {

    return new Promise<string>((resolve, reject) => {

        var xhr = new XMLHttpRequest();
        var cancellationListener: () => void;

        xhr.onload = e => {

            if (cancellationToken)
                cancellationToken.removeListener(cancellationListener);

            if (xhr.status === HttpStatusCode.Ok)
                resolve(xhr.response);

            else reject(new HttpRequestError(xhr, e));
        };

        xhr.onerror = e => {

            if (cancellationToken)
                cancellationToken.removeListener(cancellationListener);

            reject(new HttpRequestError(xhr, e));
        };

        if (cancellationToken)
            cancellationToken.addListener(cancellationListener = () => {
                xhr.abort();
                reject(new OperationCancelledError());
            });

        if (options.data) {

            var kvps: string[] = [];
            
            for (let name in options.data) {

                let value = options.data[name];

                if (name && value) {
                    kvps.push(`${name}=${value}`);
                }
            }

            options.url += `?${kvps.join('&')}`;
        }

        xhr.open(HttpMethod.Get, options.url, true);

        if (options.headers) 
            for (let key in options.headers) 
                if (options.headers.hasOwnProperty(key))
                    xhr.setRequestHeader(key, options.headers[key]);

        xhr.send();
    });
}