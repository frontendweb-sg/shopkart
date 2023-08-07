import { CustomError, IError } from "./custom-error";

export class DatabaseError extends CustomError {
  status: number = 500;
  constructor(public message: string = "Error connecting to database!") {
    super(message);
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  renderError(): IError {
    return { message: this.message, status: this.status, field: this.name };
  }
}
