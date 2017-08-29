package org.xreztento.tools.codesearch.backend.hbase;

import org.apache.hadoop.hbase.client.Table;

public interface TableCallback<T> {

    T doInTable(Table table) throws Throwable;
}
