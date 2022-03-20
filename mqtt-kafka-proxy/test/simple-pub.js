const mqtt = require('mqtt');

var options = {
    protocol: "mqtt",
    port: 1883,
    host: 'localhost',
    username: 'user',
    password: 'pass',
};

/*client connection*/
const client = mqtt.connect(options);
client.on('connect', function () {
    const message = [{
            "ts": 1643956051,
            "sensor_id": 1,
            "data": {
                "raw_pressure": 123,
                "raw_temperature": 234
            }
        },
        {
            "ts": 1643956051,
            "sensor_id": 2,
            "data": {
                "iaq": 200,
                "static_iaq": 12,
                "e-co2": 123.3
            }
        }
    ];
    const opt = {
        qos: 1
    };
    client.publish('123432/telemetries', JSON.stringify(message), opt, function (err) {
        if (err) {
            console.log('publish error:' + err);
        } else {
            console.log('publish end');
        }
        client.end();
    });
});

client.on('error', function (err) {
    console.error('Client error:', err);
});
