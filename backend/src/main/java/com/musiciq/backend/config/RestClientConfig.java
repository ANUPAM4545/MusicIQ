package com.musiciq.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestClient;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

@Configuration
public class RestClientConfig {

    @Value("${itunes.base-url}")
    private String itunesBaseUrl;

    @Value("${itunes.timeout.connect:5000}")
    private int connectTimeout;

    @Value("${itunes.timeout.read:10000}")
    private int readTimeout;

    @Bean
    public RestClient itunesRestClient() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(connectTimeout);
        factory.setReadTimeout(readTimeout);

        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        converter.setSupportedMediaTypes(java.util.Arrays.asList(
            org.springframework.http.MediaType.APPLICATION_JSON,
            new org.springframework.http.MediaType("text", "javascript")
        ));

        return RestClient.builder()
                .baseUrl(itunesBaseUrl)
                .requestFactory(factory)
                .messageConverters(converters -> converters.add(converter))
                .build();
    }
}
