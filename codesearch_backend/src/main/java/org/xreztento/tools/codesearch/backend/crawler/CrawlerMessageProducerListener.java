package org.xreztento.tools.codesearch.backend.crawler;

import org.apache.hadoop.hbase.TableName;
import org.springframework.beans.factory.annotation.Autowired;
import org.xreztento.tools.codesearch.backend.crawler.common.CrawlerMessage;
import org.xreztento.tools.codesearch.backend.crawler.common.CrawlerMessageProducer;
import org.xreztento.tools.codesearch.backend.crawler.common.CrawlerMessageType;
import org.xreztento.tools.codesearch.backend.hbase.HBaseTemplate;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class CrawlerMessageProducerListener implements ServletContextListener {
    @Autowired
    private CrawlerMessageProducer producer;

    @Autowired
    private HBaseTemplate template;

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        CrawlerMessage message = new CrawlerMessage();
        message.setType(CrawlerMessageType.REPOSITORY);
        message.setContent("{}");
        producer.sendMessage(message);
        producer.sendMessage(message);
        producer.sendMessage(message);
        producer.sendMessage(message);
        producer.sendMessage(message);
        template.put(TableName.valueOf("RepositoryInfo"), "1".getBytes(), "Repository".getBytes(), "name".getBytes(), "codesearch".getBytes());
        template.put(TableName.valueOf("RepositoryInfo"), "1".getBytes(), "Owner".getBytes(), "username".getBytes(), "xreztento".getBytes());
        try {
            template.destroy();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }
}
