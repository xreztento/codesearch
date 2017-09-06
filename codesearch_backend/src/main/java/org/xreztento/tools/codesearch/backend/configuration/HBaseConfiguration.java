package org.xreztento.tools.codesearch.backend.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.xreztento.tools.codesearch.backend.hbase.HBaseTemplate;
import org.xreztento.tools.codesearch.backend.hbase.PooledHTableFactory;

@Configuration
public class HBaseConfiguration {

    @Value("${hbase.client.host}")
    private String quorum;

    @Value("${hbase.client.port}")
    private String clientPort;

    @Bean
    @Scope("prototype")
    public HBaseTemplate hBaseTemplate(){
        org.apache.hadoop.conf.Configuration cfg = org.apache.hadoop.hbase.HBaseConfiguration.create();
        cfg.set("hbase.zookeeper.quorum", quorum);
        cfg.set("hbase.zookeeper.property.clientPort", clientPort);
        HBaseTemplate template = new HBaseTemplate();
        template.setConfiguration(cfg);
        template.setTableFactory(new PooledHTableFactory(cfg));
        template.afterPropertiesSet();

        return template;
    }
}
