package org.xreztento.tools.codesearch.backend.analyzer.plugin.ast.model;


public class TypeArgument {
    private final String name;


    public TypeArgument(final String name) {
        if (name.trim().isEmpty()) {
            throw new IllegalArgumentException();
        }

        this.name = name;
    }

    public String getName() {
        return name;
    }

    @Override
    public boolean equals(final Object obj) {
        if (this == obj) {
            return true;
        }

        if (!(obj instanceof Type)) {
            return false;
        }

        final TypeArgument other = (TypeArgument) obj;

        return this.name.equals(other.name);
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }

    @Override
    public String toString() {
        return name;
    }
}
