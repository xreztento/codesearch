package org.xreztento.tools.codesearch.backend.crawler.plugin.github.type;


public class Organization {
    private long id;
    private String login = null;
    private String description = null;
    private String url = null;
    private String avatar_url = null;
    private String members_url = null;
    private String public_members_url = null;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getAvatar_url() {
        return avatar_url;
    }

    public void setAvatar_url(String avatar_url) {
        this.avatar_url = avatar_url;
    }

    public String getMembers_url() {
        return members_url;
    }

    public void setMembers_url(String members_url) {
        this.members_url = members_url;
    }

    public String getPublic_members_url() {
        return public_members_url;
    }

    public void setPublic_members_url(String public_members_url) {
        this.public_members_url = public_members_url;
    }

    @Override
    public String toString() {
        return "Organization{" +
                "id=" + id +
                ", login='" + login + '\'' +
                ", description='" + description + '\'' +
                ", url='" + url + '\'' +
                ", avatar_url='" + avatar_url + '\'' +
                ", members_url='" + members_url + '\'' +
                ", public_members_url='" + public_members_url + '\'' +
                '}';
    }
}
