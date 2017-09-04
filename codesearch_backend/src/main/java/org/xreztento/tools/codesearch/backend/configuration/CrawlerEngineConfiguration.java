package org.xreztento.tools.codesearch.backend.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.xreztento.tools.codesearch.backend.crawler.CrawlerEngine;
import org.xreztento.tools.codesearch.backend.crawler.InternalCrawlerEngine;
import org.xreztento.tools.codesearch.backend.crawler.impl.CrawlerEngineImpl;

import java.util.Map;

@Configuration
@ComponentScan(basePackages = { "org.xreztento.tools.codesearch.backend.crawler.plugin" })
public class CrawlerEngineConfiguration {

    @Autowired
    private ApplicationContext applicationContext;
    @Bean
    @ConditionalOnMissingBean(name = "codeSearchEngineBean")
    public CrawlerEngine getEngineService() {
        CrawlerEngineImpl crawlerEngineImpl = new CrawlerEngineImpl();

        Map<String, InternalCrawlerEngine> map = applicationContext.getBeansOfType(InternalCrawlerEngine.class);
        map.forEach((k, v) -> {
            if (v.getClass().getPackage().getName().equals("org.xreztento.tools.codesearch.backend.crawler.plugin")) {
                crawlerEngineImpl.addInternalCrawlerEngine(v);
                System.out.println("Loading CrawlerEngine " + v.getClass().getName());
            }
        });

        return crawlerEngineImpl;
    }
}
