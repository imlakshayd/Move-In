const express = require("express");
const router = express.Router();

const {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage
} = require("../controllers/messageController");

router.get("/", getAllMessages);
router.get("/:id", getMessageById);
router.post("/", createMessage);
router.put("/:id", updateMessage);
router.delete("/:id", deleteMessage);

module.exports = router;