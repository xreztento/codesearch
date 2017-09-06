package org.xreztento.tools.codesearch.backend.crawler.common;


import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import org.xreztento.tools.codesearch.backend.crawler.Repository;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Component
@RabbitListener(queues = {"Repository"})
public class CrawlerRepositoryMessageConsumer {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final static int WAITING_TIME = 1000;
    private ExecutorService service = Executors.newFixedThreadPool(CrawlerDownloaderObjectPoolManager.DEFAULT_DOWNLOAD_THREAD_NUM);
    private CrawlerDownloaderObjectPool pool = CrawlerDownloaderObjectPoolManager.getPool();

    @RabbitHandler
    public void process(String message) throws InterruptedException {
        logger.info("Receiver : " + message);
        while(true){
            if(pool.getNumActive() < CrawlerDownloaderObjectPoolManager.DEFAULT_DOWNLOAD_THREAD_NUM
                    && message != null){
                logger.info("borrow from " + pool.getNumActive());

                try {
                    Gson gson = new Gson();
                    Repository repository = gson.fromJson(message, Repository.class);
                    service.execute(new DownloadTaskWithResult(pool.borrowObject(), repository));
                } catch (Exception e) {
                    e.printStackTrace();
                }
                break;
            }

            try {
                Thread.sleep(WAITING_TIME);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

        }

    }

    class DownloadTaskWithResult implements Runnable {
        CrawlerDownloader downloader = null;
        Repository repository = null;

        public DownloadTaskWithResult(CrawlerDownloader downloader, Repository repository){
            this.downloader = downloader;
            this.repository = repository;
        }
        @Override
        public void run() {
            try {
                this.downloader.run(this.repository);
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if(this.downloader != null){
                    logger.info("return Object!");
                    logger.info("return to " + pool.getNumActive());
                    pool.returnObject(this.downloader);
                }
            }
        }
    }
}
