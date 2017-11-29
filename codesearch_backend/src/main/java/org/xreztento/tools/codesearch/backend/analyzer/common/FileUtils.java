package org.xreztento.tools.codesearch.backend.analyzer.common;


import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;

public class FileUtils {

    public static void getFileByPostfixAsList(List<File> fileList, String path, String postfix) {
        File dir = new File(path);
        File[] files = dir.listFiles();
        if (files != null) {
            for (int i = 0; i < files.length; i++) {
                String fileName = files[i].getName();
                if (files[i].isDirectory()) {
                    getFileByPostfixAsList(fileList, files[i].getAbsolutePath(), postfix);
                } else if (fileName.endsWith(postfix)) {
                    fileList.add(files[i]);
                } else {
                    continue;
                }
            }
        }
        return;
    }

    public static String getFileContent(String file){
        FileReader reader = null;

        char[] buffer = new char[1];
        StringBuffer sb = new StringBuffer();
        try {
            reader = new FileReader(file);
            while(reader.read(buffer) != -1){
                sb.append(buffer);
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
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
        return sb.toString().trim();
    }
}
