package org.xreztento.tools.codesearch.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.mvc.WebContentInterceptor;

@Component
public class WebConfig extends WebMvcConfigurerAdapter{
	@Bean
    WebContentInterceptor initWebContentInterceptor() {
        WebContentInterceptor webContentInterceptor = new WebContentInterceptor();
        webContentInterceptor.setCacheSeconds(0);
        webContentInterceptor.setUseCacheControlHeader(true);
        return webContentInterceptor;
    }
	

}
