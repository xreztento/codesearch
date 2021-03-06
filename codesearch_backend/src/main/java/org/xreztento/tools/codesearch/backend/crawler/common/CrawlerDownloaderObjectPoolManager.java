package org.xreztento.tools.codesearch.backend.crawler.common;
import org.apache.commons.pool2.impl.GenericObjectPoolConfig;

public class CrawlerDownloaderObjectPoolManager {

    public final static int DEFAULT_DOWNLOAD_THREAD_NUM = 5;
    
    private static CrawlerDownloaderObjectPool pool = null;

    private CrawlerDownloaderObjectPoolManager(){}

    public static CrawlerDownloaderObjectPool getPool(){
        if(pool == null){
            GenericObjectPoolConfig config = new GenericObjectPoolConfig();
            config.setMaxIdle(0);
            config.setMaxTotal(DEFAULT_DOWNLOAD_THREAD_NUM);

            pool = new CrawlerDownloaderObjectPool(new CrawlerDownloaderObjectPoolableConnectionFactory(), config);
        }
        return pool;
    }
}
