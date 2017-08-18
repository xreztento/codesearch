package org.xreztento.tools.codesearch.frontend.engine;

import java.util.ArrayList;
import java.util.List;

public class CodeFragment {
	public final static int UP_KEYWORD_LINE_SIZE = 5;
	public final static int DOWN_KEYWORD_LINE_SIZE = 5;
	
	private List<CodeLine> fragment = new ArrayList<CodeLine>(UP_KEYWORD_LINE_SIZE + DOWN_KEYWORD_LINE_SIZE);
	
	public void addCodeLine(CodeLine codeLine){
		fragment.add(codeLine);
	}

	public List<CodeLine> getFragment() {
		return fragment;
	}
	
}
