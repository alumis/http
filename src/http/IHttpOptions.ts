import { CancellationToken } from "@alumis/cancellationtoken";

export interface IHttpOptions {

    cancellationToken?: CancellationToken;
    data?: { [name: string]: any; };
    headers?: { [key:string]: string };
    url: string;    
}