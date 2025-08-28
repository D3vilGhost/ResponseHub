package com.devilGhost.ResponseHub.config;

public class ClientRequestErrorException extends Exception{

    public String message;
    public String details;

    public ClientRequestErrorException(String message,String details){
        super(message);
        this.message=message;
        this.details=details;
    }

}
