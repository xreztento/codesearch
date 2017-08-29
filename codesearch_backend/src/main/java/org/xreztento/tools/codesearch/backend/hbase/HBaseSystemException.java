package org.xreztento.tools.codesearch.backend.hbase;


import org.springframework.dao.UncategorizedDataAccessException;

public class HBaseSystemException extends UncategorizedDataAccessException {

    public HBaseSystemException(Exception cause) {
        super(cause.getMessage(), cause);
    }
}
