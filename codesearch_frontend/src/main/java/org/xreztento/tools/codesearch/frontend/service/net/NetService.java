package org.xreztento.tools.codesearch.frontend.service.net;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpEntity;
import org.springframework.web.client.RestClientException;
import org.xreztento.tools.codesearch.frontend.exception.InternalException;

public interface NetService {
	
	 public <K, V> V postForFormObject(String uri, K object, Class<V> returnType) throws RestClientException;

    public <T> T getForObject(String uri, Class<T> returnType) throws RestClientException;

    
    public <T> T getForObjectWithoutAuth(String uri, Class<T> returnType) throws RestClientException;

    
    public <T> T getForObject(String uri, Class<T> returnType, Object... urlVariables) throws RestClientException;

    public <T> HttpEntity<T> getForEntity(String uri, Class<T> returnType) throws RuntimeException, InternalException;

    public <T> T postForObject(String uri, T object, Class<T> returnType) throws RestClientException;

    public <T> T putForObject(String uri, T object, Class<T> returnType) throws RestClientException;

    public <T> T deleteForObject(String uri, Class<T> returnType) throws RestClientException;

    public String getForJson(HttpServletRequest request) throws RuntimeException, InternalException;
    
    public String getForJson(String uri) throws RuntimeException, InternalException;


    public String postForJson(HttpServletRequest request) throws RuntimeException, InternalException;

    public String putForJson(HttpServletRequest request) throws RuntimeException, InternalException;

    public HttpEntity<byte[]> getForEntity(HttpServletRequest request) throws RuntimeException, InternalException;

    public String deleteForJson(HttpServletRequest request) throws RuntimeException, InternalException;

    public String getRedirectUrl(String originUri);
}
