export const devEnv = (msg: string, cb?: Function) => {
  if (process.env.NODE_ENV === "development") {
    console.log(msg);
    cb?.();
  }
};
