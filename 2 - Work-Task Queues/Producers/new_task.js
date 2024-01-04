var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'task_queue';
    let count = 0;
    channel.assertQueue(queue, {
      durable: true
    });

    setInterval(()=>{

      var msg = process.argv.slice(2).join(' ') || count + " " +  new Date() + ": Hello World!.";
      count++;
      channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true
      });

      console.log(" [x] Sent '%s'", msg);           
    },500)       
  });
});