import { CancellationToken, OperationCancelledError } from '@alumis/cancellationtoken';
import { HttpRequestError } from '../errors/HttpRequestError';
import { HttpStatusCode } from '../enums/HttpStatusCode';
import { PromiseWithProgress } from '../utils/PromiseWithProgress';

export function getJsonAsync<T>(url: string, headers?: { [key:string]: string }, cancellationToken?: CancellationToken) {

    return new PromiseWithProgress<T>((resolve, reject, progressObservable) => {

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

        xhr.onprogress = e => progressObservable.value = e.loaded / e.total;

        if (cancellationToken)
            cancellationToken.addListener(cancellationListener = () => {
                xhr.abort();
                reject(new OperationCancelledError());
            });

        if (headers) 
            for (const k in headers) 
                if (headers.hasOwnProperty(k)) 
                    xhr.setRequestHeader(k, headers[k]);

        xhr.open("GET", url, true);
        xhr.responseType = "json";

        if (headers) 
            for (let key in headers) 
                if (headers.hasOwnProperty(key))
                    xhr.setRequestHeader(key, headers[key]);

        xhr.send();
    });
}