import { FastifyInstance } from "fastify";
import { isAuth } from "../middlewares/auth.middleware";
import baseRoutes from "../framework/base.route";

export default async function authRoutes(app: FastifyInstance) {
  app.register(async (authApp) => {
    authApp.addHook('preHandler', isAuth); // Apply the middleware

    // Routes
    baseRoutes(authApp, 'user', 'userController');
  });
}