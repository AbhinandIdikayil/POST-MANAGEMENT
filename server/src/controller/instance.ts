import { PostDbFunctions } from "../db_functions/posts";
import { UserDbFunctions } from "../db_functions/user";


export const userDbFunctions = new UserDbFunctions();
export const postDbFunctions = new PostDbFunctions();