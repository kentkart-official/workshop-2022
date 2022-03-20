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
version: '3'

services:
  zookeeper:
    image: wurstmeister/zookeeper
    container_name: zookeeper
    ports:
      - "2181:2181"
  kafka:
    image: wurstmeister/kafka
    container_name: kafka
    ports:
      - "9092:9092"
    environment:
      KAFKA_ADVERTISED_HOST_NAME: localhost
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
```

### Kafka Sunucusunu Başlatma
[docker-compose](https://docs.docker.com/compose/reference/) komutunu kullanarak Kafka sunucusunu başlatalım:

```sh
$ docker-compose up -d
Creating network "kafka_default" with the default driver
Creating zookeeper ... done
Creating kafka     ... done
```
