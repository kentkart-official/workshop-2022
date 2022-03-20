# mqtt-kafka-proxy

Iot verilerinin mqtt protokolü ile Apache Kafka'ya gönderilmesini sağlayan sunucu uygulaması. Mqtt protokolünün implemenatasyonu [aedes](https://github.com/moscajs/aedes) kütüphanesiyle yapıldı. 

Projeyi kendi makinenize indirerek node uygulaması olarak çalıştırabilirsiniz ya da docker üzerinden kurulumunu yapabilirsiniz. Docker kurulumuna [buradan](https://hub.docker.com/r/barankaya/mqtt-kafka-proxy) bakabilirsiniz.

> Uygulama içerisinde kullanılan teknolojiler;

### [MQTT](https://mqtt.org/) 
MQTT (Message Queuing Telemetry Transport) düşük bant genişliği olan, gecikme süresi yüksek olan veya güvenilir olmayan ağlar ve kısıtlı cihazlar için tasarlanmış son derece basit ve hafif bir mesajlaşma protokolüdür. Tasarım ilkeleri, ağ bant genişliğini ve cihaz kaynak gereksinimlerini en aza indirirken güvenilirlik ve teslimat güvencesi sağlamaya çalışır. Bu ilkeler aynı zamanda MQTT protokolünü, `makineden makineye (M2M)` veya `Nesnelerin İnterneti (IoT)` dünyası için ideal hale getirmektedir.

Uygulama default olarak `1883` portundan çalışmaktadır.

### [Apache Kafka](https://kafka.apache.org/)
Apache Kafka, dağıtılmış ve hataya dayanıklı bir akış işleme sistemidir.

Uygulamamız çalışmaya başladığında default olarak `localhost:9092` de kurulmuş bir Apache Kafka sunucusuna bağlanmaya çalışmaktadır. Kafka kurulumuna [buradan](https://github.com/kentkart-official/workshop-2022/blob/main/apache-kafka/README.md) bakabilirsiniz. Bağlanmak istediğiniz başka bir kafka var ise `KAFKA_HOST` parametresinden değiştirebilirsiniz.

### [Node.js](https://nodejs.org/en/)
Node.js, JavaScript ile server side uygulamalar yazabileceğimiz, Javascript Runtime platformudur.

Kodu indirdiğinizde sırasıyla aşağıdaki komutları kullanarak uygulamayı çalıştırabilirsiniz;

```sh
npm install

node app.js
```
