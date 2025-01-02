import { FastifyInstance } from 'fastify';

export default async function baseRoutes(app: FastifyInstance, routeName: string, controller: any): Promise<void> {

  // Dynamically import the controller module
  const importController = await import(`../controllers/${controller}.controller.ts`);
  const controllerModule = importController.default;

  // index route  
  app.get(`/${routeName}`, async (request, reply) => {
    await controllerModule.findAll(request, reply);
  });

  // create route
  app.get(`/${routeName}/create`, async (request, reply) => {
    await controllerModule.create(request, reply);
  });

  // store route
  app.post(`/${routeName}`, async (request, reply) => {
    await controllerModule.store(request, reply);
  });

  // show route
  app.get(`/${routeName}/:id`, async (request, reply) => {
    await controllerModule.findOne(request, reply);
  });

  // edit route
  app.get(`/${routeName}/edit/:id`, async (request, reply) => {
    await controllerModule.edit(request, reply);
  });

  // update route
  app.put(`/${routeName}/:id`, async (request, reply) => {
    await controllerModule.update(request, reply);
  });

  // delete route
  app.delete(`/${routeName}/:id`, async (request, reply) => {
    await controllerModule.delete(request, reply);
  });
}
