import { getRepository, getManager } from 'typeorm';
import { Request, Response } from 'express';
import { Post } from '../database/entities/Post';
import { respondWithSuccess, respondWithError } from '../helpers/helpers';
import {
  HTTP_CREATED,
  HTTP_INTERNAL_SERVER_ERROR,
} from '../helpers/httpStatusCode';

export class PostController {
  static async create(req: Request, res: Response) {
    try {
      const { title, body } = req.body;
      const post = new Post();
      post.title = title;
      post.body = body;
      post.user = req.user;
      await getManager().save(post);
      if (post) {
        respondWithSuccess(res, post, HTTP_CREATED, 'success');
      } else {
        throw new Error('Failed to save post');
      }
    } catch (error) {
      respondWithError(
        res,
        HTTP_INTERNAL_SERVER_ERROR,
        'Internal Server Error',
        error,
      );
    }
  }

  static async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await getRepository(Post).find();
      respondWithSuccess(res, posts);
    } catch (error) {
      respondWithError(
        res,
        HTTP_INTERNAL_SERVER_ERROR,
        'Internal Server Error',
        error,
      );
    }
  }
}
