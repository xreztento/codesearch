package org.xreztento.tools.codesearch.backend.crawler.common;


import com.rabbitmq.client.Channel;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.ChannelAwareMessageListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.xreztento.tools.codesearch.backend.configuration.AmqpConfiguration;

import java.util.concurrent.Callable;
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;

@Component
@RabbitListener(queues = {"Repository"})
public class CrawlerMessageConsumer {
    private ExecutorService service = Executors.newFixedThreadPool(2);
    private CrawlerDownloaderObjectPool pool = CrawlerDownloaderObjectPoolManager.getPool();

    @RabbitHandler
    public void process(String message) throws InterruptedException {
        System.out.println("Receiver : " + message);
        while(true){
            if(pool.getNumActive() < 2 && message != null){
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
