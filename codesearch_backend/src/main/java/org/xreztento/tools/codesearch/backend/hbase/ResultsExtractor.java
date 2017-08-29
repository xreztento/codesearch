package org.xreztento.tools.codesearch.backend.hbase;

import org.apache.hadoop.hbase.client.ResultScanner;

public interface ResultsExtractor<T> {

    T extractData(ResultScanner results) throws Exception;
}
