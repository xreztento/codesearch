package org.xreztento.tools.codesearch.frontend.engine;

public class CodeSearchEngineResult {
	private int count;
	private int paginationNum;
	private CodeResult[] codeResults;
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public int getPaginationNum() {
		return paginationNum;
	}
	public void setPaginationNum(int paginationNum) {
		this.paginationNum = paginationNum;
	}
	public CodeResult[] getCodeResults() {
		return codeResults;
	}
	public void setCodeResults(CodeResult[] codeResults) {
		this.codeResults = codeResults;
	}
	
	
}
