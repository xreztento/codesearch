package org.xreztento.tools.codesearch.backend.engine.impl;

import java.util.concurrent.Future;

import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;
import org.xreztento.tools.codesearch.backend.engine.InternalCodeSearchEngine;

@Service("emptyCodeSearchEngineBean")
public class EmptyCodeSearchEngine implements InternalCodeSearchEngine{

	@Override
	public Future<SearchResult> searchByKeyWord(String keyWord) {
		SearchResult result = new SearchResult();
		return new AsyncResult<SearchResult>(result);
	}

	@Override
	public Future<SearchResult> searchByKeyWordAndPostfix(String keyWord, String postfix) {
		SearchResult result = new SearchResult();
		return new AsyncResult<SearchResult>(result);
	}

}
