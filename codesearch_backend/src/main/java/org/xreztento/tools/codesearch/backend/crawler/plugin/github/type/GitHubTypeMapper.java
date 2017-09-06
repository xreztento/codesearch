package org.xreztento.tools.codesearch.backend.crawler.plugin.github.type;

import org.xreztento.tools.codesearch.backend.crawler.Owner;
import org.xreztento.tools.codesearch.backend.crawler.plugin.github.GitHub;

import java.net.URISyntaxException;

public class GitHubTypeMapper {
    private final static String GITHUB_URL = "https://github.com/";
    private GitHub gitHub = null;
    public GitHubTypeMapper(GitHub gitHub){
        this.gitHub = gitHub;
    }

    public org.xreztento.tools.codesearch.backend.crawler.Repository mappingRepository(Repository repository){
        org.xreztento.tools.codesearch.backend.crawler.Repository mappedRepo = new org.xreztento.tools.codesearch.backend.crawler.Repository();
        mappedRepo.setId(repository.getId());
        mappedRepo.setCommunity("github");
        mappedRepo.setStargazersCount(repository.getStargazersCount());
        mappedRepo.setLicense(repository.getLicense());
        mappedRepo.setForksCount(repository.getForksCount());
        mappedRepo.setName(repository.getFull_name());
        mappedRepo.setDescription(repository.getDescription());
        mappedRepo.setFork(repository.isFork());
        mappedRepo.setDownloadUrl(GITHUB_URL + repository.getFull_name() + "/archive/master.zip");
        Owner owner = new Owner();
        owner.setId(repository.getOwner().getId());
        owner.setAvatarUrl(repository.getOwner().getAvatar_url());
        owner.setLogin(repository.getOwner().getLogin());
        owner.setUrl(repository.getOwner().getHtml_url());
        mappedRepo.setContributors(gitHub.getApi(repository.getContributors_url()));
        mappedRepo.setLanguages(gitHub.getApi(repository.getLanguages_url()));
        owner.setFollowers(gitHub.getApi(repository.getOwner().getFollowers_url()));
        owner.setFollowing(gitHub.getApi(repository.getOwner().getFollowing_url().substring(0, repository.getOwner().getFollowing_url().indexOf("{"))));
        owner.setOrganizations(gitHub.getApi(repository.getOwner().getOrganizations_url()));

        mappedRepo.setOwner(owner);

        return mappedRepo;
    }

    public org.xreztento.tools.codesearch.backend.crawler.Organization mappingOrganization(Organization organization){
        org.xreztento.tools.codesearch.backend.crawler.Organization mappedOrg = new org.xreztento.tools.codesearch.backend.crawler.Organization();
        mappedOrg.setId(organization.getId());
        mappedOrg.setLogin(organization.getLogin());
        mappedOrg.setAvatarUrl(organization.getAvatar_url());
        mappedOrg.setDescription(organization.getDescription());
        mappedOrg.setMembers(organization.getMembers_url());
        mappedOrg.setUrl(organization.getUrl());

        return mappedOrg;
    }

}
