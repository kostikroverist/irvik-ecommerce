package pl.olawa.irvik.irvikProject.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

    public class ProductnotFoundException extends RuntimeException{


        public ProductnotFoundException(String message, Throwable cause) {
            super(message, cause);
        }

        public ProductnotFoundException(String message) {
            super(message);
        }

        public ProductnotFoundException(Throwable cause) {
            super(cause);
        }
    }
