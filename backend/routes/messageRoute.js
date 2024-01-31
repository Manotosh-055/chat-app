const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { sendMessage, allMessages } = require('../controller/messageController');
const router = express.Router();

router.post("/create-message", protect, sendMessage);
router.get("/user-msg/:chatId", protect, allMessages);

module.exports = router;