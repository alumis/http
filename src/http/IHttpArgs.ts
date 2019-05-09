import { CancellationToken } from "@alumis/cancellationtoken";

export interface IHttpOptions {

    url: string;
    headers?: { [key:string]: string };
    cancellationToken?: CancellationToken;
}