import { Router } from 'express'
import { UserController } from '../controller/user_controller';

export const route: Router = Router();
const userController = new UserController()

// route.get('/all-post')
// route.get('/post')
route.post('/login', userController.login.bind(userController));
route.post('/signup', userController.register.bind(userController));



