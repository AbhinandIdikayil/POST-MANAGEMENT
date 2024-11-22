import { Router } from 'express'
import { UserController } from '../controller/user_controller';
import { PostController } from '../controller/post_controller';
import { verify } from '../middlewares/verify_middleware';

export const route: Router = Router();
const userController = new UserController()
const postController = new PostController()

route.route('/post')
    .post(verify, postController.create.bind(postController))
    .put(verify, postController.updatePost.bind(postController))
    .delete(verify , postController.deleteOneById.bind(postController))
    .get(verify, postController.getAllPosts.bind(postController));

route.route('/posts-by-user').get(verify,postController.getPostOfOneUser.bind(postController));

route.post('/login', userController.login.bind(userController));
route.post('/signup', userController.register.bind(userController));



