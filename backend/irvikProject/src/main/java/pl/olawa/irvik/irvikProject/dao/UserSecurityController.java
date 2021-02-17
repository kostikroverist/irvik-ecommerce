package pl.olawa.irvik.irvikProject.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RestController;
import pl.olawa.irvik.irvikProject.domain.User;

@RestController
public interface UserSecurityController extends JpaRepository<User,Long> {

    User findByUserName(String userName);

    User findByUserNameAndPassword(String userName ,String password);
}