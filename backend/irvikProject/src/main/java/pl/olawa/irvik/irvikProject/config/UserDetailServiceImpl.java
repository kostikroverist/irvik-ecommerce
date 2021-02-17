package pl.olawa.irvik.irvikProject.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.olawa.irvik.irvikProject.dao.UserSecurityController;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private UserSecurityController userSecurityController;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

//        PasswordEncoder encoder =
//                PasswordEncoderFactories.createDelegatingPasswordEncoder();
        SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority("ROLE_ADMIN");
     //   return new User("admin", encoder.encode("admin"), Arrays.asList(simpleGrantedAuthority));
        pl.olawa.irvik.irvikProject.domain.User user = userSecurityController.findByUserName(userName);
        return  new org.springframework.security.core.userdetails.User(user.getUserName(),user.getPassword(), Collections.singletonList(simpleGrantedAuthority));


    }


}
