import { io } from "../socket.js";
import { Message } from "../entities/message.entity.js";

export const SendMessage = async (req, res) => {
  const user = req["user"];

  const message = await Message.save({
    sender: user,
    receiver: { id: req.body.receiver_id },
    content: req.body.content,
  });
  io.emit("message", message.content);
  res.send("success");
};
