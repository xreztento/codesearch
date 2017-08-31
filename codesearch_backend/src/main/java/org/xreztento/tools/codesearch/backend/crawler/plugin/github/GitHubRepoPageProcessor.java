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
            String url = repository.getHtml_url();
            HttpGet get = new HttpGet(url);

            response = httpClient.execute(get, BASIC_RESPONSE_HANDLER);
            String relativeUrl = getRelativeUrl(url);
            int[] socialCount = getSocialCount(response);
            String license = getLicense(response, relativeUrl);
            repository.setWatchersCount(socialCount[0]);
            repository.setStargazersCount(socialCount[1]);
            repository.setForksCount(socialCount[2]);
            repository.setLicense(license);


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

    private static String getLicense(String response, String relativeUrl){
        String license = null;
        String licenseLeftEdge = "<a href=\"" + relativeUrl + "/blob/master/LICENSE" + "\">";
        String licenseRightEdge = "</a>";
        String licenseSource = StringUtils.getRangeStringByEdge(response, licenseLeftEdge, licenseRightEdge, 0);
        if(licenseSource != null){
            license = StringUtils.truncateRegexMatchGroup(licenseSource, "<svg(.*)></svg>.*").replace("<svg></svg>", "").trim();
        }
        return license;
    }

    private static int[] getSocialCount(String response){
        int[] socialCount = new int[3];
        String leftEdge = "aria-label=\"";
        String rightEdge = "\">";
        String[] counts = StringUtils.getRangeStringsByEdge(response, leftEdge, rightEdge);
        for(String count : counts){
            if(count.contains(" users are watching this repository") || count.contains(" user is watching this repository")){
                socialCount[0] = Integer.valueOf(count.substring(0, count.indexOf(" ")));
            }
            if(count.contains(" users starred this repository") || count.contains(" user starred this repository")){
                socialCount[1] = Integer.valueOf(count.substring(0, count.indexOf(" ")));
            }
            if(count.contains(" users forked this repository") || count.contains(" user forked this repository")){
                socialCount[1] = Integer.valueOf(count.substring(0, count.indexOf(" ")));
            }
        }
        return socialCount;
    }

    private static String getRelativeUrl(String url){
        return url.substring(18);
    }

}
