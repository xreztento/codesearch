package org.xreztento.tools.codesearch.backend.crawler.utils;


import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringUtils {

    public static String getRangeStringByEdge(String content, String leftEdge, String rightEdge, int index){
        if(content.toLowerCase().contains(leftEdge.toLowerCase()))
        {
            ArrayList<String> paramList = new ArrayList<String>(2);
            Pattern pa = Pattern.compile(Pattern.quote(leftEdge) + "(.*?)" + Pattern.quote(rightEdge),Pattern.CASE_INSENSITIVE);
            Matcher ma = pa.matcher(content);
            while(ma.find()){

                paramList.add(ma.group(1));
            }
            return paramList.get(index);
        } else {
            return null;
        }

    }

}
