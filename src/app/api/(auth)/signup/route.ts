import { connectDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Error, MongooseError } from "mongoose";
import { errorHandler } from "@/middleware/error-handler";
import { CustomError } from "@/errors/custom-error";
import { IUser, IUserDoc, User } from "@/models/user";
import { NotFoundError } from "@/errors/not-found-error";
import { AppContent } from "@/utils/content";
import { Jwt } from "@/utils/jwt";
import { ValidationError } from "@/errors/validation-error";
import { mailer } from "@/lib/mailer";

/**
 * user signup
 * @param req
 */
export async function POST(req: NextRequest) {
  await connectDb();
  try {
    const body = (await req.json()) as IUser;

    const user = (await User.findOne({
      email: body.email,
    })) as IUserDoc;

    if (user) throw new NotFoundError(AppContent.alreadyRegisteredText);

    const newUser = new User(body);
    newUser.resetToken = Jwt.genToken({
      email: newUser.email,
      id: newUser.id,
    });
    const result = (await newUser.save()) as IUser;
    // if (result.role === "user") {
    //   mailer.send({
    //     from: process.env.MAILER_USER!,
    //     to: newUser.email,
    //     subject: "Socially - email verification",
    //     text: "Welcome to socially",
    //     html: `
    //         <!DOCTYPE html>
    //         <html>
    //         <head>
    //             <title>Socially - email verification</title>
    //             <style>
    //       .table {
    //         width: 500px;
    //         margin: auto;
    //         background-color: #f4f5f6;
    //         text-align: center;
    //         font-size: 14px;
    //         font-family: "Roboto", sans-serif;
    //         color: #545454;
    //       }
    //       h1,
    //       h2,
    //       h3,
    //       h4,
    //       h5,
    //       h6 {
    //         font-family: "Maven Pro", sans-serif;
    //         margin-top: 0;
    //         margin-bottom: 10px;
    //         font-weight: 500;
    //         color: #0da9ef;
    //       }
    //       h1 {
    //         font-size: 22px;
    //       }
    //       h6 {
    //         font-size: 18px;
    //       }
    //       p {
    //         line-height: 1.4;
    //       }
    //       a {
    //         color: inherit;
    //       }
    //       a:hover {
    //         color: #0893d2;
    //       }

    //       .btn {
    //         margin: 40px 0;
    //         display: inline-block;
    //         padding: 12px;
    //         border-radius: 4px;
    //         min-width: 160px;
    //         background-color: #0da9ef;
    //         color: #fff;
    //         text-decoration: none;
    //         text-transform: uppercase;
    //       }
    //       .btn:hover {
    //         background-color: #0893d2;
    //         color: #fff;
    //         box-shadow: 0 2px 0px #116f9a;
    //       }
    //       hr {
    //         border: 1px solid #eee;
    //         margin: 25px 0;
    //       }
    //       .p-small {
    //         font-size: 13px;
    //       }
    //       .p-large {
    //         font-size: 14px;
    //         font-weight: 500;
    //         color: #0da9ef;
    //         font-family: "Maven Pro", sans-serif;
    //       }

    //       .need-help {
    //         margin: 20px 0;
    //         background-color: #fff;
    //         padding: 20px;
    //       }
    //     </style>
    //           </head>
    //           <body>
    //            <table class="table">
    //       <tbody>
    //         <tr>
    //           <td style="padding: 50px 20px">
    //             <div style="padding-bottom: 15px">
    //               <h1>Dev connections</h1>
    //             </div>

    //             <div style="background: #fff; padding: 30px 20px">
    //               <h2>Almost done!</h2>
    //               <hr />
    //               <h6 style="margin-top: 15px">
    //                 Welcome ${result.firstname + " " + result.lastname}
    //               </h6>
    //               <p>You have successfully registerd.</p>

    //               <p>Please click below button to confirm your email address.</p>

    //               <a
    //                 href="${process.env.NEXTAUTH_URL}/api/verify-email/${
    //       result.resetToken
    //     }"
    //                 class="btn"
    //                 >Confirm Account</a
    //               >
    //               <p class="p-small">
    //                 If that doesn't work, copy and paste the following link in your
    //                 browser.
    //               </p>

    //               <span
    //                 data-token="${process.env.NEXTAUTH_URL}/api/verify-email/${
    //       result.resetToken
    //     }"
    //                 class="p-large"
    //                 >${process.env.NEXTAUTH_URL}/api/verify-email/${
    //       result.resetToken
    //     }</span
    //               >

    //               <p class="p-small">
    //                 If you have any questions, just reply to this email <br />
    //                 -- we're always hapy to help out.
    //               </p>
    //               <hr />
    //               <div style="text-align: left; display: block">
    //                 <h6>
    //                   Thanks.
    //                   <small style="display: block; font-size: 12px; color: #545454"
    //                     >Shopkart Team</small
    //                   >
    //                 </h6>
    //               </div>
    //             </div>
    //             <div class="need-help">
    //               <h6>Need more help?</h6>
    //               <a href="mail:frontendweb.sg@gmail.com">Write mail to us</a>
    //             </div>
    //             <div class="footer">
    //               <p class="p-small">
    //                 You received this email because you just signed up for a new
    //                 account. if it looks weired,
    //                 <a href="" style="color: #c90063"> View it in your browser.</a>
    //               </p>
    //                <p class="p-small">
    //                 Copyright &copy; ${
    //                   new Date().getFullYear
    //                 }, <b>frontendweb.in</b>
    //               </p>
    //             </div>
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table>
    //           </body>
    //         </html>`,
    //   });
    // }
    console.log(result);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      error = new ValidationError(error);
    }
    if (error instanceof Error) {
      console.log(error, "error");
    }
    return errorHandler(error as CustomError);
  }
}
