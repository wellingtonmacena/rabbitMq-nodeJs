var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    var queue = "hello";
    let count = 0;
    channel.assertQueue(queue, {
      durable: false,
    });

   let refreshId =  setInterval(() => {
      var msg = new Date() + "Sender 1: Welcome aboard";

      channel.sendToQueue(queue, Buffer.from(msg));

      console.log(" [x] Sent/Count: ", count, msg);
      count++;
      if (count == 20) {
        connection.close();
        clearInterval(refreshId);
        process.exit(0);
        
      }
    }, 1000);
  });
});
