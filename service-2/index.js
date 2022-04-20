const express = require('express')
const app = express()
const amqp = require('amqplib')

let channel, connection;
// docker run --name rabbitmq -p 5672:5672 rabbitmq
connect()
async function connect() {
    try {
        const amqpServer = "http://localhost:5672"
        connection = await amqp.connect(amqpServer)
        channel = await connection.createChannel()
        await channel.assertQueue("session")
        channel.consume("session", data => {
            console.log(`Received ${Buffer.from(data.content)}`)
        })
    } catch (err) {

    }
}
app.get('/send', (req, res) => {

})

app.listen(5002, () => {
    console.log('server at 5002')
})