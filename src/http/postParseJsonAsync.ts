import { CancellationToken, OperationCancelledError } from "@alumis/cancellationtoken";
import { HttpStatusCode } from "src/enums/HttpStatusCode";
import { HttpRequestError } from "src/errors/HttpRequestError";
import { PromiseWithProgress } from "src/utils/PromiseWithProgress";

export function postParseJsonAsync<T>(url: string, data?: any, cancellationToken?: CancellationToken) {

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

        xhr.open("POST", url, true);
        xhr.responseType = "json";

        if (data) {

            var formData = new FormData();

            for (var p in data) {

                var value = data[p];

                if (Object.prototype.toString.call(value) === "[object Date]")
                    value = (<Date>value).toISOString();

                formData.append(p, value);
            }

            xhr.send(formData);
        }

        else xhr.send();
    });
}