# fastify-loggly

send your fastify logs to loggly with ease. A thin fastify compatible wrapper around `pino` that impliments logging with `node-loggly-bulk`.

## install

```bash
yarn add @dmikey/fastify-loggly
```

## use

- Fastify Logger Options check [Fastify Docs](https://www.fastify.io/docs/latest/Reference/Logging/)
- Loggly Options check [node-loggly-bulk](https://github.com/loggly/node-loggly-bulk)

```typescript
import { Logger } from "@dmikey/fastify-loggly";

const fastify = Fastify({
  logger: Logger(FastifyLoggerOptions, LogglyOptions),
});

// use the logger
fastify.log("info", { some: "foo" });
```
