import express from 'express';
import authenticate from '../middleware.js';
import {
	getVideos,
	getVideoById,
	handleLikeVideo,
	getLikedVideos,
	addComment,
	getComments,
	handleLikeComment,
} from '../controllers/video.js';

const router = express.Router();

// 댓글 관련 라우트
router.post(
	'/:videoId/comments/:commentId/like',
	authenticate,
	handleLikeComment,
);
router.post('/:videoId/comments', authenticate, addComment);
router.get('/:videoId/comments', authenticate, getComments);

// 비디오 관련 라우트
router.get('/', authenticate, getVideos);
router.get('/liked', authenticate, getLikedVideos);
router.get('/:id', authenticate, getVideoById);
router.post('/:id/like', authenticate, handleLikeVideo);

export default router;
