package org.xreztento.tools.codesearch.backend.controller.api;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.xreztento.tools.codesearch.backend.crawler.CrawlerEngine;
import org.xreztento.tools.codesearch.backend.engine.CodeSearchEngine;
import org.xreztento.tools.codesearch.backend.engine.SearchResult;
import org.xreztento.tools.codesearch.backend.hadoop.fs.FsShell;
import org.xreztento.tools.codesearch.backend.redis.RedisRepository;


@RestController
@RequestMapping("/api")
@Validated
public class CodeSearchController {
	@Autowired
	private CodeSearchEngine engine;
	
	@Autowired
	private RedisRepository repository;

    @Autowired
    private FsShell shell;

    @ApiOperation(value="Search code by keyword for caching result to redis.", notes="", produces = "application/json")
    @ApiImplicitParam(name = "keyWord", value = "The keyword text or code postfix@keyword", required = true, paramType="query", dataType = "String")
    @RequestMapping(value = { "/search" }, method = RequestMethod.GET)
	@ResponseBody
	public String search(@RequestParam(value = "keyWord", required = true) String keyWord){
		Future<SearchResult> future = null;
		int count = 0;
		if(keyWord.contains("@")){
			future = engine.searchByKeyWordAndPostfix(keyWord.split("@")[0], keyWord.split("@")[1]);
		} else {
			future = engine.searchByKeyWord(keyWord);
		}
		
		if(future != null){
			try {
				SearchResult result = future.get();
				count = repository.addSearchResult(keyWord, result, 60 * 10);
			} catch (InterruptedException e) {
				e.printStackTrace();
			} catch (ExecutionException e) {
				e.printStackTrace();
			}
		}
		
		JSONObject json = new JSONObject();
		json.put("count", count);
		return json.toString();
		
	}

    @RequestMapping(value = { "/lsr" }, method = RequestMethod.GET)
    @ResponseBody
    public String lsr(){
        StringBuilder sb = new StringBuilder();
        shell.lsr("/benchmarks").forEach( file -> {
            sb.append("hdfs://" + file.getPath() + "\n");
        });
        return sb.toString();

    }

}
