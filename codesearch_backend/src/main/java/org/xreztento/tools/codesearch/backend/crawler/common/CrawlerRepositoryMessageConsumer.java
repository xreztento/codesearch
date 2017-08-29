package org.xreztento.tools.codesearch.backend.crawler.common;


import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Component
@RabbitListener(queues = {"Repository"})
public class CrawlerRepositoryMessageConsumer {


    private ExecutorService service = Executors.newFixedThreadPool(CrawlerDownloaderObjectPoolManager.DEFAULT_DOWNLOAD_THREAD_NUM);
    private CrawlerDownloaderObjectPool pool = CrawlerDownloaderObjectPoolManager.getPool();

    @RabbitHandler
    public void process(String message) throws InterruptedException {
        System.out.println("Receiver : " + message);
        while(true){
            if(pool.getNumActive() < CrawlerDownloaderObjectPoolManager.DEFAULT_DOWNLOAD_THREAD_NUM
                    && message != null){
                System.out.println("borrow from " + pool.getNumActive());

                try {
                    service.execute(new DownloadTaskWithResult(pool.borrowObject()));
                } catch (Exception e) {
                    e.printStackTrace();
                }
                break;
            }

            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

        }

    }

    class DownloadTaskWithResult implements Runnable {
        CrawlerDownloader downloader = null;

        public DownloadTaskWithResult(CrawlerDownloader downloader){
            this.downloader = downloader;
        }
        @Override
        public void run() {
            try {
                this.downloader.download();
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if(this.downloader != null){
                    System.out.println("return Object!");
                    System.out.println("return to " + pool.getNumActive());
                    pool.returnObject(this.downloader);
                }
            }
        }
    }
}
