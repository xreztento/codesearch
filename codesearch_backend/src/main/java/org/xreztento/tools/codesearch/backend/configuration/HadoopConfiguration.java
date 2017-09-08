package org.xreztento.tools.codesearch.backend.configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapred.FileInputFormat;
import org.apache.hadoop.mapred.FileOutputFormat;
import org.apache.hadoop.mapred.JobConf;
import org.apache.hadoop.mapreduce.Job;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.xreztento.tools.codesearch.backend.analyzer.hadoop.TestMapper;
import org.xreztento.tools.codesearch.backend.analyzer.hadoop.TestReducer;
import org.xreztento.tools.codesearch.backend.hadoop.fs.FsShell;
import org.xreztento.tools.codesearch.backend.hadoop.fs.SimplerFileSystem;
import org.xreztento.tools.codesearch.backend.hadoop.mapreduce.JobRunner;

import java.io.IOException;

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

    @Bean
    public SimplerFileSystem simplerFileSystem(){
        org.apache.hadoop.conf.Configuration configuration = new org.apache.hadoop.conf.Configuration();
        configuration.set("fs.defaultFS", defaultFS);
        configuration.set("hadoop.tmp.dir", tmpDir);
        configuration.setBoolean("dfs.support.append", true);
        configuration.set("fs.hdfs.impl", "org.apache.hadoop.hdfs.DistributedFileSystem");
        try {
            SimplerFileSystem simplerFileSystem = new SimplerFileSystem(new Path("/").getFileSystem(configuration));
            return simplerFileSystem;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Bean
    public JobRunner jobRunner(){
        JobRunner jobRunner = new JobRunner();

        try {
            JobConf configuration = new JobConf();
            configuration.set("fs.defaultFS", defaultFS);
            configuration.set("hadoop.tmp.dir", tmpDir);
            configuration.set("mapreduce.framework.name", "yarn");
            configuration.set("yarn.nodemanager.aux-services", "mapreduce_shuffle");
            FileInputFormat.addInputPath(configuration, new Path("/benchmarks"));
            FileOutputFormat.setOutputPath(configuration, new Path("/output"));
            Job job = Job.getInstance(configuration);
            job.setJarByClass(HadoopConfiguration.class);
            job.setJobName("TestJob");
            job.setMapperClass(TestMapper.class);
            job.setReducerClass(TestReducer.class);


            job.setOutputKeyClass(Text.class);
            job.setOutputValueClass(IntWritable.class);
            jobRunner.setJob(job);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return jobRunner;
    }
}
