package org.xreztento.tools.codesearch.backend.hadoop.mapreduce;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.hadoop.conf.Configuration;
import org.springframework.core.io.Resource;
abstract class JobGenericOptions {

    final Log log = LogFactory.getLog(getClass());

    Resource[] files, libJars, archives;
    String user;


    /**
     * Sets the jar files to include in the classpath.
     * Note that a pattern can be used (e.g. <code>mydir/*.jar</code>), which the
     * Spring container will automatically resolve.
     *
     * @param libJars The jar files to include in the classpath.
     */
    public void setLibs(Resource... libJars) {
        this.libJars = libJars;
    }

    /**
     * Sets the files to be copied to the map reduce cluster.
     * Note that a pattern can be used (e.g. <code>mydir/*.txt</code>), which the
     * Spring container will automatically resolve.
     *
     * @param files The files to copy.
     */
    public void setFiles(Resource... files) {
        this.files = files;
    }

    /**
     * Sets the archives to be unarchive to the map reduce cluster.
     * Note that a pattern can be used (e.g. <code>mydir/*.zip</code>), which the
     * Spring container will automatically resolve.
     *
     * @param archives The archives to unarchive on the compute machines.
     */
    public void setArchives(Resource... archives) {
        this.archives = archives;
    }


    void buildGenericOptions(Configuration cfg) {
        // set the GenericOptions properties manual to avoid the changes between Hadoop 1.x and 2.x
        cfg.setBoolean("mapred.used.genericoptionsparser", true);

        ConfigurationUtils.addFiles(cfg, files);
        ConfigurationUtils.addLibs(cfg, libJars);
        ConfigurationUtils.addArchives(cfg, archives);
    }

    /**
     * Sets the user impersonation (optional) for running this job.
     * Should be used when running against a Hadoop Kerberos cluster.
     *
     * @param user user/group information
     */
    public void setUser(String user) {
        this.user = user;
    }
}