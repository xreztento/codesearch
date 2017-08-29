package org.xreztento.tools.codesearch.backend.crawler.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.support.CorrelationData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.xreztento.tools.codesearch.backend.configuration.AmqpConfiguration;

import java.util.UUID;

@Component
public class CrawlerMessageProducer implements RabbitTemplate.ConfirmCallback{


    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private RabbitTemplate rabbitTemplate;


    public CrawlerMessageProducer(RabbitTemplate rabbitTemplate){
        this.rabbitTemplate = rabbitTemplate;
        rabbitTemplate.setConfirmCallback(this);
    }
    public void sendMessage(CrawlerMessage message) {
        CorrelationData correlationId = new CorrelationData(UUID.randomUUID().toString());

        rabbitTemplate.convertAndSend(AmqpConfiguration.EXCHANGE,  message.getType().getTypeName(), message.getContent(), correlationId);
    }

    @Override
    public void confirm(CorrelationData correlationData, boolean ack, String cause) {
        if (ack) {
            logger.info("Message send success!");
        } else {
            logger.warn("Message send error:" + cause);
        }
    }
}
