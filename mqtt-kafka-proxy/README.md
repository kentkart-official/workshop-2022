# mqtt-kafka-proxy

Iot verilerinin mqtt protokolü ile Apache Kafka'ya gönderilmesini sağlayan sunucu uygulaması. Mqtt protokolünün implemenatasyonu [aedes](https://github.com/moscajs/aedes) kütüphanesiyle yapıldı. 

Projeyi kendi makinenize indirerek node uygulaması olarak çalıştırabilirsiniz ya da docker üzerinden kurulumunu yapabilirsiniz. Docker kurulumuna [buradan](https://hub.docker.com/repository/docker/barankaya/mqtt-kafka-proxy) bakabilirsiniz.

> Uygulama içerisinde kullanılan teknolojiler;

### [MQTT](https://mqtt.org/) 
MQTT (Message Queuing Telemetry Transport) düşük bant genişliği olan, gecikme süresi yüksek olan veya güvenilir olmayan ağlar ve kısıtlı cihazlar için tasarlanmış son derece basit ve hafif bir mesajlaşma protokolüdür. Tasarım ilkeleri, ağ bant genişliğini ve cihaz kaynak gereksinimlerini en aza indirirken güvenilirlik ve teslimat güvencesi sağlamaya çalışır. Bu ilkeler aynı zamanda MQTT protokolünü, `makineden makineye (M2M)` veya `Nesnelerin İnterneti (IoT)` dünyası için ideal hale getirmektedir.

Uygulama default olarak `1883` portundan çalışmaktadır.

### [Apache Kafka](https://kafka.apache.org/)
Apache Kafka, binlerce şirket tarafından yüksek performanslı data pipelines, akış analizi, data entegrasyon ve kritik görev uygulamaları için kullanılan açık kaynaklı bir dağıtılmış olay akışı platformudur.

Uygulamamız çalışmaya başladığında default olarak `localhost:9092` de kurulmuş bir Apache Kafka sunucusuna bağlanmaya çalışmaktadır. Kafka kurulumuna [buradan]() bakabilirsiniz. Bağlanmak istediğiniz başka bir kafka var ise `KAFKA_HOST` parametresinden değiştirebilirsiniz.

### [Node.js](https://nodejs.org/en/)
Node.js, JavaScript ile server side uygulamalar yazabileceğimiz, Javascript Runtime platformudur.

Kodu indirdiğinizde sırasıyla aşağıdaki komutları kullanarak uygulamayı çalıştırabilirsiniz;

```sh
npm install

node app.js
```
