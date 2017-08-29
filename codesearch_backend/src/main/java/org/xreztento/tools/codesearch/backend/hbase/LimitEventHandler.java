package org.xreztento.tools.codesearch.backend.hbase;

import org.apache.hadoop.hbase.client.Result;

public interface LimitEventHandler {
    void handleLastResult(Result lastResult);
}
