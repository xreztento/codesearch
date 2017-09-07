package org.xreztento.tools.codesearch.backend.hadoop;

public class HadoopException extends RuntimeException {

    /**
     * Constructs a new <code>HadoopException</code> instance.
     *
     * @param message message
     * @param ex      exception
     */
    public HadoopException(String message, Throwable ex) {
        super(message, ex);
    }

    /**
     * Constructs a new <code>HadoopException</code> instance.
     *
     * @param message message
     */
    public HadoopException(String message) {
        super(message);
    }
}
