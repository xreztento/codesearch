package org.xreztento.tools.codesearch.backend.crawler.common.http;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import javax.net.SocketFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import org.apache.http.HttpHost;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.protocol.HttpContext;

public class NoTrustSSLProtocolSocketFactory implements ConnectionSocketFactory{
	 private SSLContext sslcontext = null;   
     
     private SSLContext createSSLContext() {
    	 SSLContext sslcontext=null;   
         try {   
             sslcontext = SSLContext.getInstance("SSL");   
             sslcontext.init(null, new TrustManager[]{new TrustAnyTrustManager()}, new java.security.SecureRandom());   
         } catch (NoSuchAlgorithmException e) {   
             e.printStackTrace();   
         } catch (KeyManagementException e) {   
             e.printStackTrace();
         }   
         return sslcontext;   
     }   
      
     private SSLContext getSSLContext() {   
         if (this.sslcontext == null) {   
             this.sslcontext = createSSLContext();   
         }   
         return this.sslcontext;
     }   
     
     private static class TrustAnyTrustManager implements X509TrustManager {   
         
         public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {   
         }   
     
         public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {   
         }   
     
         public X509Certificate[] getAcceptedIssuers() {   
             return new X509Certificate[]{};   
         }   
     }

     @Override
     public Socket connectSocket(int timeout, Socket socket, HttpHost target,
			InetSocketAddress remoteAddress, InetSocketAddress localAddress, HttpContext clientContext)
			throws IOException {
		if (clientContext == null) {   
           throw new IllegalArgumentException("null");   
       }   
       
       SocketFactory socketfactory = getSSLContext().getSocketFactory();   
       socket = socketfactory.createSocket();
       socket.bind(localAddress);   
       socket.connect(remoteAddress, timeout);   
       return socket;
	}

     @Override
     public Socket createSocket(HttpContext clientContext) throws IOException {
		if (clientContext == null) {   
           throw new IllegalArgumentException("null");   
       }
		return getSSLContext().getSocketFactory().createSocket();
		
     }
}
