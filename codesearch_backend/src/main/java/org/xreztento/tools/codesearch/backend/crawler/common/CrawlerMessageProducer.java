package org.xreztento.tools.codesearch.backend.crawler.common;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.support.CorrelationData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.xreztento.tools.codesearch.backend.configuration.AmqpConfiguration;

import java.util.UUID;

@Component
public class CrawlerMessageProducer implements RabbitTemplate.ConfirmCallback{
    private RabbitTemplate rabbitTemplate;

    @Autowired
    public CrawlerMessageProducer(RabbitTemplate rabbitTemplate){
        this.rabbitTemplate = rabbitTemplate;
        rabbitTemplate.setConfirmCallback(this);
    }
    public void sendMessage(CrawlerMessage message) {
        CorrelationData correlationId = new CorrelationData(UUID.randomUUID().toString());
        rabbitTemplate.convertAndSend("",  message.getType().getTypeName(), message.getContent(), correlationId);
    }

    @Override
    public void confirm(CorrelationData correlationData, boolean ack, String cause) {
        if (ack) {
            System.out.println("Message send success!");
        } else {
            System.out.println("Message send error:" + cause);
        }
    }
}
