package org.xreztento.tools.codesearch.backend.analyzer.plugin.ast.model;

public class Parameter implements AstNodeModel{

	private final Type type;


	public Parameter(final Type type) {
		if (type == null) {
			throw new IllegalArgumentException();
		}

		this.type = type;
	}

	public Type getType() {
		return type;
	}

	@Override
	public String toString() {
		return String.valueOf(type);
	}

    @Override
    public String getSignature() {
        return toString();
    }
}
