import { IHttpOptions } from "./IHttpArgs";
import { HttpMethod } from "src/enums/HttpMethod";
import { HttpRequestError } from "src/errors/HttpRequestError";

export interface IHttpUploadArgs<T> extends IHttpOptions {

    data: T;
    method?: HttpMethod;
    errorText?: (error: HttpRequestError) => string;
    text?: () => string;
}