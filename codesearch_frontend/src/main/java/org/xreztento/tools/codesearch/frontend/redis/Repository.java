package org.xreztento.tools.codesearch.frontend.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;
import org.xreztento.tools.codesearch.frontend.engine.SearchResult;

import com.google.gson.Gson;

import java.util.UUID;
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

	public SearchResult getSearchResult(String keyWord) {
		String value = valueOps.get(keyWord);
		
		SearchResult result = new SearchResult();
		result.inputForJson(value);
		return result;
	}

}
