package org.xreztento.tools.codesearch.frontend;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.ErrorPage;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.RequestContextFilter;
import org.xreztento.tools.codesearch.frontend.web.impl.RequestFilter;

@SpringBootApplication
public class Application {
	public static final Logger LOGGER = LoggerFactory.getLogger(Application.class);

	@Bean
	public RequestContextFilter registrationRequestFilter() {

		RequestContextFilter requestContextFilter = new RequestFilter();

		return requestContextFilter;

	}

	@Bean
	public EmbeddedServletContainerCustomizer containerCustomizer() {
		return new OnboardCustomizer();
	}

	private static class OnboardCustomizer implements EmbeddedServletContainerCustomizer {

		public void customize(ConfigurableEmbeddedServletContainer container) {
			container.addErrorPages(new ErrorPage(HttpStatus.BAD_REQUEST, "/error/404"));
			container.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/error/404"));
			container.addErrorPages(new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR, "/error/500"));
			container.addErrorPages(new ErrorPage(HttpStatus.FORBIDDEN, "/error/403"));
		}

	}

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}