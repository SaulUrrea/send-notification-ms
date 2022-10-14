import express from "express";
import bodyParser from "body-parser";
import { firebaseMessage } from "./firebaseConfig.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const notification_options = {
  priority: "high",
  timeToLive: 60 * 60 * 24,
};

app.post("/send-notification/", function (req, res) {
  console.log(req.body);
  const { device, message, title } = req.body;

  const message_notification = {
    notification: {
      title: title,
      body: message,
    },
  };

  firebaseMessage
    .messaging()
    .sendToDevice(device, message_notification, notification_options)
    .then((response) => {
      console.log(response);
      res.status(200).send("Notification sent successfully");
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

app.listen(8080);
