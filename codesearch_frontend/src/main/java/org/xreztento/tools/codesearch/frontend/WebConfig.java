package org.xreztento.tools.codesearch.frontend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
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
	
	 @Override
	    public void addResourceHandlers(ResourceHandlerRegistry registry) {
	        registry.addResourceHandler("/static/js/**").addResourceLocations("classpath:/static/js/")
	                .setCachePeriod(31556926);
	        registry.addResourceHandler("/static/css/**").addResourceLocations("classpath:/static/css/")
	                .setCachePeriod(31556926);
	        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/").setCachePeriod(31556926);
	        registry.addResourceHandler("/favicon.ico").addResourceLocations("classpath:/static/img/favicon.ico")
	                .setCachePeriod(31556926);
	        registry.addResourceHandler("/lib/**").addResourceLocations("classpath:/static").setCachePeriod(31556926);
	    }

}
