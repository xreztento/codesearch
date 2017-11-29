package org.xreztento.tools.codesearch.backend.analyzer.plugin.ast.model;

import org.xreztento.tools.codesearch.backend.analyzer.plugin.ast.util.Assert;
import org.xreztento.tools.codesearch.backend.analyzer.plugin.ast.util.Strings;

import java.util.Collections;
import java.util.List;

public class Type {

	private final String name;
    private List<TypeArgument> typeArguments = null;


	public Type(final String name, final List<TypeArgument> typeArguments) {
        Assert.assertStringNotEmpty(name);
		this.name = name;
        if(typeArguments != null){
            this.typeArguments = Collections.unmodifiableList(typeArguments);
        }
	}

	public String getName() {
		return name;
	}

    public List<TypeArgument> getTypeArguments() {
        return typeArguments;
    }

    @Override
	public boolean equals(final Object obj) {
		if (this == obj) {
			return true;
		}

		if (!(obj instanceof Type)) {
			return false;
		}

		final Type other = (Type) obj;

		return this.name.equals(other.name);
	}

	@Override
	public int hashCode() {
        if(this.typeArguments != null){
            return (name + "<" +Strings.cat(this.typeArguments) + ">").hashCode();
        }

        return name.hashCode();
	}

	@Override
	public String toString() {
        if(this.typeArguments != null){
            return name + "<" +Strings.cat(this.typeArguments) + ">";
        }
        return name;
	}

}