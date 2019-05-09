import { IHttpUploadArgs } from "./IHttpUploadArgs";
import { r } from "@alumis/observables-i18n";
import { OperationCancelledError } from "@alumis/cancellationtoken";
import { Observable, co, createObservablePromiseWithText } from '@alumis/observables';
import { HttpMethod } from "src/enums/HttpMethod";
import { HttpStatusCode } from 'src/enums/HttpStatusCode';
import { HttpRequestError } from 'src/errors/HttpRequestError';

export function uploadFileAsync(options: IHttpUploadArgs<File>, autoDispose = true) {

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

            if (options.cancellationToken)
                options.cancellationToken.removeListener(cancellationListener);

            if (xhr.status === HttpStatusCode.Ok)
                resolve(xhr.response);

            else reject(new HttpRequestError(xhr, e));
        };

        xhr.upload.onprogress = e => {

            progress(e.loaded / e.total);
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