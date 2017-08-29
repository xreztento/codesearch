package org.xreztento.tools.codesearch.backend.hbase;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.TableName;
import org.apache.hadoop.hbase.client.Connection;
import org.apache.hadoop.hbase.client.ConnectionFactory;
import org.apache.hadoop.hbase.client.Table;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.DisposableBean;
import org.xreztento.tools.codesearch.backend.crawler.common.threads.ExecutorFactory;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;


public class PooledHTableFactory implements TableFactory, DisposableBean {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public static final int DEFAULT_POOL_SIZE = 256;
    public static final int DEFAULT_WORKER_QUEUE_SIZE = 1024*5;
    public static final boolean DEFAULT_PRESTART_THREAD_POOL = false;

    private final ExecutorService executor;
    private final Connection connection;


    public PooledHTableFactory(Configuration config) {
        this(config, DEFAULT_POOL_SIZE, DEFAULT_WORKER_QUEUE_SIZE, DEFAULT_PRESTART_THREAD_POOL);
    }

    public PooledHTableFactory(Configuration config, int poolSize, int workerQueueSize, boolean prestartThreadPool) {
        this.executor = createExecutorService(poolSize, workerQueueSize, prestartThreadPool);
        try {
            this.connection = ConnectionFactory.createConnection(config, executor);
        } catch (IOException e) {
            throw new HBaseSystemException(e);
        }
    }

    public Connection getConnection() {
        return connection;
    }

    private ExecutorService createExecutorService(int poolSize, int workQueueMaxSize, boolean prestartThreadPool) {

        logger.info("create HConnectionThreadPoolExecutor poolSize:{}, workerQueueMaxSize:{}", poolSize, workQueueMaxSize);

        ThreadPoolExecutor threadPoolExecutor = ExecutorFactory.newFixedThreadPool(poolSize, workQueueMaxSize, "Codesearch-HConnectionExecutor", true);
        if (prestartThreadPool) {
            logger.info("prestartAllCoreThreads");
            threadPoolExecutor.prestartAllCoreThreads();
        }

        return threadPoolExecutor;
    }


    @Override
    public Table getTable(TableName tableName) {
        try {
            return connection.getTable(tableName, executor);
        } catch (IOException e) {
            throw new HBaseSystemException(e);
        }
    }

    @Override
    public void releaseTable(Table table) {
        if (table == null) {
            return;
        }

        try {
            table.close();
        } catch (IOException e) {
            throw new HBaseSystemException(e);
        }
    }


    @Override
    public void destroy() throws Exception {
        logger.info("PooledHTableFactory.destroy()");
        
        if (connection != null) {
            try {
                this.connection.close();
            } catch (IOException e) {
                logger.warn("Connection.close() error:" + e.getMessage(), e);
            }
        }

        if (this.executor != null) {
            this.executor.shutdown();
            try {
                final boolean shutdown = executor.awaitTermination(1000 * 5, TimeUnit.MILLISECONDS);
                if (!shutdown) {
                    final List<Runnable> discardTask = this.executor.shutdownNow();
                    logger.warn("discard task size:{}", discardTask.size());
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }
}
