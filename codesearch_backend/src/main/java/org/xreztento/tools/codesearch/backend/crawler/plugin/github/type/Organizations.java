package org.xreztento.tools.codesearch.backend.crawler.plugin.github.type;


public class Organizations {
    private Organization[] organizations = null;
    private int link;

    public Organization[] getOrganizations() {
        return organizations;
    }

    public void setOrganizations(Organization[] organizations) {
        this.organizations = organizations;
    }

    public int getLink() {
        return link;
    }

    public void setLink(int link) {
        this.link = link;
    }
}
