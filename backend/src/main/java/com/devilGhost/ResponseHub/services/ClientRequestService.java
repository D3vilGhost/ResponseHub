package com.devilGhost.ResponseHub.services;

import com.devilGhost.ResponseHub.config.ClientRequestErrorException;
import com.devilGhost.ResponseHub.dto.ClientResponseDTO;
import com.devilGhost.ResponseHub.dto.FlexibleRequestDTO;
import com.devilGhost.ResponseHub.models.FixedEndpoint;
import com.devilGhost.ResponseHub.models.Record;
import com.devilGhost.ResponseHub.repository.FixedEndpointRepository;
import com.devilGhost.ResponseHub.repository.RecordRepository;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
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

    @Autowired
    private DTOValidatorService dtoValidatorService;

    // below method handles the fixedRequests made by clients i.e /api/client/fixed/**
    public ResponseEntity<?> fixedRequestService(String username, String method, String endpoint) {
        // we can create one shared resource of Record
        // and change data in it based on whether we are processing it in try or catch block

        // first create the entry and fill in basic details which will be common
        Record newRecord = new Record();
        newRecord.setUsername(username);
        newRecord.setTime(Instant.now());
        newRecord.setMethod(method);
        newRecord.setEndpoint(endpoint);
        newRecord.setRequestBody("Not-Applicable");

        ClientResponseDTO newResponse = new ClientResponseDTO();
        try {
            // check for availability of endpoint
            Optional<FixedEndpoint> optionalResponseFormat = fixedEndpointRepository.findByUsernameAndMethodAndEndpoint(
                    username, method,
                    endpoint.substring(17) // to remove "/api/client/fixed" part
            );
            if (optionalResponseFormat.isEmpty()) {
                throw new ClientRequestErrorException(
                        "Endpoint not found for the specified method",
                        "The requested fixed endpoint for the specified HTTP method is not defined in the API configuration."
                );
            }

            // generate new response object's body
            newResponse.setError(null);
            newResponse.setData(optionalResponseFormat.get().getResponseBody());

            // set data for record
            newRecord.setStatusCode(HttpStatus.OK.value());
            newRecord.setResponseBody(newResponse);

            return ResponseEntity
                    .status(optionalResponseFormat.get().getStatusCode())
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(newResponse);

        } catch (ClientRequestErrorException e) {
            // generate new response object for error
            newResponse.setData(null);
            newResponse.setError(e.message, e.details);

            // set details in record object
            newRecord.setStatusCode(HttpStatus.BAD_REQUEST.value());
            newRecord.setResponseBody(newResponse);

            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(newResponse);
        } catch (Exception e) {
            // for unhandled case, just add log and give error to client ,
            // also save service layer errors in records { don't know why but im doing it}
            log.error(e.getMessage());

            newResponse.setData(null);
            newResponse.setError(
                    "Internal Server Error",
                    "The server encountered an unexpected condition that prevented it from fulfilling the request."
            );

            newRecord.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            newRecord.setResponseBody(newResponse);

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(newResponse);
        } finally {
            // in all the cases save the record in db
            recordRepository.save(newRecord);
        }
    }

    // below method handles the flexibleRequests made by clients i.e. /api/client/flexible/
    public ResponseEntity<?> flexibleRequestService(String username, FlexibleRequestDTO requestedData) {
        // create a record and clientResponse object as they need to be used in all the cases
        Record newRecord = new Record();
        newRecord.setUsername(username);
        newRecord.setTime(Instant.now());
        newRecord.setMethod("POST");
        newRecord.setEndpoint("/api/client/flexible");
        newRecord.setRequestBody(requestedData);

        ClientResponseDTO newResponse = new ClientResponseDTO();

        try {
            // first of all validate the requestedData, it there's any error, it will
            // throw the ClientRequestErrorException
            dtoValidatorService.validateFlexibleRequestDTO(requestedData);
            // now we know that data is valid, next we have to generate the data
            // to begin with we know that keys must be string and there values are objects
            // first convert it to json string as it objectMapper expects a string
            String jsonString = objectMapper.writeValueAsString(requestedData.getResponseBody());
            Map<String, Object> requestedJson = objectMapper.readValue(
                    jsonString,
                    new TypeReference<Map<String, Object>>() {
                    } // to explain the type of casting to object mapper
            );
            // now for each key , generate what's request and put it in a separate map
            Map<String, Object> responseJson = new HashMap<>();
            for (String key : requestedJson.keySet()) {
                responseJson.put(
                        key,
                        randomDataGeneratorService.generateData(requestedJson.get(key) // generate the data
                        )
                );
            }
            // by now data has been generated and thus no error was encountered
            // thus update record and response data
            newResponse.setError(null);
            newResponse.setData(responseJson);

            // set record details
            newRecord.setStatusCode(HttpStatus.CREATED.value());
            newRecord.setResponseBody(newResponse);

            return ResponseEntity
                    .status(requestedData.getStatusCode())
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(newResponse);

        } catch (ClientRequestErrorException e) {
            // set error details in record and response
            newResponse.setError(e.message, e.details);
            newResponse.setData(null);

            newRecord.setStatusCode(HttpStatus.BAD_REQUEST.value());
            newRecord.setResponseBody(newResponse);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(newResponse);

        } catch (Exception e) {
            // we won't reach this block hopefully but just in case if we did,
            // like fixedRequestService , just log the error and generate response for cleint
            log.error(e.getMessage());

            newResponse.setData(null);
            newResponse.setError("Unhandled error on server side.", "Developer forgot to handle this case.");

            newRecord.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            newRecord.setResponseBody(newResponse);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(newResponse);

        } finally {
            // finally save record in repository
            recordRepository.save(newRecord);
        }
    }
}