package org.xreztento.tools.codesearch.backend.crawler.plugin.github;


import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.CloseableHttpClient;
import org.xreztento.tools.codesearch.backend.crawler.common.http.HttpClientFactory;
import org.xreztento.tools.codesearch.backend.crawler.plugin.github.type.Repository;
import org.xreztento.tools.codesearch.backend.crawler.utils.StringUtils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;


public class GitHubRepoPageProcessor {
    private static final BasicResponseHandler BASIC_RESPONSE_HANDLER = new BasicResponseHandler();


    public static void process(Repository repository){
        CloseableHttpClient httpClient = null;
        String response = null;
        try {
            httpClient = HttpClientFactory.getHttpClient();
            HttpGet get = new HttpGet(repository.getHtml_url());

            response = httpClient.execute(get, BASIC_RESPONSE_HANDLER);


        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {

            if(null != httpClient){
                try {
                    httpClient.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private static String getRelativeUrl(String url){
        return url.substring(18);
    }

}
