import dotenv from 'dotenv';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { connectDB } from './utilities/db';
import { logInfo } from './utilities/logger';
import routes from './routes/routes';

// Load the appropriate .env file based on NODE_ENV
const nodeEnv = process.env.NODE_ENV || 'development';

// check if the environment file exists
if (!require('fs').existsSync(`.env.${nodeEnv}`)) {
  // if the file does not exist, copy the .env.example file to the .env.development file
  require('fs').copyFileSync('.env.example', `.env.${nodeEnv}`);
  console.error(`It's seems the .env.${nodeEnv} file is missing. we have created a new file for you. Please update the file with your environment variables.`);
  process.exit(1);
} else {
  dotenv.config({ path: `.env.${nodeEnv}` });
  // check if required environment variables are set
  const requiredEnv = ['NODE_ENV', 'PORT', 'DB_URI', 'JWT_SECRET', 'APP_URL'];
  const missingEnv = requiredEnv.filter(env => !process.env[env]);
  if (missingEnv.length) {
    console.error(`The following environment variables are missing: ${missingEnv.join(' | ')}`);
    process.exit(1);
  }
}

// implement fastify
const app = fastify({ logger: false });
app.register(cors, {
  origin: process.env.APP_URL ?? '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

// Register routes with '/api' prefix
app.register(routes, { prefix: '/api' });
app.get('/', async (request, reply) => { reply.send("Welcome to APIs.\nYour project has been installed successfully.\nYou can now start building your application.\nHappy coding!"); });

(async () => {
  try {
    await connectDB();
    await app.listen({ port: Number(process.env.PORT) || 4000 });
    logInfo.info(`Server running in ${process.env.NODE_ENV} mode at http://localhost:${process.env.PORT}`);
  } catch (error) {
    logInfo.error(JSON.stringify(error));
    process.exit(1);
  }
})();