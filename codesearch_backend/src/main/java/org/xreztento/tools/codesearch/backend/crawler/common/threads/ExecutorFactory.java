package org.xreztento.tools.codesearch.backend.crawler.common.threads;


import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public final class ExecutorFactory {

    private static final ThreadFactory DEFAULT_THREAD_FACTORY = new CodeSearchThreadFactory("Codesearch-defaultThreadFactory", true);

    private ExecutorFactory() {
    }

    public static ThreadPoolExecutor newFixedThreadPool(int nThreads, int workQueueMaxSize, ThreadFactory threadFactory) {
        return new ThreadPoolExecutor(nThreads, nThreads, 0L, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<Runnable>(workQueueMaxSize), threadFactory);
    }

    public static ThreadPoolExecutor newFixedThreadPool(int nThreads, int workQueueMaxSize) {
        return newFixedThreadPool(nThreads, workQueueMaxSize, DEFAULT_THREAD_FACTORY);
    }

    public static ThreadPoolExecutor newFixedThreadPool(int nThreads, int workQueueMaxSize, String threadFactoryName, boolean daemon) {
        ThreadFactory threadFactory = new CodeSearchThreadFactory(threadFactoryName, daemon);
        return newFixedThreadPool(nThreads, workQueueMaxSize, threadFactory);
    }

}
