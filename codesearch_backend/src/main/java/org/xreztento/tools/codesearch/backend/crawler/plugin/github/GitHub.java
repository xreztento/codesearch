package org.xreztento.tools.codesearch.backend.crawler.plugin.github;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;

import org.apache.commons.codec.binary.Base64;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.message.BasicHeader;
import org.xreztento.tools.codesearch.backend.crawler.plugin.github.type.Organization;
import org.xreztento.tools.codesearch.backend.crawler.plugin.github.type.Organizations;
import org.xreztento.tools.codesearch.backend.crawler.plugin.github.type.Repositories;
import org.xreztento.tools.codesearch.backend.crawler.plugin.github.type.Repository;

public class GitHub {

	private Header authHeader = null;

	private GitHub(){};
	
	private GitHub(String username, String password) throws UnsupportedEncodingException{
		String authorization = (username + ':' + password);
        String charsetName = "UTF-8";
        String encodedAuthorization = "Basic "+ new String(Base64.encodeBase64(authorization.getBytes(charsetName)), charsetName);
		authHeader = new BasicHeader("Authorization", encodedAuthorization);
	}
	
	private GitHub(String oAuth){
		String token = "token " + oAuth;
		authHeader = new BasicHeader("Authorization", token);
	}
	
	public static GitHub forNoAuthenticationConnector(){
		GitHub gitHub = new GitHub();
		return gitHub;
	}
	 
	public static GitHub forBasicAuthenticationConnector(String username, String password) throws UnsupportedEncodingException{
		GitHub gitHub = new GitHub(username, password);
		return gitHub;
	}
	
	public static GitHub forOAuthConnector(String oAuth){
		GitHub gitHub = new GitHub(oAuth);
		return gitHub;
	}

	public Header getAuthHeader() {
		return authHeader;
	}

	public Repositories getRepositories(int since) {
        Repositories repositories = new Repositories();
        HttpGet get = wrapHttpGet("https://api.github.com/repositories?since=" + since);
        GitHubAPIRequester requester = new GitHubAPIRequester(this);

        RepositoriesResponseResult result = new RepositoriesResponseResult();
        repositories.setRepositories(requester.requestObjects(get, result, Repository.class));
        repositories.setLink(result.getSince());
        addExtendRepoDataFromPage(repositories);
        return repositories;
	}

    public Organizations getOrganizations(int since) throws URISyntaxException {
        Organizations organizations = new Organizations();
        HttpGet get = wrapHttpGet("https://api.github.com/organizations?since=" + since);
        GitHubAPIRequester requester = new GitHubAPIRequester(this);

        OrganizationsResponseResult result = new OrganizationsResponseResult();
        organizations.setOrganizations(requester.requestObjects(get, result, Organization.class));
        organizations.setLink(result.getSince());

        return organizations;
    }

    public String getLanguages(String repositoryFullName) throws URISyntaxException {
        String apiUrl = "";
        return getApi(apiUrl);
    }

    public String getFollowers(String repositoryFullName) throws URISyntaxException {
        String apiUrl = "";
        return getApi(apiUrl);
    }

    public String getFollowing(String repositoryFullName) throws URISyntaxException {
        String apiUrl = "";
        return getApi(apiUrl);
    }

    public String getContributors(String repositoryFullName) throws URISyntaxException {
        String apiUrl = "";
        return getApi(apiUrl);
    }


    public String getApi(String apiUrl){
        HttpGet get = wrapHttpGet(apiUrl);
        GitHubAPIRequester requester = new GitHubAPIRequester(this);
        GitHubAPIResult result = new GitHubAPIResult();
        requester.requestResult(get, result);
        return result.getContent();
    }

    private void addExtendRepoDataFromPage(Repositories repositories){
        for(Repository repository : repositories.getRepositories()){
            GitHubRepoPageProcessor.process(repository);
        }
    }

    private HttpGet wrapHttpGet(String uri){
        HttpGet get = new HttpGet();
        get.setHeader(authHeader);
        try {
            get.setURI(new URI(uri));
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        return get;
    }

}
