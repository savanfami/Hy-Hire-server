import { Consumer,Kafka,Producer } from "kafkajs";



export const kafka =new Kafka({
    clientId:'notification-service',
    brokers:['kafka:9093'],  
})

export const producer:Producer=kafka.producer();
export const consumer:Consumer=kafka.consumer({
    groupId:'notification-service-kafka-group'
})