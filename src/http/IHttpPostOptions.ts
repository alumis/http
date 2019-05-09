import { IHttpOptions } from './IHttpOptions';

export interface IHttpPostOptions extends IHttpOptions {

    data?: { [name: string]: any; };
}