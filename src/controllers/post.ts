import { getRepository, getManager } from 'typeorm';
import { Request, Response } from 'express';
import { Post } from '../database/entities/Post';
import { respondWithSuccess, respondWithError } from '../helpers/helpers';
import { HTTP_NOT_FOUND } from '../helpers/httpStatusCode';
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
      post.author = req.user;
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
      const posts = await getRepository(Post).find({ relations: ['author', 'comments']});
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

  static async update(req: Request, res: Response) {
    try {
      const postRepository = getRepository(Post);
      const { postId = '' } = req.params;
      const post = await postRepository.findOne({
        where: { id: postId },
        relations: ['author'],
      });

      if (!post) {
       return respondWithError(res, HTTP_NOT_FOUND, 'Post Not Found');
      }
      if (post.author.id !== req.user.id) {
        throw new Error('You can not edit your own post');
      }
      const { affected } = await postRepository.update(postId, req.body);
      if (affected > 0) {
        const updatedPost = await postRepository.findOne(postId);
        respondWithSuccess(res, updatedPost);
      } else {
        throw new Error('Failed to update post');
      }
    } catch (error) {
      respondWithError(res, HTTP_INTERNAL_SERVER_ERROR, error.message, error);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const postRepository = getRepository(Post);
      const { postId = '' } = req.params;
      const post = await postRepository.findOne({
        where: { id: postId },
        relations: ['author'],
      });

      if (!post) {
        return respondWithError(res, HTTP_NOT_FOUND, 'Post Not Found');
      }
      if (post.author.id !== req.user.id) {
        throw new Error('You can only delete your own post');
      }
      const { affected } = await postRepository.delete(postId);
      if (affected > 0) {
        respondWithSuccess(res, [], 200, 'Post Deleted');
      } else {
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      respondWithError(res, HTTP_INTERNAL_SERVER_ERROR, error.message, error);
    }
  }
}
