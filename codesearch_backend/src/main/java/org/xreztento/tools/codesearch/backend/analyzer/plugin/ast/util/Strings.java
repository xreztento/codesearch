package org.xreztento.tools.codesearch.backend.analyzer.plugin.ast.util;

public final class Strings {

	public static final String DEFAULT_SEPARATOR = ", ";

	private Strings() {
		// this method should only contain static members
		throw new IllegalStateException();
	}

	public static <T> String cat(final Iterable<T> ts) {
        if(ts != null){
            return cat(ts, DEFAULT_SEPARATOR);
        }
        return "";
	}

	public static <T> String cat(final Iterable<T> ts, final String separator) {
		final StringBuilder sb = new StringBuilder();

		boolean first = true;
		for (final T t : ts) {
			if (first) {
				first = false;
			} else {
				sb.append(separator);
			}

			sb.append(t);
		}

		return sb.toString();
	}

	public static boolean isCapital(String s) {
		if (s == null || s.isEmpty())
			return false;
		return Character.isUpperCase(s.charAt(0));
	}

	public static boolean isNotCapital(String s) {
		return !isCapital(s);
	}

	public static String simpleName(String name) {
		int idxDot = name.lastIndexOf('.');
		if (idxDot < 0) {
			return name;
		}
		return name.substring(idxDot + 1);
	}

	public static String qualifier(String name) {
		int idxDot = name.lastIndexOf('.');
		if (idxDot < 0) {
			return "";
		}
		return name.substring(0, idxDot);
	}

}