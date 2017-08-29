package org.xreztento.tools.codesearch.backend.crawler.common;


import org.apache.commons.pool2.BasePooledObjectFactory;
import org.apache.commons.pool2.PooledObject;
import org.apache.commons.pool2.impl.DefaultPooledObject;


public class CrawlerDownloaderObjectPoolableConnectionFactory extends BasePooledObjectFactory<CrawlerDownloader> {
    public CrawlerDownloaderObjectPoolableConnectionFactory(){
        super();
    }

    @Override
    public CrawlerDownloader create() throws Exception {
        CrawlerDownloader downloader = new CrawlerDownloader();
        return downloader;
    }

    @Override
    public PooledObject<CrawlerDownloader> wrap(CrawlerDownloader downloader) {
        return new DefaultPooledObject<CrawlerDownloader>(downloader);
    }

}
