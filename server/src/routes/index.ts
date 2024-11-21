import { Router } from 'express'
import { UserController } from '../controller/user_controller';
import { PostController } from '../controller/post_controller';

export const route: Router = Router();
const userController = new UserController()
const postController = new PostController()
route.route('/post')
    .post(postController.create.bind(postController))
    .put(postController.updatePost.bind(postController))
    .delete(postController.deleteOneById.bind(postController))
    .get(postController.getAllPosts.bind(postController));

route.post('/login', userController.login.bind(userController));
route.post('/signup', userController.register.bind(userController));



