# mqtt-kafka-consumer

Apache Kafka'daki consume eden uygulama. Apache Flink üzerinde çalışacak job yazılmıştır. Örnek olarak aşağıdaki kod bloğunu inceleyelim;

### *Flink Stream Execution Oluşturma*

```sh
final StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
env.setRestartStrategy(RestartStrategies.fixedDelayRestart(3, Time.of(10, TimeUnit.SECONDS).toMilliseconds()));
```

### *Kafka Source Tanımlama*

```sh
KafkaSource<String> source = KafkaSource.<String>builder()
          .setBootstrapServers("localhost:9092")
          .setTopics("mqtt")
          .setGroupId("mqtt-group-test")
          .setValueOnlyDeserializer(new SimpleStringSchema())
          .build();
```

### *Kafka Sorucedan Veriyi Stream'e Çevirme*

```sh
DataStreamSource<String> stream = env.fromSource(source, WatermarkStrategy.noWatermarks(), "Kafka Source");
stream.print();
```

Gelen stream verisini console'a yazdırdık. Bunun yerine herhangi bir bir depolama birimine (veritabanı, dosya sistemi vb.) sink edebiliriz. 
