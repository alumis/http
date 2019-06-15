import { CancellationToken} from "@alumis/utils/src/CancellationToken";
import { OperationCancelledError } from "@alumis/utils/src/OperationCancelledError";
import { IHttpUploadOptions } from "./IHttpUploadOptions";
import { r } from "@alumis/observables-i18n";
import { Observable, co, createObservablePromiseWithText } from '@alumis/observables';
import { HttpMethod } from "../enums/HttpMethod";
import { HttpStatusCode } from '../enums/HttpStatusCode';
import { HttpRequestError } from '../errors/HttpRequestError';

export function uploadFileAsync(options: IHttpUploadOptions<File>, autoDispose = true, cancellationToken?: CancellationToken) {

    let textObservable: Observable<string>;
    let text = options.text;
    let method = options.method || HttpMethod.Put;

    if (!text) 
        text = () => { return `${r('http.uploadFileAsync').value} ${options.data.name}`; } //// "http.uploadFileAsync": { no: "laster opp", en: "uploading" } 

    textObservable = co(text);

    let promise = createObservablePromiseWithText((resolve, reject, progress) => {

        var xhr = new XMLHttpRequest();
        var cancellationListener: () => void;

        xhr.onload = e => {

            if (cancellationToken)
                cancellationToken.removeListener(cancellationListener);

            if (xhr.status === HttpStatusCode.Ok)
                resolve(xhr.response);

            else reject(new HttpRequestError(xhr, e));
        };

        xhr.upload.onprogress = e => {

            progress(e.loaded / e.total);
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

        var fd = new FormData();

        fd.append('file', options.data);

        xhr.open(method, options.url, true);
        xhr.send(fd);

    }, (error: HttpRequestError) => {

        if (options.errorText)
            return options.errorText(error);

        return error.toString();

    }, () => { return textObservable.value; }, autoDispose);

    const dispose = promise.dispose;

    promise.dispose = () => {

        dispose();
        textObservable.dispose();
    }

    return promise;
}