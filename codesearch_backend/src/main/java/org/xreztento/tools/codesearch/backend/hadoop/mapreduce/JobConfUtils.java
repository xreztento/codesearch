package org.xreztento.tools.codesearch.backend.hadoop.mapreduce;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.mapred.JobConf;

import java.util.Map;
import java.util.Properties;

public abstract class JobConfUtils {

    /**
     * Creates a new {@link org.apache.hadoop.mapred.JobConf} based on the given arguments.
     *
     * @param original initial configuration to read from. May be null.
     * @param properties properties object to add to the newly created configuration. May be null.
     * @return newly created configuration based on the input parameters.
     */
    public static JobConf createFrom(Configuration original, Properties properties) {
        JobConf cfg = null;
        if (original != null) {
            cfg = new JobConf(original);
        }
        else {
            cfg = new JobConf();
        }
        ConfigurationUtils.addProperties(cfg, properties);
        return cfg;
    }

    /**
     * Creates a new {@link org.apache.hadoop.conf.Configuration} by merging the given configurations.
     * Ordering is important - the second configuration overriding values in the first.
     *
     * @param one configuration to read from. May be null.
     * @param two configuration to read from. May be null.
     * @return the result of merging the two configurations.
     */
    public static JobConf merge(Configuration one, Configuration two) {
        if (one == null) {
            if (two == null) {
                return new JobConf();
            }
            return new JobConf(two);
        }

        JobConf c = new JobConf(one);

        if (two == null) {
            return c;
        }

        for (Map.Entry<String, String> entry : two) {
            c.set(entry.getKey(), entry.getValue());
        }

        return c;
    }

}
