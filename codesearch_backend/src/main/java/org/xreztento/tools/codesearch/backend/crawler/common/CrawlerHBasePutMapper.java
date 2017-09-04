package org.xreztento.tools.codesearch.backend.crawler.common;


import org.apache.hadoop.hbase.client.Put;
import org.apache.hadoop.hbase.util.Bytes;
import org.xreztento.tools.codesearch.backend.crawler.Repository;

public class CrawlerHBasePutMapper {
    public Put mapRepository(Repository repository){
        Put put = new Put(Bytes.toBytes(repository.getCommunity() + "@" + repository.getId() + "@" + repository.getName() + "@"));
        put.addImmutable(Bytes.toBytes("Repository"), Bytes.toBytes("name"), Bytes.toBytes(repository.getName()));
        return put;
    }
}
