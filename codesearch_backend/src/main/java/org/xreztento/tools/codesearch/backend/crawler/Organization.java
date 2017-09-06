package org.xreztento.tools.codesearch.backend.crawler;


public class Organization {
    private long id;
    private String login = null;
    private String description = null;
    private String url = null;
    private String avatarUrl = null;
    private String members = null;

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

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getMembers() {
        return members;
    }

    public void setMembers(String members) {
        this.members = members;
    }

    @Override
    public String toString() {
        return "Organization{" +
                "id=" + id +
                ", login='" + login + '\'' +
                ", description='" + description + '\'' +
                ", url='" + url + '\'' +
                ", avatarUrl='" + avatarUrl + '\'' +
                ", members='" + members + '\'' +
                '}';
    }
}
