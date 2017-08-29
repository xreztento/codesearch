package org.xreztento.tools.codesearch.backend.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;
import org.xreztento.tools.codesearch.backend.engine.SearchResult;

import java.util.concurrent.TimeUnit;

@Component
public class Repository {
	private StringRedisTemplate template;

	private ValueOperations<String, String> valueOps;

	@Autowired
	public Repository(StringRedisTemplate template) {
		this.template = template;
		this.valueOps = template.opsForValue();
	}

	public int addSearchResult(String keyWord, SearchResult result, int timeout) {

		String jsonResult = result.outputForJson();
		valueOps.set(keyWord, jsonResult, timeout, TimeUnit.SECONDS);
		
		return result.getResult().size();
	}

    public void setGitHubRepositorySinceValue(int since){
        valueOps.set("github-repo-since", String.valueOf(since));
    }

    public int getGitHubRepositorySinceValue(){
        String value = valueOps.get("github-repo-since");
        if(value != null){
            return Integer.valueOf(value);
        }
        return 0;
    }

	public void delSearchResult(String keyWord) {
		template.delete(keyWord);
	}

}
