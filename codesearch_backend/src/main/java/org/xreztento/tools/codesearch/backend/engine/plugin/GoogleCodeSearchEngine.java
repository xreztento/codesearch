package org.xreztento.tools.codesearch.backend.engine.plugin;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Future;

import org.apache.commons.lang3.StringEscapeUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;
import org.xreztento.tools.codesearch.backend.engine.InternalCodeSearchEngine;
import org.xreztento.tools.codesearch.backend.engine.impl.SearchResult;
import org.xreztento.tools.codesearch.backend.helper.os.OSHelper;
import org.xreztento.tools.codesearch.backend.helper.os.ProccessRunningResult;

@Service("googleCodeSearchEngineBean")
public class GoogleCodeSearchEngine implements InternalCodeSearchEngine{
	
	@Value("${google.codesearch.path}")
	private String path;
	
	@Override
	@Async
	public Future<SearchResult> searchByKeyWord(String keyWord) {
		SearchResult result = search(keyWord);
		return new AsyncResult<SearchResult>(result);
	}

	@Override
	@Async
	public Future<SearchResult> searchByKeyWordAndPostfix(String keyWord, String postfix) {
		SearchResult result = search(keyWord, "." + postfix.toLowerCase());
		return new AsyncResult<SearchResult>(result);
	}
	
	private SearchResult search(String... args){
		String[] stringResult = formatResult(executeCommand(args));
		SearchResult result = stringResultToSearchResult(stringResult);
		return result;
	}
	
	private String executeCommand(String... args){
		String[] command = getCommand(args);
		ProccessRunningResult result = OSHelper.runSystemCommand(command);

		if(result.getExitValue() == 0){
			return result.getFeedback();
		}
		return null;
	}
	
	private SearchResult stringResultToSearchResult(String[] stringResult){
		SearchResult result = new SearchResult();
		
		if(stringResult != null){
			for(String line : stringResult){
				if(line.contains(":")){
					result.addItem(line.split(":")[0], Integer.valueOf(line.split(":")[1].replace(" ", "")));
				}
			}
		}		
		return result;
	}
	
	
	private String[] formatResult(String result){
		if(result != null){
			String[] formatResult = result.split("\n");
			return formatResult;
		}
		return null;
		
	}
	
	private String[] getCommand(String... args){
		List<String> command = new ArrayList<String>();
		command.add(path + "/bin/csearch");
		if(args.length > 1){
			command.add("-f");
			command.add(args[1]);
		}
		
		command.add("-n");
		command.add(args[0]);
		
		return command.toArray(new String[0]);
	}

}
