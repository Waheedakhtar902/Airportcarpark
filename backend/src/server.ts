import { config } from './config.js';
import { createApp } from './app.js';

const server = createApp().listen(config.port, config.host, () => {
  console.log(`AirportCarPark API listening on http://${config.host}:${config.port} (${config.env})`);
});

// Finish in-flight requests before exiting.
function shutdown(signal: string) {
  console.log(`${signal} received, shutting down…`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
