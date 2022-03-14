var aedes = require('aedes');
const net = require('net');
const kafka = require('kafka-node');
const log = require('./log');
const mqttPort = process.env.MQTT_PORT || 1883;
const mqttUsername = process.env.USERNAME || 'demo';
const mqttPassword = process.env.PASSWORD || 'pass';
const kkHost = process.env.KAFKA_HOST || 'localhost:9092';
const kkTopic = process.env.KAFKA_TOPIC || 'mqtt';

const Producer = kafka.Producer,
    kafkaClient = new kafka.KafkaClient({
        kafkaHost: kkHost,
        connectTimeout: 100,
    }),
    producer = new Producer(kafkaClient);

const authenticate = function (client, username, password, callback) {

    username = username || '';
    password = password || '';

    if (username.normalize() == mqttUsername.normalize() && password.normalize() == mqttPassword.normalize()) {
        client.user = username;
        callback(null, true);
    } else {
        log.error('Auth error, username:' + username);
        var error = new Error('Auth error');
        callback(error, false);
    }
};

const published = function (packet, client, callback) {

    if (packet.topic.indexOf('$SYS') >= 0) {
        callback(null);
        return;
    }
    log.info('published, payload:' + packet.payload.toString("UTF-8"));
    var message = packet.payload.toString("UTF-8");
    try {
        message = JSON.parse(message);
    } catch (error) {
        log.error("parse error", message, error);
    }
    var kafkaPayload = {
        topic: packet.topic,
        ts: Date.now(),
        data: message
    };

    const payloads = [{
        topic: kkTopic,
        messages: JSON.stringify(kafkaPayload)
    }];

    sendKafkaMessage(payloads, callback);
};

function sendKafkaMessage(payloads, callback) {

    producer.send(payloads, function (err, res) {
        if (err) {
            log.error("kafka_producer_send_failure(payloads->" + payloads.toString() + "):" + err);
            var error = new Error('Kafka Produce Send Error:' + err);
            callback(error);
        } else {
            log.info('kafka message sent', res);
            callback(null);
        }
    });
}

producer.on('ready', function () {
    log.info('Apache Kafka Producer connected');
});
producer.on('error', function (err) {
    log.error('Apache Kafka Producer error occured:', err);
});

aedes = new aedes({
    authenticate,
    published
});
const server = net.createServer(aedes.handle);
server.listen(mqttPort, function () {
    log.info('server started and listening on port ', mqttPort);
});
server.on('ready', function () {
    log.info('Simple plain MQTT server is up and running');
});