package org.xreztento.tools.codesearch.backend.hadoop.fs;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.LinkedList;

import org.apache.hadoop.conf.Configurable;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.springframework.beans.BeanUtils;
import org.springframework.util.ClassUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.util.ReflectionUtils;
import org.xreztento.tools.codesearch.backend.hadoop.HadoopException;

abstract class FsShellPermissions {

    enum Op {
        CHOWN("-chown"), CHMOD("-chmod"), CHGRP("-chgrp");

        private final String cmd;

        Op(String cmd) {
            this.cmd = cmd;
        }

        public String getCmd() {
            return cmd;
        }
    }

    static <T> T[] concatAll(T[] first, T[]... rest) {
        // can add some sanity checks
        int totalLength = first.length;
        for (T[] array : rest) {
            totalLength += array.length;
        }
        T[] result = Arrays.copyOf(first, totalLength);
        int offset = first.length;
        for (T[] array : rest) {
            System.arraycopy(array, 0, result, offset, array.length);
            offset += array.length;
        }
        return result;
    }

    static void changePermissions(FileSystem fs, Configuration config, Op op, boolean recursive, String group, String... uris) {
        String[] argvs = new String[0];

        if (recursive) {
            ObjectUtils.addObjectToArray(argvs, "-R");
        }
        argvs = concatAll(argvs, new String[] { group }, uris);

        Class<?> cmd = ClassUtils.resolveClassName("org.apache.hadoop.fs.shell.Command", config.getClass().getClassLoader());
        Class<?> targetClz = null;
        switch (op) {
            case CHOWN:
                targetClz = ClassUtils.resolveClassName("org.apache.hadoop.fs.FsShellPermissions$Chown", config.getClass().getClassLoader());
                break;
            case CHGRP:
                targetClz = ClassUtils.resolveClassName("org.apache.hadoop.fs.FsShellPermissions$Chgrp", config.getClass().getClassLoader());
                break;
            case CHMOD:
                targetClz = ClassUtils.resolveClassName("org.apache.hadoop.fs.FsShellPermissions$Chmod", config.getClass().getClassLoader());
                break;
            default:
                throw new IllegalArgumentException(op + " is not a valid FsShell operation for FsShellPermissions");
        }
        Configurable target = (Configurable) BeanUtils.instantiate(targetClz);
        target.setConf(config);
        // run(String...) swallows the exceptions - re-implement it here
        //
        LinkedList<String> args = new LinkedList<String>(Arrays.asList(argvs));
        try {
            Method m = ReflectionUtils.findMethod(cmd, "processOptions", LinkedList.class);
            ReflectionUtils.makeAccessible(m);
            ReflectionUtils.invokeMethod(m, target, args);
            m = ReflectionUtils.findMethod(cmd, "processRawArguments", LinkedList.class);
            ReflectionUtils.makeAccessible(m);
            ReflectionUtils.invokeMethod(m, target, args);
        } catch (IllegalStateException ex){
            throw new HadoopException("Cannot change permissions/ownership " + ex);
        }
    }
}
