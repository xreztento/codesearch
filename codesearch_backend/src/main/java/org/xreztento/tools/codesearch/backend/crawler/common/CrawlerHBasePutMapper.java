package org.xreztento.tools.codesearch.backend.crawler.common;


import org.apache.hadoop.hbase.client.Put;
import org.apache.hadoop.hbase.util.Bytes;
import org.xreztento.tools.codesearch.backend.crawler.Organization;
import org.xreztento.tools.codesearch.backend.crawler.Repository;
import org.xreztento.tools.codesearch.backend.crawler.Owner;

public class CrawlerHBasePutMapper {
    public Put mappingRepository(Repository repository){
        Put put = new Put(Bytes.toBytes(repository.getCommunity() + "@" + repository.getId() + "@" + repository.getName()));
        put.addImmutable(Bytes.toBytes("Repository"), Bytes.toBytes("name"), Bytes.toBytes(repository.getName()));
        put.addImmutable(Bytes.toBytes("Repository"), Bytes.toBytes("description"), Bytes.toBytes(repository.getDescription()));

        return put;
    }

    public Put mappingOwner(Owner owner, String community){
        Put put = new Put(Bytes.toBytes(community + "@" + owner.getId() + "@" + owner.getLogin()));
        return put;
    }

    public Put mappingOrganization(Organization organization, String community){
        Put put = new Put(Bytes.toBytes(community + "@" + organization.getId() + "@" + organization.getLogin()));
        return put;
    }


}
