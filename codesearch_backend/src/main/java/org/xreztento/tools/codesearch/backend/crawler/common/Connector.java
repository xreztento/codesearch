package org.xreztento.tools.codesearch.backend.crawler.common;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;

import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.impl.client.CloseableHttpClient;

public class Connector {

	public static APIResponseData execute(HttpRequestBase request) {
		CloseableHttpClient httpClient = null;
		CloseableHttpResponse response = null;
		APIResponseData data = new APIResponseData();
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
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
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
}
