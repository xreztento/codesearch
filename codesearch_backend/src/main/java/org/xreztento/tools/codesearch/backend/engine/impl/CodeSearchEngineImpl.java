package org.xreztento.tools.codesearch.backend.engine.impl;

import java.util.List;
import java.util.concurrent.Future;

import org.springframework.beans.factory.annotation.Value;
import org.xreztento.tools.codesearch.backend.engine.CodeSearchEngine;
import org.xreztento.tools.codesearch.backend.engine.InternalCodeSearchEngine;

import com.google.common.collect.Lists;
import org.xreztento.tools.codesearch.backend.engine.SearchResult;

public class CodeSearchEngineImpl implements CodeSearchEngine{

	private final List<InternalCodeSearchEngine> codeSearchEngines = Lists.newArrayList();
	private EmptyCodeSearchEngine emptyCodeSearchEngine = new EmptyCodeSearchEngine();
	
	@Value("${engine.id}")
	private String engineId;

	public synchronized void addInternalCodeSearchEngine(InternalCodeSearchEngine internalCodeSearchEngine) {
		if (internalCodeSearchEngine != null && !codeSearchEngines.contains(internalCodeSearchEngine)) {
			codeSearchEngines.add(internalCodeSearchEngine);
		}
	}

	public synchronized void removeInternalCodeSearchEngine(InternalCodeSearchEngine internalCodeSearchEngine) {
		if (internalCodeSearchEngine != null && codeSearchEngines.contains(internalCodeSearchEngine)) {
			codeSearchEngines.remove(internalCodeSearchEngine);
		}
	}

	private InternalCodeSearchEngine getInternalEmailService() {
		if (codeSearchEngines.isEmpty()) {
			return emptyCodeSearchEngine;
		}
		return codeSearchEngines.get(Integer.valueOf(engineId));
	}

	@Override
	public Future<SearchResult> searchByKeyWord(String keyWord) {
		return getInternalEmailService().searchByKeyWord(keyWord);
	}

	@Override
	public Future<SearchResult> searchByKeyWordAndPostfix(String keyWord, String postfix) {
		return getInternalEmailService().searchByKeyWordAndPostfix(keyWord, postfix);
	}

	
}
