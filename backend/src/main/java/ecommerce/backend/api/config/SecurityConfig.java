package ecommerce.backend.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth ->
                        auth.anyRequest().permitAll())
                .build();
    }

    /*             Explicação da classe abaixo: corsConfigurationSource()
    *
    * Objetivo: Implementar configuração de CORS
    *
    * Essa configuração se dá a partir de instanciação da classe: 'new CorsConfiguration()'
    *
    * A partir dela fazemos tres principais configuração: Quem pode acessar?, O que pode fazer? Sob Quais condições as ações pode sem feitas?
    *
    * Analogia: Temos uma lista VIP de convidados, mas também através do alias '*' a API fica aberta pra qualquer origem que a requisição vier.
    *
    *
    * 'setAllowedMethods' -> Definição de quais métodos podem ser feitos dentro da aplicação
    *
    * configuration.setAllowCredentials(false);
      configuration.setMaxAge(3600L);
      source.registerCorsConfiguration("/**", configuration);

    * Desabilita o envio de credenciais (como cookies) nas requisições
      Define o tempo de cache das verificações CORS para 1 hora (3600 segundos)
      Aplica estas configurações a todos os endpoints da sua API com o padrão "/**"
    *
    * */

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();


        configuration.setAllowedOrigins(List.of(
                "http://localhost:3000",
                "http://192.168.0.5:3000",
                "http://192.168.0.5:8080",
                "http://localhost",
                "*"
        ));

        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(false);  
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}