import { FastifyInstance } from 'fastify';
import { login, register } from '../controllers/auth.controller';
import baseRoutes from '../framework/base.route';
import authRoutes from './auth.routes';

export default async function routes(app: FastifyInstance) {
  // authentication routes
  app.post('/register', register);
  app.post('/login', login);

  // single route  
  app.get('/single', async (request, reply) => { reply.send('This is a single routes.'); });

  // CRUD routes
  baseRoutes(app, 'todo', 'todo');

  // Authentication routes
  await authRoutes(app);
}