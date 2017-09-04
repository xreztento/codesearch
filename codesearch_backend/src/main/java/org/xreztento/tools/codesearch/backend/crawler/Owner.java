package org.xreztento.tools.codesearch.backend.crawler;


public class Owner {
    private long id;
    private String login = null;
    private String avatarUrl = null;
    private String followers = null;
    private String following = null;
    private String organizations = null;

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

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getFollowers() {
        return followers;
    }

    public void setFollowers(String followers) {
        this.followers = followers;
    }

    public String getFollowing() {
        return following;
    }

    public void setFollowing(String following) {
        this.following = following;
    }

    public String getOrganizations() {
        return organizations;
    }

    public void setOrganizations(String organizations) {
        this.organizations = organizations;
    }

    @Override
    public String toString() {
        return "Owner{" +
                "id=" + id +
                ", login='" + login + '\'' +
                ", avatarUrl='" + avatarUrl + '\'' +
                ", followers='" + followers + '\'' +
                ", following='" + following + '\'' +
                ", organizations='" + organizations + '\'' +
                '}';
    }
}
