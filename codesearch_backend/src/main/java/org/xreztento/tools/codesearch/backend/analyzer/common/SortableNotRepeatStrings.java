package org.xreztento.tools.codesearch.backend.analyzer.common;

import java.util.Collection;
import java.util.Comparator;
import java.util.concurrent.ConcurrentSkipListSet;

public class SortableNotRepeatStrings {
	
	private Collection<String> collection = null;
	private Comparator<String> comparator = null;
	
	public SortableNotRepeatStrings(Comparator<String> comparator){
		this.comparator = comparator;
        initialize();
	}		
	
	public SortableNotRepeatStrings(){
		this.comparator = Comparator.naturalOrder();
        initialize();
	}
	
	private void initialize(){
		if(this.collection == null){
			this.collection = new ConcurrentSkipListSet<String>(this.comparator);
		}
	}
	
	public void addString(String str){
		if(this.collection == null){
			this.collection = new ConcurrentSkipListSet<String>(this.comparator);
		}
		
		this.collection.add(str);
	}
	
	public String getSortedStrings(){
		return this.collection.toString();
	}
	
}
