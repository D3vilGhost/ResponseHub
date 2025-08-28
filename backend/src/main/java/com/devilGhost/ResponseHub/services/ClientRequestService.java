package com.devilGhost.ResponseHub.services;

import com.devilGhost.ResponseHub.config.ClientRequestErrorException;
import com.devilGhost.ResponseHub.dto.FlexibleRequestDTO;
import com.devilGhost.ResponseHub.models.FixedEndpoint;
import com.devilGhost.ResponseHub.repository.FixedEndpointRepository;
import com.devilGhost.ResponseHub.repository.RecordRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
public class ClientRequestService {

    @Autowired
    private FixedEndpointRepository fixedEndpointRepository;

    @Autowired
    private RecordRepository recordRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private RandomDataGeneratorService randomDataGeneratorService;

    // below method handles the fixedRequest made by clients i.e /api/client/fixed/**
    public ResponseEntity<?> fixedRequestService(String username, String method, String endpoint) {
        try {
            Optional<FixedEndpoint> optionalResponseFormat = fixedEndpointRepository.findByUsernameAndMethodAndEndpoint(username, method, endpoint);
            if (optionalResponseFormat.isEmpty()) {

                return ResponseEntity
                        .status(HttpStatus.OK)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(Map.of(
                                "data", "null",
                                "error", Map.of(
                                        "message", "Endpoint doesn't exist",
                                        "details", "Request fixed endpoint for the used method doesn't exist."
                                )
                        ));
            }
            FixedEndpoint responseFormat = optionalResponseFormat.get();
            return ResponseEntity
                    .status(responseFormat.getStatusCode())
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(responseFormat.getResponseBody());

        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error", "Internal Server Error."));
        }
    }

    // below method handles the flexibleRequested made by clients i.e. /api/client/flexible/
    public ResponseEntity<?> flexibleRequestService(String username, FlexibleRequestDTO requestedData) {
        try {
            log.info(requestedData.getResponse_schema());
            // first of all we know that keys must be string and there values are objects
//            log.info(requestedData.getResponse_schema().toString());
            Map<String, Object> requestedJson = objectMapper.readValue(
                    requestedData.getResponse_schema(),
                    new TypeReference<Map<String, Object>>() {
                    }
            );
            // now for each key , generate whats request and put it in a seperate map
            Map<String, Object> responseJson = new HashMap<>();
            for (String key : requestedJson.keySet()) {
                responseJson.put(
                        key,
                        randomDataGeneratorService.generateData(requestedJson.get(key) // generate the data
                        )
                );
            }
            return ResponseEntity
                    .status(requestedData.getStatus_code())
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(responseJson);
        } catch (ClientRequestErrorException e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(requestedData.getStatus_code())
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("lelo gappa");
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error", "Internal Server Error"));
        }
    }
}