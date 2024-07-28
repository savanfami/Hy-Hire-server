import { Kafka,Producer,Consumer } from "kafkajs";

const kafka=new Kafka({
    clientId:'auth-service',
    brokers:['localhost:9092'],  
})

export const producer:Producer=kafka.producer()
export const consumer:Consumer=kafka.consumer({
    groupId:'auth-service-kafka-group'
})