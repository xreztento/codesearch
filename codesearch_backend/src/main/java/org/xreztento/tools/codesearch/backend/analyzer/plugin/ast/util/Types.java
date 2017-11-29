package org.xreztento.tools.codesearch.backend.analyzer.plugin.ast.util;

import java.util.HashSet;
import java.util.Set;

public final class Types {

	private static final Set<String> BUILT_IN_TYPES = new HashSet<String>();

	static {
		BUILT_IN_TYPES.add("byte");
		BUILT_IN_TYPES.add("char");
		BUILT_IN_TYPES.add("short");
		BUILT_IN_TYPES.add("int");
		BUILT_IN_TYPES.add("long");
		BUILT_IN_TYPES.add("float");
		BUILT_IN_TYPES.add("double");
		BUILT_IN_TYPES.add("void");
	}

	private Types() {
		// this class should only contain static members
		throw new IllegalStateException();
	}

	public static boolean isAtomicType(final String typeName) {
		final String rawType;
		if (typeName.endsWith("[]")) {
			rawType = typeName.substring(0, typeName.length() - "[]".length());
		} else {
			rawType = typeName;
		}

		return BUILT_IN_TYPES.contains(rawType);
	}

}
