package pl.olawa.irvik.irvikProject.contoller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.olawa.irvik.irvikProject.config.JwtUtil;
import pl.olawa.irvik.irvikProject.dao.UserSecurityController;
import pl.olawa.irvik.irvikProject.domain.Token;
import pl.olawa.irvik.irvikProject.domain.User;
import pl.olawa.irvik.irvikProject.dto.AuthRequesr;
import pl.olawa.irvik.irvikProject.exception.ProductErrorResponce;
import pl.olawa.irvik.irvikProject.exception.ProductRestExceptionHandler;
import pl.olawa.irvik.irvikProject.exception.ProductnotFoundException;

@RestController
public class LoginController {


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserSecurityController userSecurityController;
    /**
     *
     */

    @RequestMapping("/hello")
    public String hello(){
        return "Hello world";
    }


    @PostMapping("/login")
    public Token generareToken(@RequestBody AuthRequesr authRequesr) throws Exception {
        User user =userSecurityController.findByUserNameAndPassword(authRequesr.getUserName(),authRequesr.getPassword());

        try {

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword())
            );
            }
        catch (Exception e){
            throw new ProductnotFoundException("invalid username or password");
        }


              String jwt = jwtUtil.generateToken(user.getUserName());
            return new Token(jwt);

        }
}




