package org.xreztento.tools.codesearch.backend.analyzer.common;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Collection;

public class SortableStrings {
	private Collection<String> collection = null;
	private Comparator<String> comparator = null;
	
	public SortableStrings(Comparator<String> comparator){
		this.comparator = comparator;
	}		
	
	public SortableStrings(){
		this.comparator = Comparator.naturalOrder();
	}
	
	public void addString(String str){
		if(this.collection == null){
			this.collection = new ArrayList<String>();
		}
		this.collection.add(str);
	}
	
	public String getSortedStrings(){
		Collections.sort((ArrayList<String>)collection, this.comparator);
		return this.collection.toString();
	}
	
	public String getSortedStringsByAsc(){
		this.comparator = new Comparator<String>(){

			@Override
			public int compare(String o1, String o2) {
				return o1.compareTo(o2);
			}
			
		};
		return getSortedStrings();
	}
	
	public String getSortedStringsByDesc(){
		this.comparator = new Comparator<String>(){

			@Override
			public int compare(String o1, String o2) {
				return -o1.compareTo(o2);
			}
			
		};
		return getSortedStrings();
	}
	
}
