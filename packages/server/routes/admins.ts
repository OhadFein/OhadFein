import express from "express";
import asyncHandler from 'express-async-handler';
import {
    // listS3Object, addS3Object, deleteS3Object,
    activateStar, deactivateStar,
    addFigure, deleteFigure,
    addVideo, deleteVideo,
} from "../controllers/admin";

const router = express.Router();

// TODO: validation is needed:

// stars
router.post('/stars/:starUsername', asyncHandler(activateStar));
router.delete('/stars/:starUsername', asyncHandler(deactivateStar));

// figures
router.post('/figures', asyncHandler(addFigure));
router.delete('/figures/:figureId', asyncHandler(deleteFigure));

// videos
router.post('/videos', asyncHandler(addVideo));
router.delete('/videos/:videoId', asyncHandler(deleteVideo));

export default router;