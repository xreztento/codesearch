package org.xreztento.tools.codesearch.backend.hbase;

public interface ValueMapper<T> {
    byte[] mapValue(T value);
}
