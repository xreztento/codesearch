package org.xreztento.tools.codesearch.frontend.engine;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.JsonArray;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;


public class SearchResultAdapter implements JsonDeserializer<Map<String, ArrayList<Integer>>>{

	@Override
	public Map<String, ArrayList<Integer>> deserialize(JsonElement json, Type type, JsonDeserializationContext context)
			throws JsonParseException {
		if(json == null){  
            return null;  
        } else {  
        	Map<String, ArrayList<Integer>> map = new HashMap<String, ArrayList<Integer>>();
        	JsonObject jsonObject = json.getAsJsonObject();
        	jsonObject.entrySet().forEach(e -> {
        		JsonArray array = e.getValue().getAsJsonArray();
        		ArrayList<Integer> list = new ArrayList<Integer>();
        		array.forEach(i -> {
        			list.add(i.getAsInt());
        		});
        		map.put(e.getKey(), list);
        	});
        	
        	return map;
        }  
	}
}
