package org.xreztento.tools.codesearch.backend.crawler;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.xreztento.tools.codesearch.backend.analyzer.hadoop.TestMapper;
import org.xreztento.tools.codesearch.backend.analyzer.hadoop.TestReducer;
import org.xreztento.tools.codesearch.backend.crawler.common.CrawlerMessage;
import org.xreztento.tools.codesearch.backend.crawler.common.CrawlerMessageProducer;
import org.xreztento.tools.codesearch.backend.crawler.common.CrawlerMessageType;
import org.xreztento.tools.codesearch.backend.hadoop.fs.FsShell;
import org.xreztento.tools.codesearch.backend.hadoop.mapreduce.JobRunner;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import java.io.IOException;

@WebListener
public class CrawlerEngineListener implements ServletContextListener {
    @Autowired
    private CrawlerEngine engine;

    @Autowired
    private JobRunner runner;

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {

                    runner.call();

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();
        //engine.startCrawler();

    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }
}
