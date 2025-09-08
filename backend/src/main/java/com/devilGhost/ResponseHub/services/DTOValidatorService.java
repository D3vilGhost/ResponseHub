package com.devilGhost.ResponseHub.services;

import com.devilGhost.ResponseHub.config.ClientRequestErrorException;
import com.devilGhost.ResponseHub.dto.FixedEndpointDTO;
import com.devilGhost.ResponseHub.dto.FlexibleRequestDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Slf4j
@Component
public class DTOValidatorService {

    @Autowired
    private ObjectMapper objectMapper;

    private final Set<String> validMethods = new HashSet<>(Arrays.asList(
            "GET", "PUT", "POST", "DELETE"
    ));

    private final Set<Integer> validStatusCode = new HashSet<>(Arrays.asList(
            // 1xx Informational
            100, 101, 102, 103,
            // 2xx Success
            200, 201, 202, 203, 204, 205, 206, 207, 208, 226,
            // 3xx Redirection
            300, 301, 302, 303, 304, 305, 306, 307, 308,
            // 4xx Client Error
            400, 401, 402, 403, 404, 405, 406, 407, 408, 409,
            410, 411, 412, 413, 414, 415, 416, 417, 418, 421,
            422, 423, 424, 425, 426, 428, 429, 431, 451,
            // 5xx Server Error
            500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511
    ));

    public String validateFixedRequestDTO(FixedEndpointDTO dtoData) {
        // method
        if (!validMethods.contains(dtoData.getMethod())) {
            return "Invalid method.";
        }

        // statusCode
        if (!validStatusCode.contains(dtoData.getStatusCode())) {
            return "Invalid Status Code.";
        }

        // responseBody Check that its a valid json
        String possibleError = validateResponseBody(dtoData.getResponseBody());
        if (possibleError != null) {
            return possibleError;
        }

        // check for endpoint
        String endpoint = dtoData.getEndpoint();
        //  1) trailing/leading white space removal
        endpoint = endpoint.trim();
        // 2) replace "\\" , "//" , "\" all with single forward slash "/"
        endpoint = endpoint.replace("\\\\", "/");
        endpoint = endpoint.replace("\\", "/");

        // 3) whitespace check in between of endpoint
        if (endpoint.contains(" ")) {
            return "Endpoint must not have spaces.";
        }
        // 4) allowed chars match using regex
        if (!endpoint.matches("^[a-zA-Z0-9/.-_]+$")) {
            return "Allowed characters in endpoint: a–z, A–Z, 0–9, ., -, _, /";
        }
        // 5) remove starting '/' as well from endpoint
//        if (endpoint.charAt(0) == '/') {
//            endpoint = endpoint.substring(1);
//        }
        // finally update this in the dtoObject as well
        dtoData.setEndpoint(endpoint);
        return null;
    }

    public void validateFlexibleRequestDTO(FlexibleRequestDTO dtoData) throws ClientRequestErrorException {
        // validate status code
        if (!validStatusCode.contains(dtoData.getStatusCode())) {
            throw new ClientRequestErrorException(
                    "Invalid status code.",
                    "The response body contains a status code that is not recognized or allowed by the server.");
        }
        // next validate responseBody
        if (validateResponseBody(dtoData.getResponseBody()) != null) {
            throw new ClientRequestErrorException(
                    "Invalid JSON object in response body",
                    "The response body contains a malformed or non-parseable JSON object."
            );
        }
    }

    private String validateResponseBody(Object resBody) {

        try {
            // to validate if its valid json, first convert it to string type
            String json = resBody instanceof String ?
                    (String) resBody :
                    objectMapper.writeValueAsString(resBody);
            // now we have json
            // try forming a tree from it , if it does then its a valid json
            objectMapper.readTree(json);
            // this means it was valid json
        } catch (JsonProcessingException e) {
            log.error(e.getMessage()); // for debug
            // we fall in error block thus json was not valid
            return "Invalid JSON Object in response body.";
        }
        return null;
    }

}
