package org.xreztento.tools.codesearch.backend.helper.os;

public class ProcessRunningResult {
	private String feedback = null;
	private int exitValue;

	public int getExitValue() {
		return exitValue;
	}

	public void setExitValue(int exitValue) {
		this.exitValue = exitValue;
	}

	public String getFeedback() {
		return feedback;
	}

	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}

	public void appendFeedback(String feedback) {
		this.feedback += feedback;
	}
}
