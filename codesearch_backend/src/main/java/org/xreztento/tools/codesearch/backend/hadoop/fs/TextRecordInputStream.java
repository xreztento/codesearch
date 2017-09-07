package org.xreztento.tools.codesearch.backend.hadoop.fs;


import java.io.IOException;
import java.io.InputStream;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.DataInputBuffer;
import org.apache.hadoop.io.DataOutputBuffer;
import org.apache.hadoop.io.SequenceFile;
import org.apache.hadoop.io.Writable;
import org.apache.hadoop.io.WritableComparable;
import org.apache.hadoop.util.ReflectionUtils;

class TextRecordInputStream extends InputStream {

    SequenceFile.Reader r;
    WritableComparable<?> key;
    Writable val;

    DataInputBuffer inbuf;
    DataOutputBuffer outbuf;

    public TextRecordInputStream(Path p, FileSystem fs, Configuration configuration) throws IOException {
        r = new SequenceFile.Reader(fs, p, configuration);
        key = ReflectionUtils.newInstance(r.getKeyClass().asSubclass(WritableComparable.class), configuration);
        val = ReflectionUtils.newInstance(r.getValueClass().asSubclass(Writable.class), configuration);
        inbuf = new DataInputBuffer();
        outbuf = new DataOutputBuffer();
    }

    public int read() throws IOException {
        int ret;
        if (null == inbuf || -1 == (ret = inbuf.read())) {
            if (!r.next(key, val)) {
                return -1;
            }
            byte[] tmp = key.toString().getBytes();
            outbuf.write(tmp, 0, tmp.length);
            outbuf.write('\t');
            tmp = val.toString().getBytes();
            outbuf.write(tmp, 0, tmp.length);
            outbuf.write('\n');
            inbuf.reset(outbuf.getData(), outbuf.getLength());
            outbuf.reset();
            ret = inbuf.read();
        }
        return ret;
    }


    public void close() throws IOException {
        r.close();
        super.close();
    }
}