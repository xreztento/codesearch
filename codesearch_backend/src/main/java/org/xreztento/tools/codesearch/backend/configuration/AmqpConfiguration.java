package org.xreztento.tools.codesearch.backend.configuration;

import com.rabbitmq.client.Channel;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.ChannelAwareMessageListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.xreztento.tools.codesearch.backend.crawler.common.CrawlerMessageType;

@Configuration
public class AmqpConfiguration {
    public static final String EXCHANGE = "crawler-exchange";

    @Value("${rabbitmq.host}")
    private String host = null;

    @Value("${rabbitmq.port}")
    private String port = null;

    @Value("${rabbitmq.username}")
    private String username = null;

    @Value("${rabbitmq.password}")
    private String password = null;

    @Value("${rabbitmq.virtualHost}")
    private String virtualHost = null;

    @Bean
    public ConnectionFactory connectionFactory() {
        CachingConnectionFactory connectionFactory = new CachingConnectionFactory();
        connectionFactory.setHost(host);
        connectionFactory.setPort(Integer.valueOf(port));
        connectionFactory.setUsername(username);
        connectionFactory.setPassword(password);
        connectionFactory.setVirtualHost(virtualHost);

        connectionFactory.setPublisherConfirms(true);
        return connectionFactory;
    }
    @Bean
    public Queue queue() {
        return new Queue(CrawlerMessageType.REPOSITORY.getTypeName(), true);
    }
    @Bean
    public DirectExchange defaultExchange() {
        return new DirectExchange(AmqpConfiguration.EXCHANGE);
    }
    @Bean
    public Binding binding() {
        return BindingBuilder.bind(queue()).to(defaultExchange()).with(CrawlerMessageType.REPOSITORY.getTypeName());
    }

//    @Bean
//    public SimpleMessageListenerContainer createMessageContainer(){
//        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer(connectionFactory());
//        container.setQueues(queue());
//        container.setExposeListenerChannel(true);
//        container.setMaxConcurrentConsumers(1);
//        container.setConcurrentConsumers(1);
//        container.setAcknowledgeMode(AcknowledgeMode.MANUAL);
//        container.setMessageListener(new ChannelAwareMessageListener() {
//
//            @Override
//            public void onMessage(Message message, Channel channel) throws Exception {
//                byte[] body = message.getBody();
//                System.out.println("receive msg : " + new String(body));
//                channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
//            }
//        });
//        return container;
//    }

}
