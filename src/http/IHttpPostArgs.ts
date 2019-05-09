import { IHttpOptions } from './IHttpArgs';

export interface IHttpPostArgs extends IHttpOptions {

    data?: { [name: string]: any; };
}