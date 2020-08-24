package com.github.proyeception.benito;

import com.github.proyeception.benito.config.ServiceContext;
import com.github.proyeception.benito.utils.LoggingFilter;
import org.eclipse.jetty.jmx.MBeanContainer;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.gzip.GzipHandler;
import org.eclipse.jetty.servlet.FilterHolder;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.util.log.Log;
import org.joda.time.DateTimeZone;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.DispatcherType;
import java.lang.management.ManagementFactory;
import java.util.EnumSet;
import java.util.TimeZone;

@SpringBootApplication
public class Benito {
    private static final String GMT = "GMT";
    private static final String CONTEXT_NAME = "/";
    private static final int DEFAULT_PORT = 9290;
    private static final Logger LOGGER = LoggerFactory.getLogger(Benito.class);

    public static void main(String[] args) {
        new Benito().run(args);
    }

    private Server createNewServer(String[] args) {
        String contextPath = args.length > 1 ? args[1] : CONTEXT_NAME;

        TimeZone.setDefault(TimeZone.getTimeZone(GMT));
        DateTimeZone.setDefault(DateTimeZone.UTC);

        GzipHandler handler = this.buildWebAppContext(contextPath);

        Server server = new Server(port(args));
        server.setHandler(handler);
        server.setStopAtShutdown(true);

        //JMX ON
        MBeanContainer mbContainer = new MBeanContainer(ManagementFactory.getPlatformMBeanServer());
        server.addEventListener(mbContainer);
        server.addBean(mbContainer);
        server.addBean(Log.getLog());

        return server;
    }

    private void run(String[] args) {
        try {
            Server server = createNewServer(args);
            server.start();
            server.join();
        } catch (Exception e) {
            LOGGER.error("Error starting the application", e);
            System.exit(-1);
        }
    }

    private GzipHandler buildWebAppContext(String contextPath) {
        AnnotationConfigWebApplicationContext applicationContext = new AnnotationConfigWebApplicationContext();
        applicationContext.register(ServiceContext.class);

        ServletContextHandler handler = new ServletContextHandler(ServletContextHandler.NO_SESSIONS);
        handler.setContextPath(contextPath);

        this.appendSpringDispatcherServlet(applicationContext, handler);
        this.appendListeners(applicationContext, handler);
        this.appendFilters(handler);

        GzipHandler gzipHandler = new GzipHandler();
        gzipHandler.setHandler(handler);

        applicationContext.close();
        return gzipHandler;
    }

    private void appendListeners(AnnotationConfigWebApplicationContext applicationContext,
                                 ServletContextHandler handler) {
        handler.addEventListener(new ContextLoaderListener(applicationContext));
    }

    private void appendSpringDispatcherServlet(AnnotationConfigWebApplicationContext applicationContext,
                                               ServletContextHandler handler) {
        DispatcherServlet dispatcherServlet = new DispatcherServlet(applicationContext);

        dispatcherServlet.setDispatchOptionsRequest(true);
        ServletHolder servletHolder = new ServletHolder(dispatcherServlet);
        servletHolder.setName("spring");
        servletHolder.setInitOrder(1);
        handler.addServlet(servletHolder, "/*");
    }

    private void appendFilters(ServletContextHandler handler) {
        CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
        FilterHolder characterEncodingFilterHolder = new FilterHolder(characterEncodingFilter);
        handler.addFilter(
            characterEncodingFilterHolder,
            "/*",
            EnumSet.of(DispatcherType.REQUEST, DispatcherType.ERROR)
        );;
    }

    private int port(String[] args) {
        return args.length > 0 ? Integer.parseInt(args[0]) : DEFAULT_PORT;
    }
}
