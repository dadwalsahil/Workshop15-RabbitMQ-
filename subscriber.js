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
        
           channel.assertQueue(queueName , {
               durable:false
           })
           channel.consume(queueName ,(msg)=>{
               console.log(`Received : ${msg.content.toString()}`)
           } ,{
               noAck:true
           })

        })
    }
})