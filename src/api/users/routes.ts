import * as Hapi from '@hapi/hapi';
import UserController from '../../api/users/controller';
import validate from '../../api/users/validate';
import Logger from '../../helper/logger';
import IRoute from '../../helper/route';

export default class UserRoutes implements IRoute {
  public async register(server: Hapi.Server): Promise<any> {
    return new Promise<void>(resolve => {
      Logger.info('UserRoutes - Start adding user routes');

      const controller = new UserController();

      server.route([
        // {
        //   method: 'POST',
        //   path: '/api/users',
        //   options: {
        //     handler: controller.create,
        //     validate: validate.create,
        //     description: 'Method that creates a new user.',
        //     tags: ['api', 'users'],
        //     auth: false,
        //   },
      ]);

      Logger.info('UserRoutes - Finish adding user routes');

      resolve();
    });
  }
}
