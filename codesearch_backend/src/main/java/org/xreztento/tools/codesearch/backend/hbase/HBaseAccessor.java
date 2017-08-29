package org.xreztento.tools.codesearch.backend.hbase;

import org.apache.hadoop.conf.Configuration;
import org.springframework.util.StringUtils;

import java.nio.charset.Charset;


public abstract class HBaseAccessor {

    private String encoding;
    private static final Charset CHARSET = Charset.forName("UTF-8");

    private TableFactory tableFactory;
    private Configuration configuration;

    /**
     * Sets the table factory.
     *
     * @param tableFactory The tableFactory to set.
     */
    public void setTableFactory(TableFactory tableFactory) {
        this.tableFactory = tableFactory;
    }

    /**
     * Sets the encoding.
     *
     * @param encoding The encoding to set.
     */
    public void setEncoding(String encoding) {
        this.encoding = encoding;
    }

    /**
     * Sets the configuration.
     *
     * @param configuration The configuration to set.
     */
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
    }

    public TableFactory getTableFactory() {
        return tableFactory;
    }

    public Configuration getConfiguration() {
        return configuration;
    }
    
    public Charset getCharset() {
        return (StringUtils.hasText(encoding) ? Charset.forName(encoding) : CHARSET);
    }
}