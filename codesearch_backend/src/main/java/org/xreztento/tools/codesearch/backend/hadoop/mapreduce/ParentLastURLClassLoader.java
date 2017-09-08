package org.xreztento.tools.codesearch.backend.hadoop.mapreduce;
import java.io.IOException;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;

class ParentLastURLClassLoader extends URLClassLoader {

    private final ClassLoader system;

    public ParentLastURLClassLoader(URL[] classpath, ClassLoader parent) {
        super(classpath, parent);
        ClassLoader sys = getSystemClassLoader();

        while (sys.getParent() != null) {
            sys = sys.getParent();
        }

        system = sys;
    }


    @Override
    protected synchronized Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException {
        // First, check if the class has already been loaded
        Class<?> c = findLoadedClass(name);
        if (c == null) {
            // always check system class loader (for jvm classes & co)
            if (system != null) {
                try {
                    c = system.loadClass(name);
                } catch (ClassNotFoundException ignored) {
                }
            }
            if (c == null) {
                try {
                    // load local
                    c = findClass(name);
                } catch (ClassNotFoundException e) {
                    // fall back to parent
                    c = super.loadClass(name, resolve);
                }
            }
        }
        if (resolve) {
            resolveClass(c);
        }
        return c;
    }

    @Override
    public URL getResource(String name) {
        // same delegation as with load class
        URL url = null;
        if (system != null) {
            url = system.getResource(name);
        }
        if (url == null) {
            url = findResource(name);
            if (url == null) {
                url = super.getResource(name);
            }
        }
        return url;
    }

    @Override
    public Enumeration<URL> getResources(String name) throws IOException {
        List<URL> urls = new ArrayList<URL>();
        if (system != null) {
            urls.addAll(Collections.list(system.getResources(name)));
        }
        urls.addAll(Collections.list(findResources(name)));

        ClassLoader parent = getParent();
        if (parent != null) {
            urls.addAll(Collections.list(parent.getResources(name)));
        }

        return Collections.enumeration(urls);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("ParentLastURLCL\r\nURLs: ");
        sb.append(Arrays.asList(getURLs()));
        sb.append("\nParent CL: ");
        sb.append(getParent());
        sb.append("\nSystem CL: ");
        sb.append(system);
        sb.append("\n");
        return (sb.toString());
    }
}
