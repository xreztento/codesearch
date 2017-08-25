package org.xreztento.tools.codesearch.backend.crawler.plugin.github.type;

public class Repositories {
    private Repository[] repositories = null;
    private int link;

    public Repository[] getRepositories() {
        return repositories;
    }

    public void setRepositories(Repository[] repositories) {
        this.repositories = repositories;
    }

    public int getLink() {
        return link;
    }

    public void setLink(int link) {
        this.link = link;
    }
}
