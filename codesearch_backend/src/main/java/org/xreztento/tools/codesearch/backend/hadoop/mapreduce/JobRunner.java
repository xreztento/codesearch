package org.xreztento.tools.codesearch.backend.hadoop.mapreduce;

import java.util.Collection;
import java.util.concurrent.Callable;

import org.apache.hadoop.mapreduce.Job;
public class JobRunner extends JobExecutor implements Callable<Void> {

    private boolean runAtStartup = false;
    private Iterable<Callable<?>> preActions;
    private Iterable<Callable<?>> postActions;

    @Override
    public void afterPropertiesSet() throws Exception {
        super.afterPropertiesSet();

        if (runAtStartup) {
            call();
        }
    }

    @Override
    public Void call() throws Exception {
        // pre action
        invoke(preActions);
        startJobs();
        // post action
        invoke(postActions);
        return null;
    }

    /**
     * Indicates whether the jobs should be submitted at startup (default) or not.
     *
     * @param runAtStartup The runAtStartup to set.
     */
    public void setRunAtStartup(boolean runAtStartup) {
        this.runAtStartup = runAtStartup;
    }

    /**
     * Actions to be invoked before running the action.
     *
     * @param actions actions
     */
    public void setPreAction(Collection<Callable<?>> actions) {
        this.preActions = actions;
    }

    /**
     * Actions to be invoked after running the action.
     *
     * @param actions actions
     */
    public void setPostAction(Collection<Callable<?>> actions) {
        this.postActions = actions;
    }

    private void invoke(Iterable<Callable<?>> actions) throws Exception {
        if (actions != null) {
            for (Callable<?> action : actions) {
                action.call();
            }
        }
    }
}
