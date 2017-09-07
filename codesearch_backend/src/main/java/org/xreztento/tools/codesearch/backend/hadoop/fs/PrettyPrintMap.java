package org.xreztento.tools.codesearch.backend.hadoop.fs;

import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

class PrettyPrintMap<K, V> extends LinkedHashMap<K, V> {

    interface MapPrinter<K, V> {
        String toString(K k, V v) throws Exception;
    }

    final MapPrinter<K, V> printer;

    PrettyPrintMap(int size, MapPrinter<K, V> printer) {
        super(size);
        this.printer = printer;
    }

    @Override
    public String toString() {

        Iterator<Map.Entry<K, V>> i = entrySet().iterator();
        if (!i.hasNext())
            return "";

        StringBuilder sb = new StringBuilder();
        try {
            for (;;) {
                Map.Entry<K, V> e = i.next();
                sb.append(printer.toString(e.getKey(), e.getValue()));
                if (!i.hasNext())
                    return sb.toString();
                sb.append("\n");
            }
        } catch (Exception ex) {
            throw new IllegalStateException("Cannot create String representation", ex);
        }
    }
}
