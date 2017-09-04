package org.xreztento.tools.codesearch.backend.crawler.plugin.github.type;


import org.xreztento.tools.codesearch.backend.crawler.*;

public class GitHubTypeMapper {
    public GitHubTypeMapper(){

    }

    public org.xreztento.tools.codesearch.backend.crawler.Repository mappingRepository(Repository repository){
        org.xreztento.tools.codesearch.backend.crawler.Repository mappedRepo = new org.xreztento.tools.codesearch.backend.crawler.Repository();
        return mappedRepo;
    }
}
