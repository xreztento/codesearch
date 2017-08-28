package org.xreztento.tools.codesearch.backend.crawler.common;


import org.apache.commons.pool2.impl.GenericObjectPoolConfig;

public class CrawlerDownloaderObjectPoolManager {
    private CrawlerDownloaderObjectPoolManager(){}
    private static CrawlerDownloaderObjectPool pool = null;
    public static CrawlerDownloaderObjectPool getPool(){
        if(pool == null){
            GenericObjectPoolConfig config = new GenericObjectPoolConfig();
            config.setMaxIdle(0);
            config.setMaxTotal(2);
            pool = new CrawlerDownloaderObjectPool(new CrawlerDownloaderObjectPoolableConnectionFactory(), config);
        }
        return pool;
    }
}
