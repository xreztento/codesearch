package org.xreztento.tools.codesearch.frontend.controller;

import java.lang.reflect.Type;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.xreztento.tools.codesearch.frontend.engine.SearchResult;
import org.xreztento.tools.codesearch.frontend.service.search.CodeSearchService;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

@Controller
@RequestMapping("/")
@Validated
public class CodeSearchController {
	
	private static final String INDEX = "Index";
	
	@Autowired
	private CodeSearchService codeSearchService;
	
	@RequestMapping(value = { "/index" }, method = RequestMethod.GET)
	public String index(){
		return INDEX;
	}
	
	
	@RequestMapping(value = { "/search" }, method = RequestMethod.GET)
	@ResponseBody
	public String search(@RequestParam(value = "keyWord", required = true) String keyWord){
		Future<SearchResult> future = null;
		String result = null;
		future = codeSearchService.searchByKeyWord(keyWord);
		Gson gson = new GsonBuilder().registerTypeAdapter(Double.class, new JsonSerializer<Double>() {

			@Override
			public JsonElement serialize(Double src, Type typeOfSrc, JsonSerializationContext context) {
				if (src == src.longValue())
					return new JsonPrimitive(src.longValue());
				return new JsonPrimitive(src);
			}
		}).create();
		
		try {
			result = gson.toJson(future.get().getResult());
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (ExecutionException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	@RequestMapping(value = { "/search/{pagination}" }, method = RequestMethod.GET)
	@ResponseBody
	public String searchWithPagination(@PathVariable("pagination") int paginationNum, @RequestParam(value = "keyWord", required = true) String keyWord){
		
		Future<String> future = null;
		String result = null;
		if(paginationNum > -1){
			future = codeSearchService.searchByKeyWordWithPaginationForJson(keyWord, paginationNum);
			try {
				result = future.get();
			} catch (InterruptedException e) {
				e.printStackTrace();
			} catch (ExecutionException e) {
				e.printStackTrace();
			}
		}

		return result;
		
	}
}
