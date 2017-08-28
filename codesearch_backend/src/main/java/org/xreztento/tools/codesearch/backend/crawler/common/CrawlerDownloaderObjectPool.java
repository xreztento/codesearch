package org.xreztento.tools.codesearch.backend.crawler.common;


import org.apache.commons.pool2.PooledObjectFactory;
import org.apache.commons.pool2.impl.GenericObjectPool;
import org.apache.commons.pool2.impl.GenericObjectPoolConfig;

public class CrawlerDownloaderObjectPool extends GenericObjectPool<CrawlerDownloader> {
    public CrawlerDownloaderObjectPool(PooledObjectFactory<CrawlerDownloader> factory, GenericObjectPoolConfig config){
        super(factory, config);
    }
}
