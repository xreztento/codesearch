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

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        CrawlerMessage message = new CrawlerMessage();
        message.setType(CrawlerMessageType.REPOSITORY);
        message.setContent("{}");
        producer.sendMessage(message);
        producer.sendMessage(message);

    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }
}
