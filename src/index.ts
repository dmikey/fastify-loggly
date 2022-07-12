import pino, { LevelChangeEventListener, LoggerOptions } from "pino";
import loggly from "node-loggly-bulk";
import stringify from "json-stringify-safe";
import { FastifyBaseLogger } from "fastify/types/logger";

export const Logger = (
  loggerOptions: LoggerOptions = {},
  logglyOptions: loggly.LogglyBulkOptions
): FastifyBaseLogger => {
  const logger = pino(loggerOptions);
  var client = loggly.createClient(logglyOptions);

  const log = (level: string, context: any, msg: any) => {
    var sanitized = JSON.parse(stringify(context));
    if (msg) sanitized.msg = msg;
    client.log(sanitized, [level]);
    (logger as any)[level](sanitized);
  };

  class Logger {
    constructor(...args: any) {
      (this as any).args = args;
      (this as any)[Symbol.for("pino.serializers")] = {
        ...(logger as any)[Symbol.for("pino.serializers")],
      };
    }
    info(context: any, msg: any) {
      log("info", context, msg);
    }
    error(context: any, msg: any) {
      log("error", context, msg);
    }
    debug(context: any, msg: any) {
      log("debug", context, msg);
    }
    fatal(context: any, msg: any) {
      log("fatal", context, msg);
    }
    warn(context: any, msg: any) {
      log("warn", context, msg);
    }
    trace(context: any, msg: any) {
      log("trace", context, msg);
    }
    silent(context: any, msg: any) {}
    bindings(): pino.Bindings {
      return logger.bindings();
    }
    set level(level: string) {
      logger.level = level;
    }
    get level(): string {
      return logger.level;
    }
    isLevelEnabled(level: string) {
      return logger.isLevelEnabled(level);
    }
    get levels(): pino.LevelMapping {
      return logger.levels;
    }
    get version(): string {
      return logger.version;
    }
    on(event: "level-change", listener: LevelChangeEventListener) {
      logger.on(event, listener);
    }
    flush() {
      logger.flush();
    }
    child(): any {
      return new Logger();
    }
    toJSON() {
      return {
        logger: "instance",
      };
    }
  }

  return new Logger() as unknown as FastifyBaseLogger;
};
