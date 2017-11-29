package org.xreztento.tools.codesearch.backend.analyzer.common;

import java.io.File;
import java.io.FileFilter;

public class JavaSourceFileFilter  implements FileFilter {
    @Override
    public boolean accept(File file) {
        return file.getPath().endsWith(".java") && !file.getName().equals("package-info.java");
    }
}
