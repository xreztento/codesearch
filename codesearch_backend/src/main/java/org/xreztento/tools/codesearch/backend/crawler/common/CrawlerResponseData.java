package org.xreztento.tools.codesearch.backend.crawler.common;

import java.util.Map;

public class CrawlerResponseData {
	protected int statusCode;
	protected String responseEntity = null;
	protected Map<String, String> responseHeader = null;
	public int getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}
	public String getResponseEntity() {
		return responseEntity;
	}
	public void setResponseEntity(String responseEntity) {
		this.responseEntity = responseEntity;
	}
	public Map<String, String> getResponseHeader() {
		return responseHeader;
	}
	public void setResponseHeader(Map<String, String> responseHeader) {
		this.responseHeader = responseHeader;
	}

}
