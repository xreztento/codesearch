package org.xreztento.tools.codesearch.frontend.web;

import javax.servlet.http.HttpSession;

public interface GlobalService {

    public HttpSession getSession();

    public void set(String key, Object object);

    public Object get(String key);
}
