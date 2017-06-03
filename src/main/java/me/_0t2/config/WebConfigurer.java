package me._0t2.config;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.nio.file.Paths;

/**
 * Created by jessec on 2017/6/2.
 */
@Component
public class WebConfigurer extends WebMvcConfigurerAdapter {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/assets/art-images/**")
                .addResourceLocations(Paths.get("art-images").toAbsolutePath().toUri().toString());
    }
}
