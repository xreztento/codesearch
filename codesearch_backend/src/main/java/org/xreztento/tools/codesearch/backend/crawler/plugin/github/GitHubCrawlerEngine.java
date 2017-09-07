package org.xreztento.tools.codesearch.backend.crawler.plugin.github;

import com.google.gson.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.xreztento.tools.codesearch.backend.crawler.InternalCrawlerEngine;
import org.xreztento.tools.codesearch.backend.crawler.common.CrawlerMessage;
import org.xreztento.tools.codesearch.backend.crawler.common.CrawlerMessageProducer;
import org.xreztento.tools.codesearch.backend.crawler.common.CrawlerMessageType;
import org.xreztento.tools.codesearch.backend.crawler.plugin.github.type.GitHubTypeMapper;
import org.xreztento.tools.codesearch.backend.crawler.plugin.github.type.Repositories;
import org.xreztento.tools.codesearch.backend.crawler.plugin.github.type.Repository;
import org.xreztento.tools.codesearch.backend.redis.RedisRepository;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;
import java.net.URISyntaxException;

@Service("gitHubCrawlerEngineBean")
//@Scope("singleton")
public class GitHubCrawlerEngine implements InternalCrawlerEngine {
    private GitHubCrawlerThread thread = new GitHubCrawlerThread();

    @Autowired
    private RedisRepository redisRepository;

    @Autowired
    private CrawlerMessageProducer producer;

    @Override
    public void startCrawler() {
        System.out.println("Start github crawler......");
        //thread.start();
    }

    @Override
    public void stopCrawler() {
        thread.stopThread();
    }

    @Value("${crawler.engine.github.username}")
    private String username = null;

    @Value("crawler.engine.github.password")
    private String password = null;

    class GitHubCrawlerThread extends Thread {
        private volatile Thread linker = null;

        @Override
        public void start() {
            this.linker = new Thread(this);
            this.linker.start();
        }

        @Override
        public void run() {
            Thread thread = Thread.currentThread();
            int since = redisRepository.getGitHubRepositorySinceValue();
            GitHub gitHub = null;
            Gson gson = new GsonBuilder().registerTypeAdapter(Double.class, new JsonSerializer<Double>() {

                @Override
                public JsonElement serialize(Double src, Type typeOfSrc, JsonSerializationContext context) {
                    if (src == src.longValue())
                        return new JsonPrimitive(src.longValue());
                    return new JsonPrimitive(src);
                }
            }).create();
            if (username != null && !username.trim().equals("")) {
                try {
                    gitHub = GitHub.forBasicAuthenticationConnector(username, password);
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
            } else {
                gitHub = GitHub.forNoAuthenticationConnector();
            }


            while (record(linker) && thread == linker) {


                Repositories repositories = gitHub.getRepositories(since);
                since = repositories.getLink();
                for (Repository repository : repositories.getRepositories()) {
                    CrawlerMessage message = new CrawlerMessage();
                    message.setType(CrawlerMessageType.REPOSITORY);
                    GitHubTypeMapper mapper = new GitHubTypeMapper(gitHub);
                    org.xreztento.tools.codesearch.backend.crawler.Repository mappedRepo = mapper.mappingRepository(repository);
                    message.setContent(gson.toJson(mappedRepo));
                    producer.sendMessage(message);
                }


            }
        }

        private boolean record(Thread linker) {
            if (linker == null) {
                return false;
            }
            return true;
        }

        public void stopThread() {
            Thread tmpThread = this.linker;
            this.linker = null;
            if (tmpThread != null) {
                tmpThread.interrupt();
            }
        }
    }
}
