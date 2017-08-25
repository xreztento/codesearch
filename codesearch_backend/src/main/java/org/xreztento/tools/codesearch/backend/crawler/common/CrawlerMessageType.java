package org.xreztento.tools.codesearch.backend.crawler.common;


public enum CrawlerMessageType {
    REPOSITORY("Repository"),
    OWNER("Owner"),
    ORGANIZATION("Organization");


    private String typeName = null;
    private CrawlerMessageType(String typeName){
        this.typeName = typeName;
    }

    public String getTypeName() {
        return this.typeName;
    }

    @Override
    public String toString() {
        return this.typeName;
    }
}
