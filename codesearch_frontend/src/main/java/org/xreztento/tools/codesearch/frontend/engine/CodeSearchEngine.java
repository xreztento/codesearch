package org.xreztento.tools.codesearch.frontend.engine;

import java.io.File;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

@Component("codeSearchEngineBean")
public class CodeSearchEngine {
	@Value("${pagination.size}")
	private String paginationSize;
	
	private CodeResult[] getCodeResult(SearchResult result, int paginationNum){
		int size = Integer.valueOf(paginationSize);
		int start = paginationNum * size;
		Map<String, ArrayList<Integer>> map = result.getResult();
		List<CodeResult> list = new ArrayList<CodeResult>(map.size());

		if(size == 0){
			map.forEach((k ,v) -> {
				CodeResult codeResult = new CodeResult();
				codeResult.setFile(k);
				codeResult.setFragment(CodeFragmentReader.read(new File(k), v.toArray(new Integer[0])));
				list.add(codeResult);
			});
			return list.toArray(new CodeResult[0]);
			
		} else if(size < map.size() || start == 0){
			
			map.forEach((k ,v) -> {
				CodeResult codeResult = new CodeResult();
				codeResult.setFile(k);
				list.add(codeResult);
			});

			if(start < list.size()){
				CodeResult[] codeResults = new CodeResult[size];
				
				for(int i = 0; i < size; i++){
					
					if(start + i == list.size()){
						break;
					}
					
					CodeResult codeResult = list.get(start + i);
					codeResult.setFragment(CodeFragmentReader.read(new File(codeResult.getFile()), map.get(codeResult.getFile()).toArray(new Integer[0])));
					codeResults[i] = codeResult;
				}
				return codeResults;
			}
			
		}
		
		return null;
	}
	
	public CodeSearchEngineResult getResult(SearchResult result, int paginationNum){
		CodeSearchEngineResult codeSearchEngineResult = new CodeSearchEngineResult();
		if(result.getResult() != null){
			codeSearchEngineResult.setCount(result.getResult().size());
			codeSearchEngineResult.setPaginationNum(paginationNum);
			codeSearchEngineResult.setCodeResults(getCodeResult(result, paginationNum));
		} else {
			codeSearchEngineResult.setCount(0);
		}
		
		
		return codeSearchEngineResult;
	}
	
	public String getJsonResult(SearchResult result, int paginationNum){
		Gson gson = new GsonBuilder().registerTypeAdapter(Double.class, new JsonSerializer<Double>() {

			@Override
			public JsonElement serialize(Double src, Type typeOfSrc, JsonSerializationContext context) {
				if (src == src.longValue())
					return new JsonPrimitive(src.longValue());
				return new JsonPrimitive(src);
			}
		}).create();
		return gson.toJson(getResult(result, paginationNum), CodeSearchEngineResult.class);
	}
	
	
}
