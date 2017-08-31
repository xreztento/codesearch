package org.xreztento.tools.codesearch.backend.crawler.plugin.github.type;


public class Repository {
    private long id;
    private String name = null;
    private String full_name = null;
    private String description = null;
    private boolean fork;
    private String html_url = null;
    private String contributors_url = null;
    private String deployments_url = null;
    private String languages_url = null;
    private int forksCount;
    private int stargazersCount;
    private int watchersCount;
    private String license = "MIT";
    private Owner owner = null;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFull_name() {
        return full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isFork() {
        return fork;
    }

    public void setFork(boolean fork) {
        this.fork = fork;
    }

    public String getHtml_url() {
        return html_url;
    }

    public void setHtml_url(String html_url) {
        this.html_url = html_url;
    }

    public String getContributors_url() {
        return contributors_url;
    }

    public void setContributors_url(String contributors_url) {
        this.contributors_url = contributors_url;
    }

    public String getDeployments_url() {
        return deployments_url;
    }

    public void setDeployments_url(String deployments_url) {
        this.deployments_url = deployments_url;
    }

    public String getLanguages_url() {
        return languages_url;
    }

    public void setLanguages_url(String languages_url) {
        this.languages_url = languages_url;
    }

    public Owner getOwner() {
        return owner;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }

    public int getForksCount() {
        return forksCount;
    }

    public void setForksCount(int forksCount) {
        this.forksCount = forksCount;
    }

    public int getStargazersCount() {
        return stargazersCount;
    }

    public void setStargazersCount(int stargazersCount) {
        this.stargazersCount = stargazersCount;
    }

    public int getWatchersCount() {
        return watchersCount;
    }

    public void setWatchersCount(int watchersCount) {
        this.watchersCount = watchersCount;
    }


    public String getLicense() {
        return license;
    }

    public void setLicense(String license) {
        this.license = license;
    }

    @Override
    public String toString() {
        return "Repository{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", full_name='" + full_name + '\'' +
                ", description='" + description + '\'' +
                ", fork=" + fork +
                ", html_url='" + html_url + '\'' +
                ", contributors_url='" + contributors_url + '\'' +
                ", deployments_url='" + deployments_url + '\'' +
                ", languages_url='" + languages_url + '\'' +
                ", forksCount=" + forksCount +
                ", stargazersCount=" + stargazersCount +
                ", watchersCount=" + watchersCount +
                ", license='" + license + '\'' +
                ", owner=" + owner +
                '}';
    }
}
