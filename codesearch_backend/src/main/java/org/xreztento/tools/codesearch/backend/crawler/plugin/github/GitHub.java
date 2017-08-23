package org.xreztento.tools.codesearch.backend.crawler.plugin.github;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;

import org.apache.commons.codec.binary.Base64;
import org.apache.http.Header;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.message.BasicHeader;
import org.xreztento.tools.codesearch.backend.crawler.plugin.github.type.Repositories;

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

	public Object[] getRepositories(int since) throws URISyntaxException {
		HttpGet get = new HttpGet();
    	get.setHeader(authHeader);
    	get.setURI(new URI("https://api.github.com/repositories?since=" + since));
        GitHubAPIRequester requester = new GitHubAPIRequester(this);
        RepositoriesResponseResult result = new RepositoriesResponseResult();
        Object[] repositories = requester.requestObjects(get, result, Repositories.class);
        System.out.println(result.getSince());
        return repositories;
	}

    public static void main(String[] args) throws UnsupportedEncodingException, URISyntaxException{
        GitHub gitHub =  GitHub.forNoAuthenticationConnector();
        Object[] repositories = (Object[])gitHub.getRepositories(0);
        for(Object object : repositories){
            System.out.println(((Repositories)object).getName());

        }
    }

}
