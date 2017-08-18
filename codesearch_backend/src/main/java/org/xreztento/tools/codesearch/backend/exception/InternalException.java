package org.xreztento.tools.codesearch.backend.exception;

public class InternalException extends Exception {

    private static final long serialVersionUID = 1L;

    public InternalException(Exception exception) {
        super(exception);
    }

    public InternalException(String message) {
        super(message);
    }
}
