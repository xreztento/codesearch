package org.xreztento.tools.codesearch.backend.analyzer.plugin.ast.model;

import java.util.List;

public class Block implements AstNodeModel{
    private final List<String> implSource = null;

    public Block(){

    }

    public List<String> getImplSource() {
        return implSource;
    }


    @Override
    public String getSignature() {
        return null;
    }
}
