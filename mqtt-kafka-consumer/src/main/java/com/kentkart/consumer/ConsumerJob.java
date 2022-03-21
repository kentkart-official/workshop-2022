package com.kentkart.consumer;

import java.util.concurrent.TimeUnit;
import org.apache.flink.api.common.eventtime.WatermarkStrategy;
import org.apache.flink.api.common.restartstrategy.RestartStrategies;
import org.apache.flink.api.common.serialization.SimpleStringSchema;
import org.apache.flink.connector.kafka.source.KafkaSource;
import org.apache.flink.streaming.api.datastream.DataStreamSource;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.windowing.time.Time;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ConsumerJob {

  private static final Logger LOG = LoggerFactory.getLogger(ConsumerJob.class);

  public static void main(String[] args) {

    try {
      final StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
      env.setRestartStrategy(
          RestartStrategies.fixedDelayRestart(3, Time.of(10, TimeUnit.SECONDS).toMilliseconds()));

      KafkaSource<String> source = KafkaSource.<String>builder()
          .setBootstrapServers("localhost:9092").setTopics("mqtt").setGroupId("mqtt-group-test")
          .setValueOnlyDeserializer(new SimpleStringSchema()).build();

      DataStreamSource<String> stream =
          env.fromSource(source, WatermarkStrategy.noWatermarks(), "Kafka Source");

      stream.print();

      env.execute("ConsumerJob");

    } catch (Exception e) {
      LOG.error("job error:{}", e.getMessage());
    }
  }

}
