import { UserEntity } from "domain/entities";
import { producer } from "../index";

export default async (data: UserEntity) => {
    try {
        console.log('Kafka data producer running', data);

        await producer.connect()

        let topic: string;
        let key: string;

        if (data.role === 'user') {
            console.log('inside user created role')
            topic = 'user-service-topic';
            key = 'user_created';
        } else if (data.role === 'company') {
            console.log('inside company created role')
            topic = 'company-service-topic';
            key = 'company_created';
        } else {
            throw new Error(`Unknown role: ${data.role}`);
        }

        const message = [{
            topic: topic,
            messages: [{
                key: key,
                value: JSON.stringify(data),
            }],
        }];
        console.log('Data message is created');
        await producer.sendBatch({ topicMessages: message });
        console.log('Producer sent', message);

    } catch (error) {
        console.error('Kafka producer error', error);
        throw error;
    } finally {
        await producer.disconnect(); 
    }
};
