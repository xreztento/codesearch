package org.xreztento.tools.codesearch.backend.crawler;

import org.springframework.beans.factory.annotation.Autowired;
import org.xreztento.tools.codesearch.backend.crawler.common.CrawlerMessage;
import org.xreztento.tools.codesearch.backend.crawler.common.CrawlerMessageProducer;
import org.xreztento.tools.codesearch.backend.crawler.common.CrawlerMessageType;
import org.xreztento.tools.codesearch.backend.hadoop.fs.FsShell;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import java.io.IOException;

@WebListener
public class CrawlerEngineListener implements ServletContextListener {
    @Autowired
    private CrawlerEngine engine;

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        engine.startCrawler();
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }
}
