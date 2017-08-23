package org.xreztento.tools.codesearch.backend.engine;

import java.util.concurrent.Future;

public interface CodeSearchEngine {
	public Future<SearchResult> searchByKeyWord(String keyWord);
	public Future<SearchResult> searchByKeyWordAndPostfix(String keyWord, String postfix);


}
