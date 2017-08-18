package org.xreztento.tools.codesearch.frontend.engine;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


public class SearchResult {
	
	private Map<String, ArrayList<Integer>> result = new HashMap<String, ArrayList<Integer>>();
	
	public void addItem(String file, int rowNum){
		if(!this.result.containsKey(file)){
			ArrayList<Integer> rowNumList = new ArrayList<Integer>();
			rowNumList.add(rowNum);
			this.result.put(file, rowNumList);
		} else {
			this.result.get(file).add(rowNum);
		}
	}
	
	public void removeItem(String file){
		this.result.remove(file);
	}
	
	public Map<String, ArrayList<Integer>> getResult() {
		return this.result;
	}
	
	public void setResult(Map<String, ArrayList<Integer>> result) {
		this.result = result;
	}
	
	public void inputForJson(String stringResult){
		Gson gson = new GsonBuilder().registerTypeAdapter(result.getClass(), new SearchResultAdapter()).create();
		this.result = gson.fromJson(stringResult, result.getClass());
	}
	
	
	
}
