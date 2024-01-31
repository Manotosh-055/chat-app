const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controller/chatController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/access-chat", protect, accessChat);
router.get("/fetch-chat",protect, fetchChats);
router.post("/group-chat", protect, createGroupChat);
router.put("/rename", protect, renameGroup);
router.put("/groupadd", protect, addToGroup);
router.put("/groupremove", protect, removeFromGroup);

module.exports = router;