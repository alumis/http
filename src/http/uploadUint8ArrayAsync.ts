import { CancellationToken} from "@alumis/utils/src/CancellationToken";
import { OperationCancelledError } from "@alumis/utils/src/OperationCancelledError";
import { r } from "@alumis/observables-i18n";
import { Observable, co, createObservablePromiseWithText } from '@alumis/observables';
import { HttpStatusCode } from '../enums/HttpStatusCode';
import { HttpRequestError } from '../errors/HttpRequestError';
import { IHttpUploadOptions as IHttpUploadOptions } from "./IHttpUploadOptions";
import { HttpMethod } from "../enums/HttpMethod";

export function uploadUint8ArrayAsync(options: IHttpUploadOptions<Uint8Array>, autoDispose = true, cancellationToken?: CancellationToken) {

    let textObservable: Observable<string>, ownsObservable: boolean;
    let text = options.text;
    let method = options.method || HttpMethod.Put;
    let data = options.data;

    if (text) {
        textObservable = co(text);
        ownsObservable = true;
    }

    else textObservable = r("http.uploadUint8ArrayAsync"); //// "http.uploadUint8ArrayAsync", { no: "laster opp", en: "uploading" }

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

        xhr.open(method, options.url, true);
        xhr.send(<any>data.buffer);

    }, (error: HttpRequestError) => {

        if (options.errorText)
            return options.errorText(error);

        return error.toString();

    }, () => { return textObservable.value; }, autoDispose);

    if (ownsObservable) {

        const dispose = promise.dispose;

        promise.dispose = () => {

            dispose();
            textObservable.dispose();
        }
    }
        

    return promise;
}