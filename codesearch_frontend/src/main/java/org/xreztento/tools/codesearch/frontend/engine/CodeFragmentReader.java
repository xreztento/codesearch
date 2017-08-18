package org.xreztento.tools.codesearch.frontend.engine;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import org.apache.commons.lang3.StringEscapeUtils;

import java.io.BufferedReader;


public class CodeFragmentReader {
	
	public static CodeFragment read(File file, Integer[] keyWordRowNums){
		CodeFragment fragment = new CodeFragment();
		int top = keyWordRowNums[0] - CodeFragment.UP_KEYWORD_LINE_SIZE < 0 ? 0 : keyWordRowNums[0] - CodeFragment.UP_KEYWORD_LINE_SIZE;
		int bottom = keyWordRowNums[keyWordRowNums.length - 1] + CodeFragment.DOWN_KEYWORD_LINE_SIZE;
		BufferedReader reader = null;
		if(file.isFile()){
			try {
				reader = new BufferedReader(new FileReader(file));
				int rowNum = 1;
				String row = null;
				while((row = reader.readLine()) != null){
					
					if(rowNum > bottom){
						break;
					}
					
					if(rowNum >= top && rowNum <= bottom){
						CodeLine line = new CodeLine();
						line.setRowNum(rowNum);
						line.setRow(StringEscapeUtils.escapeHtml4(row));
						if(isKeyWordRowNum(keyWordRowNums, rowNum)){
							line.setKeyWord(true);
						} else {
							line.setKeyWord(false);
						}
						fragment.addCodeLine(line);
					}
					
					rowNum++;
				}
				
				
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e){
				e.printStackTrace();
			} finally {
				if(reader != null){
					try {
						reader.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}
		
		return fragment;
	}
	
	private static boolean isKeyWordRowNum(Integer[] keyWordRowNums, int rowNum){
		for(int i = 0; i < keyWordRowNums.length; i++){
			if(keyWordRowNums[i] == rowNum){
				return true;
			}
		}
		
		return false;
	}
}
