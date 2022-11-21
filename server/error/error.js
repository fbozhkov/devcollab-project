export class Error {
    constructor(status, success, message) {
        this.status = status;
        this.success = success;
        this.message = message
    }
}

export class FormError extends Error {
    constructor (status, success, message, errorOrigin) {
        super(status, success, message);
        this.errorOrigin = errorOrigin;
    }
}
