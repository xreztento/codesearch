package org.xreztento.tools.codesearch.backend.crawler.impl;

import org.springframework.stereotype.Service;
import org.xreztento.tools.codesearch.backend.crawler.CrawlerEngine;
@Service("emptyCrawlerEngineBean")
public class EmptyCrawlerEngine implements CrawlerEngine{
    @Override
    public void startCrawler() {

    }

    @Override
    public void stopCrawler() {

    }
}
