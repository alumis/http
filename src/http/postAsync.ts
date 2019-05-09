import { OperationCancelledError } from "@alumis/cancellationtoken";
import { HttpStatusCode } from "../enums/HttpStatusCode";
import { HttpRequestError } from "../errors/HttpRequestError";
import { IHttpPostArgs as IHttpPostOptions } from "./IHttpPostArgs";
import { HttpMethod } from "src/enums/HttpMethod";

export function postAsync(options: IHttpPostOptions) {

    return new Promise<any>((resolve, reject) => {

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