import { IHttpOptions } from "./IHttpOptions";
import { HttpMethod } from "src/enums/HttpMethod";
import { HttpRequestError } from "src/errors/HttpRequestError";

export interface IHttpUploadOptions<T> extends IHttpOptions {

    data: T;
    method?: HttpMethod;
    errorText?: (error: HttpRequestError) => string;
    text?: () => string;
}