package org.xreztento.tools.codesearch.backend.configuration;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.xreztento.tools.codesearch.backend.engine.CodeSearchEngine;
import org.xreztento.tools.codesearch.backend.engine.InternalCodeSearchEngine;
import org.xreztento.tools.codesearch.backend.engine.impl.CodeSearchEngineImpl;

@Configuration
@ComponentScan(basePackages = { "org.xreztento.tools.codesearch.backend.engine.plugin" })
public class CodeSearchEngineConfiguration {
	@Autowired
	private ApplicationContext applicationContext;

	@Bean
	@ConditionalOnMissingBean(name = "codeSearchEngineBean")
	public CodeSearchEngine getEngineService() {
		CodeSearchEngineImpl codeSearchEngineImpl = new CodeSearchEngineImpl();

		Map<String, InternalCodeSearchEngine> map = applicationContext.getBeansOfType(InternalCodeSearchEngine.class);
		map.forEach((k, v) -> {
			if (v.getClass().getPackage().getName().equals("org.xreztento.tools.codesearch.backend.engine.plugin")) {
				codeSearchEngineImpl.addInternalCodeSearchEngine(v);
				System.out.println("Loading CodeSearchEngine " + v.getClass().getName());
			}
		});

		return codeSearchEngineImpl;
	}

}
