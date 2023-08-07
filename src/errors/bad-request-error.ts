import { CustomError, IError } from "./custom-error";

export class BadRequestError extends CustomError {
  status: number = 400;
  constructor(message = "bad request") {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  renderError(): IError {
    return { message: this.message, status: this.status, field: this.name };
  }
}
