package pl.olawa.irvik.irvikProject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import pl.olawa.irvik.irvikProject.dao.UserSecurityController;
import pl.olawa.irvik.irvikProject.domain.User;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootApplication
@EnableScheduling
public class IrvikProjectApplication {



	public static void main(String[] args) {
		SpringApplication.run(IrvikProjectApplication.class, args);
	}

}
