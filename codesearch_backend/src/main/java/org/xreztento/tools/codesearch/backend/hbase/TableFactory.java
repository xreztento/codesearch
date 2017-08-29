package org.xreztento.tools.codesearch.backend.hbase;

import org.apache.hadoop.hbase.TableName;
import org.apache.hadoop.hbase.client.Table;

public interface TableFactory {


  Table getTable(TableName tableName);
  void releaseTable(final Table table);
}
