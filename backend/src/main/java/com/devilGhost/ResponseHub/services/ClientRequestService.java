package com.devilGhost.ResponseHub.services;

import com.devilGhost.ResponseHub.models.FixedEndpoint;
import com.devilGhost.ResponseHub.repository.FixedEndpointRepository;
import com.devilGhost.ResponseHub.repository.RecordRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
public class ClientRequestService {

    @Autowired
    private FixedEndpointRepository fixedEndpointRepository;

    @Autowired
    private RecordRepository recordRepository;

    public ResponseEntity<?> fixedRequestService(String username,String method,String endpoint){
        try{
            Optional<FixedEndpoint> optionalResponseFormat = fixedEndpointRepository.findByUsernameAndMethodAndEndpoint(username, method, endpoint);
            if(optionalResponseFormat.isEmpty()){

                return ResponseEntity
                        .status(HttpStatus.OK)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(Map.of(
                                "data", "null",
                                "error",Map.of(
                                        "message","Endpoint doesn't exist",
                                        "details","Request fixed endpoint for the used method doesn't exist."
                                )
                        ));
            }
            FixedEndpoint responseFormat=optionalResponseFormat.get();
            return ResponseEntity
                    .status(responseFormat.getStatusCode())
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(responseFormat.getResponseBody());

        }
        catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error","Internal Server Error."));
        }
    }

    public ResponseEntity<?> fixedRequestService(){
        try {
        return
                ResponseEntity.ok().body("lelo gappa");

        }
        catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error","Internal Server Error"));
        }
    }
}
