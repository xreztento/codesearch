package org.xreztento.tools.codesearch.backend.configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.xreztento.tools.codesearch.backend.hadoop.fs.FsShell;

@Configuration
public class HadoopConfiguration {

    @Value("${hadoop.config.fs.defaultFS}")
    private String defaultFS = null;

    @Value("${hadoop.config.tmp.dir}")
    private String tmpDir = null;

    @Bean
    public FsShell fsShell(){
        org.apache.hadoop.conf.Configuration configuration = new org.apache.hadoop.conf.Configuration();
        configuration.set("fs.defaultFS", defaultFS);
        configuration.set("hadoop.tmp.dir", tmpDir);
        configuration.set("fs.hdfs.impl", "org.apache.hadoop.hdfs.DistributedFileSystem");
        FsShell shell = new FsShell(configuration);
        return shell;
    }
}
