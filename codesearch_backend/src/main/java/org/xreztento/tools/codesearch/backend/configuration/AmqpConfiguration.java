package org.xreztento.tools.codesearch.backend.configuration;

import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AmqpConfiguration {
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
}
