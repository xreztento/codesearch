package org.xreztento.tools.codesearch.backend.crawler.plugin.github;

public class GitHubResult {
    private int statusCode;
    private int xRateLimit_Limit;
    private int xRateLimit_Remaining;
    private long xRateLimit_Reset;
    private int since;
    private String content;

    public int getStatusCode() {
        return statusCode;
    }
    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public int getXRateLimit_Limit() {
        return xRateLimit_Limit;
    }
    public void setXRateLimit_Limit(int xRateLimit_Limit) {
        this.xRateLimit_Limit = xRateLimit_Limit;
    }
    public int getXRateLimit_Remaining() {
        return xRateLimit_Remaining;
    }
    public void setXRateLimit_Remaining(int xRateLimit_Remaining) {
        this.xRateLimit_Remaining = xRateLimit_Remaining;
    }
    public long getXRateLimit_Reset() {
        return xRateLimit_Reset;
    }
    public void setXRateLimit_Reset(long xRateLimit_Reset) {
        this.xRateLimit_Reset = xRateLimit_Reset;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public int getSince() {
        return since;
    }

    public void setSince(int since) {
        this.since = since;
    }



}
