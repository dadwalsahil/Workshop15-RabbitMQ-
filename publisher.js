const amqplib = require('amqplib/callback_api');
const { set } = require('express/lib/application');

amqplib.connect('amqp://localhost' , (err , conn)=>{
    if(err){
        console.log(err);
    }
    else{
        conn.createChannel((err , channel)=>{
            if(err){
                console.log(err)
            }
           let queueName = "queue"
           let message = "hello My Name Is Sahil"
           channel.assertQueue(queueName , {
               durable:false
           })
           channel.sendToQueue(queueName , Buffer.from(message))
           console.log(`message : ${message}`);
           setTimeout(()=>{
               conn.close()
           },2000)

        })
    }
})