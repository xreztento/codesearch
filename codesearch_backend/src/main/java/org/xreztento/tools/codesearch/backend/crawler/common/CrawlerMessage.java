package org.xreztento.tools.codesearch.backend.crawler.common;

public class CrawlerMessage {
    private CrawlerMessageType type = null;
    private String content = null;

    public CrawlerMessageType getType() {
        return type;
    }

    public void setType(CrawlerMessageType type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
