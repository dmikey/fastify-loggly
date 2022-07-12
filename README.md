# fastify-loggly

send your fastify logs to loggly with ease. A thin fastify compatible wrapper around `pino` that impliments logging with `node-loggly-bulk`.

## install

```bash
yarn add @dmikey/fastify-loggly
```

## use

```
import { Logger } from '@dmikey/fastify-loggly`;

const fastify = Fastify({
  logger: Logger() as any,
});
```
