
export class HttpRequestError extends Error {

    constructor(public xhr: XMLHttpRequest, public event: ProgressEvent) {

        super();
    }

    toString() {
        return `${this.xhr.status} ${this.xhr.statusText}`;
    }
}