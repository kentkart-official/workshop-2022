# Apache Kafka

[Apache Kafka](https://kafka.apache.org/), dağıtılmış ve hataya dayanıklı bir akış işleme sistemidir.

## Dosya sistemi ile kurulum

Apache Kafka'nın kendi [sitesinden](https://kafka.apache.org/quickstart) kurulum adımlarına bakabilirsiniz.

## Docker ile kurulum

Tek düğümlü bir Kafka broker kurulumu, yerel geliştirme ihtiyaçlarının çoğunu karşılayacaktır, bu yüzden bu basit kurulumu öğrenerek başlayalım.

### *docker-compose.yml* Yapılandırma

Bir Apache Kafka sunucusu başlatmak için önce bir Zookeeper sunucusu başlatmamız gerekir.

Bu bağımlılığı, Zookeeper sunucusunun her zaman Kafka sunucusundan önce başlayıp ondan sonra durmasını sağlayacak bir docker-compose.yml dosyasında yapılandırabiliriz.

```sh
version: '3.4'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    ports:
      - 2181:2181
  
  kafka:
    image: confluentinc/cp-kafka:latest
    depends_on:
      - zookeeper
    ports:
      - 9092:9092
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092,PLAINTEXT_HOST://localhost:9092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
```

Kullanılan image detaylarına aşağıdaki adreslerden ulaşabilirsiniz;
* [cp-zookeeper](https://hub.docker.com/r/confluentinc/cp-zookeeper)
* [cp-kafka](https://hub.docker.com/r/confluentinc/cp-kafka)

### Kafka Sunucusunu Başlatma
[docker-compose](https://docs.docker.com/compose/reference/) komutunu kullanarak Kafka sunucusunu başlatalım:

```sh
$ docker-compose up -d
Creating network "kafka_default" with the default driver
Creating kafka_zookeeper_1 ... done
Creating kafka_kafka_1     ... done
```
