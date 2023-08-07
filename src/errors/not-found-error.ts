import { CustomError, IError } from "./custom-error";
export class NotFoundError extends CustomError {
  status: number = 404;
  constructor(message = "bad request") {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  renderError(): IError {
    return { message: this.message, status: this.status, field: this.name };
  }
}
