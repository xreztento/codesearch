package org.xreztento.tools.codesearch.frontend.service.search.impl;


import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.xreztento.tools.codesearch.frontend.engine.CodeSearchEngine;
import org.xreztento.tools.codesearch.frontend.engine.SearchResult;
import org.xreztento.tools.codesearch.frontend.exception.InternalException;
import org.xreztento.tools.codesearch.frontend.redis.Repository;
import org.xreztento.tools.codesearch.frontend.service.net.NetService;
import org.xreztento.tools.codesearch.frontend.service.search.CodeSearchService;

@Service
@EnableAsync
public class CodeSearchServiceImpl implements CodeSearchService{
	private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(CodeSearchServiceImpl.class);
	
	@Autowired
	NetService netService;
	
	@Autowired
	Repository repository;
	
	@Autowired
	CodeSearchEngine engine;

	@Override
	@Async
	public Future<SearchResult> searchByKeyWord(String keyWord) {
		SearchResult result = null;
		result = repository.getSearchResult(keyWord);
	
		if(result.getResult() == null){
			String uri = String.format(GET_SEARCH_RESULT, keyWord);
			try {
				netService.getForJson(uri);
				result = repository.getSearchResult(keyWord);
			} catch (RuntimeException e) {
				e.printStackTrace();
			} catch (InternalException e) {
				e.printStackTrace();
			}
		}

		return new AsyncResult<SearchResult>(result);
	}

	@Override
	@Async
	public Future<String> searchByKeyWordWithPaginationForJson(String keyWord, int paginationNum) {
		
		String json = null;
		try {
			SearchResult result = searchByKeyWord(keyWord).get();
			if(result != null){
				json = engine.getJsonResult(result, paginationNum);
			}
			
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (ExecutionException e) {
			e.printStackTrace();
		}
		
		return new AsyncResult<String>(json);
		
	}
	
	
	
	
	
	
}
