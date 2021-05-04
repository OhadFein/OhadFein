import express from "express";
import { getAllNotifications, markNotificationAsRead } from '../controllers/notification';
import asyncHandler from 'express-async-handler';
import { rules_getNotificationById } from "../middleware/rules/notifications";
import { validate } from "../middleware/validation";

const router = express.Router();

router.get('/', asyncHandler(getAllNotifications));
router.post('/mark/read/:notificationId', rules_getNotificationById, validate, asyncHandler(markNotificationAsRead));

export default router;