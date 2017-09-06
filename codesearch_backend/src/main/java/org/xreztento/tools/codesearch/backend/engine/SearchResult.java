package org.xreztento.tools.codesearch.backend.engine;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class SearchResult {

	private Map<String, LinkedList<Integer>> result = new HashMap<String, LinkedList<Integer>>();

	public void addItem(String file, int rowNum) {
		if (!result.containsKey(file)) {
			LinkedList<Integer> rowNumList = new LinkedList<Integer>();
			rowNumList.add(rowNum);
			result.put(file, rowNumList);
		} else {
			result.get(file).add(rowNum);
		}
	}

	public void removeItem(String file) {
		result.remove(file);
	}

	public Map<String, LinkedList<Integer>> getResult() {
		return result;
	}

	public String outputForJson() {

		Gson gson = new GsonBuilder().registerTypeAdapter(Double.class, new JsonSerializer<Double>() {

			@Override
			public JsonElement serialize(Double src, Type typeOfSrc, JsonSerializationContext context) {
				if (src == src.longValue())
					return new JsonPrimitive(src.longValue());
				return new JsonPrimitive(src);
			}
		}).create();

		return gson.toJson(result);
	}

}
