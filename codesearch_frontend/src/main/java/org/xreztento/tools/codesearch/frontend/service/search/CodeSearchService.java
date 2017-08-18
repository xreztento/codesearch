package org.xreztento.tools.codesearch.frontend.service.search;

import java.util.concurrent.Future;

import org.xreztento.tools.codesearch.frontend.engine.SearchResult;

public interface CodeSearchService {
	
	String GET_SEARCH_RESULT = "/search?keyWord=%s";
	
	public Future<SearchResult> searchByKeyWord(String keyWord);
	public Future<String> searchByKeyWordWithPaginationForJson(String keyWord, int paginationNum);
}
