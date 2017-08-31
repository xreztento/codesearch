package org.xreztento.tools.codesearch.backend.crawler.utils;


import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringUtils {

    public static String getRangeStringByEdge(String content, String leftEdge, String rightEdge, int index){
        if(content.contains(leftEdge) && content.contains(rightEdge))
        {
            ArrayList<String> paramList = new ArrayList<String>(2);
            Pattern pa = Pattern.compile(Pattern.quote(leftEdge) + "(.*?)" + Pattern.quote(rightEdge),Pattern.DOTALL);
            Matcher ma = pa.matcher(content);
            while(ma.find()){

                paramList.add(ma.group(1));
            }
            return paramList.get(index);
        } else {
            return null;
        }

    }


    public static String[] getRangeStringsByEdge(String content, String leftEdge, String rightEdge){
        if(content.contains(leftEdge) && content.contains(rightEdge))
        {
            ArrayList<String> paramList = new ArrayList<String>(2);
            Pattern pa = Pattern.compile(Pattern.quote(leftEdge) + "(.*?)" + Pattern.quote(rightEdge),Pattern.DOTALL);
            Matcher ma = pa.matcher(content);
            while(ma.find()){

                paramList.add(ma.group(1));
            }
            return paramList.toArray(new String[0]);
        } else {
            return null;
        }

    }


    public static String trimRegexMatchGroup(String source, String pattern){
        Pattern p = Pattern.compile(pattern, Pattern.DOTALL);
        Matcher matcher = p.matcher(source);
        while(matcher.find()) {
            int start = matcher.start(1);
            int end = matcher.end(1);
            int num = end - start;
            String space = "";
            for(int i = 0; i < num; i++){
                space += " ";
            }
            source = source.substring(0, start) + space + source.substring(end);
        }
        source = source.replace(" ", "");
        return source;

    }

    public static String truncateRegexMatchGroup(String source, String pattern) {
        Pattern p = Pattern.compile(pattern, Pattern.MULTILINE);
        Matcher matcher = p.matcher(source);
        if (matcher.find()) {
            int start = matcher.start(1);
            int end = matcher.end(1);
            String target = source.substring(0, start) + source.substring(end);
            return target;
        }

        return source;
    }

}
