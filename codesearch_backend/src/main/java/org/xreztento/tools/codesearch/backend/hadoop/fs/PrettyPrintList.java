package org.xreztento.tools.codesearch.backend.hadoop.fs;


import java.util.ArrayList;
import java.util.Iterator;

class PrettyPrintList<E> extends ArrayList<E> {

    interface ListPrinter<E> {
        String toString(E e) throws Exception;
    }

    final ListPrinter<E> printer;

    PrettyPrintList(ListPrinter<E> printer) {
        this.printer = printer;
    }

    PrettyPrintList(int size, ListPrinter<E> printer) {
        super(size);
        this.printer = printer;
    }

    @Override
    public String toString() {
        Iterator<E> i = iterator();
        if (!i.hasNext())
            return "";

        StringBuilder sb = new StringBuilder();
        try {
            for (;;) {
                E e = i.next();
                sb.append(printer.toString(e));
                if (!i.hasNext())
                    return sb.toString();
                sb.append("\n");
            }
        } catch (Exception ex) {
            throw new IllegalStateException("Cannot create String representation", ex);
        }
    }
}
