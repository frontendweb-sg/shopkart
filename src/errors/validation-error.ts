import { Error } from "mongoose";

import { CustomError, IError } from "./custom-error";

export class ValidationError extends CustomError {
  status: number = 400;

  constructor(public error: Error.ValidationError) {
    super(error.message);

    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  renderError(): IError {
    return {
      message: this.message,
      status: this.status,
      field: this.name,
    };
  }
}
