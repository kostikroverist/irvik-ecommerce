package pl.olawa.irvik.irvikProject.exception;

import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;


@ControllerAdvice
public class ProductRestExceptionHandler {

    @ExceptionHandler(ProductnotFoundException.class)
    public ResponseEntity<?> handleException(ProductnotFoundException exception, WebRequest request){
        ProductErrorResponce  productErrorResponce = new ProductErrorResponce(new Date(),exception.getMessage(),request.getDescription(false));


        return  new ResponseEntity<>(productErrorResponce, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler
    public ResponseEntity<ProductErrorResponce> handleException(Exception exception,WebRequest request){
        ProductErrorResponce  productErrorResponce = new ProductErrorResponce(new Date(),exception.getMessage(),request.getDescription(false));
        exception.printStackTrace();
        return  new ResponseEntity<>(productErrorResponce, HttpStatus.BAD_REQUEST);
    }
//
//    @ExceptionHandler(ProductnotFoundException.class)
//    public ResponseEntity<?> handleAccessDenied(ProductnotFoundException exception, WebRequest request){
//        ProductErrorResponce  productErrorResponce = new ProductErrorResponce(new Date(),exception.getMessage(),request.getDescription(false));
//
//        return new ResponseEntity(productErrorResponce, HttpStatus.UNAUTHORIZED);
//    }


}
