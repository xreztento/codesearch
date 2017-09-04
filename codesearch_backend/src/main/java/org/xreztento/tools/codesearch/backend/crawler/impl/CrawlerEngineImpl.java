package org.xreztento.tools.codesearch.backend.crawler.impl;


import com.google.common.collect.Lists;
import org.xreztento.tools.codesearch.backend.crawler.CrawlerEngine;
import org.xreztento.tools.codesearch.backend.crawler.InternalCrawlerEngine;

import java.util.List;

public class CrawlerEngineImpl implements CrawlerEngine{

    private final List<InternalCrawlerEngine> crawlerEngines = Lists.newArrayList();

    public synchronized void addInternalCrawlerEngine(InternalCrawlerEngine internalCrawlerEngine) {
        if (internalCrawlerEngine != null && !crawlerEngines.contains(internalCrawlerEngine)) {
            crawlerEngines.add(internalCrawlerEngine);
        }
    }

    public synchronized void removeInternalCodeSearchEngine(InternalCrawlerEngine internalCrawlerEngine) {
        if (internalCrawlerEngine != null && crawlerEngines.contains(internalCrawlerEngine)) {
            crawlerEngines.remove(internalCrawlerEngine);
        }
    }

    @Override
    public void startCrawler() {
        crawlerEngines.forEach(engine -> {
            engine.startCrawler();
        });
    }

    @Override
    public void stopCrawler() {
        crawlerEngines.forEach(engine -> {
            engine.stopCrawler();
        });
    }
}
