package org.xreztento.tools.codesearch.backend.crawler.plugin.github;

import com.google.common.collect.Lists;
import com.google.gson.Gson;
import org.apache.http.Header;
import org.apache.http.client.methods.HttpRequestBase;
import org.json.JSONArray;
import org.xreztento.tools.codesearch.backend.crawler.common.CrawlerConnector;
import org.xreztento.tools.codesearch.backend.crawler.common.CrawlerResponseData;
import org.xreztento.tools.codesearch.backend.crawler.utils.StringUtils;

import java.lang.reflect.Array;
import java.net.URISyntaxException;
import java.util.List;


public class GitHubAPIRequester {

    private final static int TRY_COUNT = 10;
    private final static int TRY_DELAY = 1000;
    private GitHub gitHub = null;

    public GitHubAPIRequester(GitHub gitHub){
        this.gitHub = gitHub;
    }

    public <T> T[] requestObjects(HttpRequestBase method, GitHubAPIResult gitHubAPIResult, Class<T> clazz) throws URISyntaxException {
        List<T> list = null;

        requestResult(method, gitHubAPIResult);
        String array = gitHubAPIResult.getContent();
        Gson gson = new Gson();
        JSONArray jsonArray = new JSONArray(array);
        int length = jsonArray.length();
        list = Lists.newArrayListWithCapacity(length);
        for (int i = 0; i < length; i++) {
            T result = gson.fromJson(jsonArray.getJSONObject(i).toString(), clazz);
            list.add(result);
        }
        return list.toArray((T[])Array.newInstance(clazz, 0));

    }

    public <T> T requestObject(HttpRequestBase method, GitHubAPIResult gitHubAPIResult, Class<T> clazz) throws URISyntaxException{
        requestResult(method, gitHubAPIResult);
        Gson gson = new Gson();
        T result = gson.fromJson(gitHubAPIResult.getContent(), clazz);
        return result;
    }

    public void requestResult(HttpRequestBase method, GitHubAPIResult result) throws URISyntaxException{

        Header header = gitHub.getAuthHeader();
        int count = 0;
        if(header != null){
            method.setHeader(header);
        }

        CrawlerResponseData data = CrawlerConnector.execute(method);
        while(data.getStatusCode() != 200 && count < TRY_COUNT){
            try {
                Thread.sleep(TRY_DELAY);
                count++;
                data = CrawlerConnector.execute(method);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

        }

        if(data != null){
            result.setStatusCode(data.getStatusCode());
            result.setContent(data.getResponseEntity());
            result.setXRateLimit_Limit(Integer.valueOf(data.getResponseHeader().get("X-RateLimit-Limit")));
            result.setXRateLimit_Remaining(Integer.valueOf(data.getResponseHeader().get("X-RateLimit-Limit")));
            result.setXRateLimit_Limit(Integer.valueOf(data.getResponseHeader().get("X-RateLimit-Remaining")));
            result.setXRateLimit_Reset(Long.valueOf(data.getResponseHeader().get("X-RateLimit-Reset")));
            result.setSince(Integer.valueOf(StringUtils.getRangeStringByEdge(data.getResponseHeader().get("Link"), "since=", ">;", 0)));
        }
    }
}
