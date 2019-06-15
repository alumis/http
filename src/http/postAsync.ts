import { CancellationToken} from "@alumis/utils/src/CancellationToken";
import { OperationCancelledError } from "@alumis/utils/src/OperationCancelledError";
import { HttpStatusCode } from "../enums/HttpStatusCode";
import { HttpRequestError } from "../errors/HttpRequestError";
import { HttpMethod } from "../enums/HttpMethod";
import { IHttpOptions } from "./IHttpOptions";

export function postAsync(options: IHttpOptions, cancellationToken?: CancellationToken) {

    return new Promise<any>((resolve, reject) => {

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

        xhr.open(HttpMethod.Post, options.url, true);

        if (options.headers)
            for (let key in options.headers) 
                if (options.headers.hasOwnProperty(key))
                    xhr.setRequestHeader(key, options.headers[key]);

        if (options.data) {

            var formData = new FormData();

            for (var p in options.data) {

                var value = options.data[p];

                if (Object.prototype.toString.call(value) === "[object Date]")
                    value = (<Date>value).toISOString();

                formData.append(p, value);
            }

            xhr.send(formData);
        }

        else xhr.send();
    });
}