package org.xreztento.tools.codesearch.backend.analyzer.plugin.ast.model;

import org.xreztento.tools.codesearch.backend.analyzer.plugin.ast.util.Assert;
import org.xreztento.tools.codesearch.backend.analyzer.plugin.ast.util.Strings;

import java.util.Collections;
import java.util.List;

public class MethodDeclaration implements AstNodeModel{
	private final Visibility visibility;

	private final String name;

	private final Type returnType;

	private List<Parameter> parameters = null;

    private List<TypeParameter> typeParameters = null;

    private Block block = null;


	public MethodDeclaration(final Visibility visibility, final String name,
			final Type returnType, final List<Parameter> parameters,
            final List<TypeParameter> typeParameters,
			final Block block) {

        Assert.assertNotNull(visibility);
        Assert.assertStringNotEmpty(name);
        Assert.assertNotNull(returnType);

		this.visibility = visibility;
		this.name = name;
		this.returnType = returnType;
        if(parameters != null){
            this.parameters = Collections.unmodifiableList(parameters);
        }
        if(typeParameters != null){
            this.typeParameters = Collections.unmodifiableList(typeParameters);
        }
        this.block = block;
	}

	public Visibility getVisibility() {
		return visibility;
	}

	public String getName() {
		return name;
	}

	public Type getReturnType() {
		return returnType;
	}

	public List<Parameter> getParameters() {
		return parameters;
	}

    public List<TypeParameter> getTypeParameters() {
        return typeParameters;
    }

    public Block getBlock() {
        return block;
    }

    @Override
	public String toString() {
		return String.valueOf(returnType) + " " + name + "("
				+ Strings.cat(parameters) + ")";
}

    @Override
    public String getSignature() {
        return toString();
    }
}
