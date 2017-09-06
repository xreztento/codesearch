package org.xreztento.tools.codesearch.backend.helper.os;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.lang.ProcessBuilder.Redirect;
import java.util.concurrent.TimeUnit;

public class OSHelper {
	private static String encode = null;

	// 获取系统中文字符集
	static {
		encode = System.getProperty("sun.jnu.encoding");
	}

	/**
	 * 读取一次输入流
	 * 
	 * @param in
	 *            输入流
	 * @param sb
	 *            保存对象
	 * @throws IOException
	 */
	private static void read(BufferedInputStream in, StringBuffer sb) throws IOException {
		byte[] buffer = new byte[in.available()];
		if (in.read(buffer) != -1) {
			String feedback = new String(buffer, encode);
			sb.append(feedback);
		}

	}

	/**
	 * 执行系统命令
	 * 
	 * @param command
	 *            命令及参数
	 * @return
	 */
	public static ProcessRunningResult runSystemCommand(String... command) {
		Process p = null;
		BufferedInputStream in = null;
		int exitValue;
        ProcessRunningResult prr = new ProcessRunningResult();
		StringBuffer sb = new StringBuffer();

		try {
			ProcessBuilder pb = new ProcessBuilder(command);
			pb.redirectErrorStream(true);// 错误输入流与标准输入流合并
			pb.redirectOutput(Redirect.PIPE);// 输入流重定向使用管道方式

			p = pb.start();
			in = (BufferedInputStream) p.getInputStream();
			while (true) {

				read(in, sb);

				if (p.waitFor(1, TimeUnit.MILLISECONDS)) {// 一旦被执行程序退出，将余下的输入流读完，并设置结果和退出状态数据

					read(in, sb);
					prr.setFeedback(sb.toString());
					exitValue = p.exitValue();
					prr.setExitValue(exitValue);
					break;
				}
			}

		} catch (Exception e) {
			e.printStackTrace();

		} finally {
			p.destroy();
			try {
				in.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		return prr;
	}
}
