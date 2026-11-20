import express, { type ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import { config } from './config.js';
import { parkingRouter } from './routes/parking.js';
import { sendError } from './lib/respond.js';

export function createApp() {
  const app = express();

  // Correct client IPs for rate limiting when running behind a reverse proxy / load balancer.
  app.set('trust proxy', config.trustProxy);

  // Security headers (also removes X-Powered-By).
  app.use(helmet());

  // Cross-origin browser access is off unless specific origins are listed in CORS_ORIGINS.
  if (config.corsOrigins.length) {
    app.use(cors({ origin: config.corsOrigins, methods: ['GET'] }));
  }

  // Request log: method, path, status, time. Query strings are not logged.
  app.use((req, res, next) => {
    const start = process.hrtime.bigint();
    res.on('finish', () => {
      const ms = Number(process.hrtime.bigint() - start) / 1e6;
      console.log(`${req.method} ${req.path} ${res.statusCode} ${ms.toFixed(0)}ms`);
    });
    next();
  });

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  // Per-visitor limit on parking searches.
  const searchLimiter = rateLimit({
    windowMs: 60_000,
    limit: config.rateLimitPerMinute,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (_req, res) => sendError(res, 429, 'Too many searches. Please wait a minute and try again.'),
  });
  app.use('/api/parking', searchLimiter, parkingRouter);

  app.use('/api', (_req, res) => sendError(res, 404, 'Not found'));

  // Last-resort error handler: log the details, never send them to the browser.
  const onError: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error('[error]', err);
    if (res.headersSent) return;
    sendError(res, 500, 'Something went wrong. Please try again.');
  };
  app.use(onError);

  return app;
}
