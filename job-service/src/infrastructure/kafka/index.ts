import { Kafka,Producer,Consumer } from "kafkajs";

const kafka=new Kafka({
    clientId:'job-service',
    brokers:['kafka:9093'],  
})

export const producer:Producer=kafka.producer()
export const consumer:Consumer=kafka.consumer({
    groupId:'job-service-kafka-group'
})