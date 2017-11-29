package org.xreztento.tools.codesearch.backend.analyzer.plugin.ast.util;

import java.util.Collection;
import java.util.Iterator;

public class XCollections {

	private XCollections() {
		// this class should only contain static members
		throw new IllegalStateException();
	}

	public static <T> boolean contains(final Collection<T> c, final T o,
			final Equalator<T> e) {
		for (final T t : c) {
			if (!e.equalTo(t, o)) {
				continue;
			}

			return true;
		}

		return false;
	}

	public static <T> boolean retainAll(final Collection<T> c1,
			final Collection<T> c2, final Equalator<T> e) {
		boolean modified = false;
		
		for(final Iterator<T> it = c1.iterator(); it.hasNext();){
			final T o = it.next();
			
			if(contains(c2, o, e)){
				continue;
			}
			
			it.remove();
			modified = true;
		}
		
		return modified;
	}

}
