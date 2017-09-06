package org.xreztento.tools.codesearch.backend.analyzer.plugin.ast.impl;


import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.dom.*;
import org.xreztento.tools.codesearch.backend.analyzer.common.FileUtils;
import org.xreztento.tools.codesearch.backend.analyzer.plugin.ast.ASTExecutor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class JavaASTExecutor implements ASTExecutor{

    @Override
    public String[] getMethodAndBodyString(String file) {

        List<String> list = new ArrayList<String>();
        ASTParser parser = ASTParser.newParser(AST.JLS8);
        Map<String, String> compilerOptions = JavaCore.getOptions();
        compilerOptions.put(JavaCore.COMPILER_COMPLIANCE, JavaCore.VERSION_1_8);
        compilerOptions.put(JavaCore.COMPILER_SOURCE, JavaCore.VERSION_1_8);

        parser.setResolveBindings(false);
        parser.setBindingsRecovery(false);
        parser.setStatementsRecovery(false);       parser.setIgnoreMethodBodies(false);

        String code = FileUtils.getFileContent(file);

        char[] src = code.toCharArray();
        parser.setSource(src);
        CompilationUnit cu = (CompilationUnit) parser.createAST(null);

        ASTVisitor visitor = new ASTVisitor() {

            @Override
            public boolean visit(MethodDeclaration md) {

                list.add(md.toString());
                return true;
            }
        };

        cu.accept(visitor);
        return list.toArray(new String[0]);

    }
}
