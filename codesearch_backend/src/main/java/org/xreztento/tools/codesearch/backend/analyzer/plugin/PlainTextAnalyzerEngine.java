package org.xreztento.tools.codesearch.backend.analyzer.plugin;


import org.apache.commons.codec.digest.DigestUtils;
import org.xreztento.tools.codesearch.backend.analyzer.InternalAnalyzerEngine;

public class PlainTextAnalyzerEngine implements InternalAnalyzerEngine{
    @Override
    public void startAnalyze() {
        String str = DigestUtils.sha1Hex("");
    }

    @Override
    public void stopAnalyze() {

    }
}
