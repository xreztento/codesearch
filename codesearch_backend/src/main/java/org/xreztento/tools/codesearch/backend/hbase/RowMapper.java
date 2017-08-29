package org.xreztento.tools.codesearch.backend.hbase;

import org.apache.hadoop.hbase.client.Result;

public interface RowMapper<T> {

    T mapRow(Result result, int rowNum) throws Exception;
}
