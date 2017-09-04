package org.xreztento.tools.codesearch.backend.crawler.common;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.CloseableHttpClient;
import org.xreztento.tools.codesearch.backend.crawler.common.http.HttpClientFactory;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

public class CrawlerConnector {

    public static CrawlerResponseData execute(HttpRequestBase request) throws ClientProtocolException, IOException{
		CloseableHttpClient httpClient = null;
		CloseableHttpResponse response = null;
        CrawlerResponseData data = new CrawlerResponseData();
		try {
			httpClient = HttpClientFactory.getHttpClient();
		    response = httpClient.execute(request);
		    Map<String, String> headerMap = new HashMap<String, String>();
		    Header[] headers = response.getAllHeaders();
		    for(Header header : headers){
		    	headerMap.put(header.getName(), header.getValue());
		    }
		    HttpEntity entity = response.getEntity();
            StringBuffer sb = new StringBuffer(1024000);
            byte[] buffer = new byte[1];
            while(entity.getContent().read(buffer) != -1){
            	sb.append(new String(buffer,"utf-8"));
            }
            data.setStatusCode(response.getStatusLine().getStatusCode());
            data.setResponseHeader(headerMap);
            data.setResponseEntity(sb.toString());
			
		} catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } finally {
			if(null != response){
				try {
					response.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			
			if(null != httpClient){
				try {
					httpClient.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		
		return data;
	}

    public static void download(String url, String path, String fileName){
        CloseableHttpClient httpClient = null;
        CloseableHttpResponse response = null;
        InputStream in = null;
        FileOutputStream out = null;
        CrawlerResponseData data = new CrawlerResponseData();
        try {
            httpClient = HttpClientFactory.getHttpClient();
            response = httpClient.execute(new HttpGet(url));
            HttpEntity entity = response.getEntity();

            if(entity != null) {
                in = entity.getContent();
                File directory = new File(path);
                if(!directory.exists() || !directory.isDirectory()){
                    directory.mkdirs();
                }
                File file = new File(path + File.separator + fileName);
                if(file.exists() && file.isFile()){
                    file.delete();
                }
                file.createNewFile();


                out = new FileOutputStream(file);
                byte[] buffer = new byte[4096];
                int length = -1;
                while((length = in.read(buffer) )!= -1){
                    out.write(buffer, 0, length);
                }

            }

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {

            if(in != null){
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if(out != null){
                try {
                    out.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if(null != response){
                try {
                    response.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if(null != httpClient){
                try {
                    httpClient.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
