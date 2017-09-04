package org.xreztento.tools.codesearch.backend.crawler.plugin.github;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xreztento.tools.codesearch.backend.crawler.InternalCrawlerEngine;
import org.xreztento.tools.codesearch.backend.crawler.plugin.github.type.Repositories;
import org.xreztento.tools.codesearch.backend.crawler.plugin.github.type.Repository;
import org.xreztento.tools.codesearch.backend.redis.RedisRepository;

import java.net.URISyntaxException;

@Service("gitHubCrawlerEngineBean")
public class GitHubCrawlerEngine implements InternalCrawlerEngine {
    private GitHubCrawlerThread thread = new GitHubCrawlerThread();

    @Autowired
    private RedisRepository redisRepository;

    @Override
    public void startCrawler() {
        thread.start();
    }

    @Override
    public void stopCrawler() {
        thread.stopThread();
    }



    class GitHubCrawlerThread extends Thread{
        private volatile Thread linker = null;

        @Override
        public void start(){
            this.linker = new Thread(this);
            this.linker.start();
        }

        @Override
        public void run(){
            Thread thread = Thread.currentThread();
            int since = redisRepository.getGitHubRepositorySinceValue();

            while (record(linker) && thread == linker){
                GitHub gitHub = GitHub.forNoAuthenticationConnector();
                try {
                    Repositories repositories = gitHub.getRepositories(since);
                    since = repositories.getLink();
                    for(Repository repository : repositories.getRepositories()){

                    }

                } catch (URISyntaxException e) {
                    e.printStackTrace();
                }
            }
        }

        private boolean record(Thread linker){
            if(linker == null){
                return false;
            }
            return true;
        }

        public void stopThread(){
            Thread tmpThread = this.linker;
            this.linker = null;
            if(tmpThread != null){
                tmpThread.interrupt();
            }
        }
    }
}
