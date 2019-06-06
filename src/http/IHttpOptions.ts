import { CancellationToken } from "@alumis/cancellationtoken";

export interface IHttpOptions {
s
    data?: { [name: string]: any; };
    headers?: { [key:string]: string };
    url: string;    
}