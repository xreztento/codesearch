package org.xreztento.tools.codesearch.backend.crawler.plugin.github;

import com.google.gson.Gson;
import org.apache.http.Header;
import org.apache.http.client.methods.HttpRequestBase;
import org.json.JSONArray;
import org.json.JSONObject;
import org.xreztento.tools.codesearch.backend.crawler.common.APIResponseData;
import org.xreztento.tools.codesearch.backend.crawler.common.Connector;
import org.xreztento.tools.codesearch.backend.crawler.utils.StringUtils;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;


public class GitHubAPIRequester {

    private final static int TRY_COUNT = 10;
    private GitHub gitHub = null;

    public GitHubAPIRequester(GitHub gitHub){
        this.gitHub = gitHub;
    }

    public <T> Object[] requestObjects(HttpRequestBase method, GitHubResult gitHubResult, Class<T> clazz) throws URISyntaxException {
        List<Object> list = null;

        requestResult(method, gitHubResult);
        String array = gitHubResult.getContent();
        Gson gson = new Gson();
        JSONArray jsonArray = new JSONArray(array);
        int length = jsonArray.length();
        list = new ArrayList<Object>(length);
        for (int i = 0; i < length; i++) {
            Object result = gson.fromJson(jsonArray.getJSONObject(i).toString(), clazz);
            list.add(result);
        }
        return list.toArray();

    }

    public Object requestObject(HttpRequestBase method, Class<? extends GitHubResult> clazz) throws URISyntaxException{
        return null;
    }

    public void requestResult(HttpRequestBase method, GitHubResult result) throws URISyntaxException{

        Header header = gitHub.getAuthHeader();
        int count = 0;
        if(header != null){
            method.setHeader(header);
        }

        APIResponseData data = Connector.execute(method);
        while(data.getStatusCode() != 200 && count < TRY_COUNT){
            count++;
            data = Connector.execute(method);
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
