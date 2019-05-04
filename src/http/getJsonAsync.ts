import { CancellationToken, OperationCancelledError } from '@alumis/cancellationtoken';
import { HttpRequestError } from '../errors/HttpRequestError';
import { HttpStatusCode } from '../enums/HttpStatusCode';
import { PromiseWithProgress } from '../utils/PromiseWithProgress';

export function getJsonAsync<T>(url: string, cancellationToken?: CancellationToken) {

    return new PromiseWithProgress<T>((resolve, reject) => {

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

        xhr.onprogress = e => {

        };

        if (cancellationToken)
            cancellationToken.addListener(cancellationListener = () => {
                xhr.abort();
                reject(new OperationCancelledError());
            });

        xhr.open("GET", url, true);
        xhr.responseType = "json";

        xhr.send();
    });
}