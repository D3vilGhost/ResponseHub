package com.devilGhost.ResponseHub.services;

import com.devilGhost.ResponseHub.dto.FixedEndpointDTO;
import com.devilGhost.ResponseHub.models.FixedEndpoint;
import com.devilGhost.ResponseHub.models.Record;
import com.devilGhost.ResponseHub.models.UserEntity;
import com.devilGhost.ResponseHub.repository.RecordRepository;
import com.devilGhost.ResponseHub.repository.FixedEndpointRepository;
import com.devilGhost.ResponseHub.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
public class DashboardService {
    @Autowired
    private FixedEndpointRepository fixedEndpointRepository;

    @Autowired
    private RecordRepository recordRepository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> getUserApiKey(String username) {
        try {
            Optional<UserEntity> optionalUserEntity = userRepository.findByUsername(username);
            // user will be there is for sure as it passed through jwt auth filter before reaching here
            if (optionalUserEntity.isEmpty()) {
                throw new Exception("Invalid Username");
            }
            UserEntity user = optionalUserEntity.get();
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("apiKey", user.getApiKey()));

        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error", "Internal Server Error."));
        }
    }

    public ResponseEntity<?> getFixedEndpoints(String username) {
        try {
            List<FixedEndpoint> usersFixedEndpoints = fixedEndpointRepository.findByUsername(username);
            // FixedEndpoint contains a lot of fields which I don't want to send on client side
            // thus I will convert it List<FixedEndpointDTO> which have field which I actually want to check
            List<FixedEndpointDTO> fixedEndpointDTOList = usersFixedEndpoints
                    .stream().map(
                            endpoint -> new FixedEndpointDTO(
                                    endpoint.getMethod(),
                                    endpoint.getStatusCode(),
                                    endpoint.getEndpoint(),
                                    endpoint.getResponseBody()
                            )
                    ).toList();
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fixedEndpointDTOList.isEmpty() ? Collections.EMPTY_LIST : fixedEndpointDTOList);

        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error", "Internal Server Error."));
        }
    }

    public ResponseEntity<?> createFixedEndpoint(String username, FixedEndpointDTO newFixedEndpoint) {
        try {
            Optional<FixedEndpoint> oldEndpoint =
                    fixedEndpointRepository.findByUsernameAndMethodAndEndpoint(
                            username,
                            newFixedEndpoint.getMethod(),
                            newFixedEndpoint.getEndpoint()
                    );

            if (oldEndpoint.isPresent()) {
                throw new DuplicateKeyException("Endpoint-Method pair already exists.\n");
            }

            // we have already validated DTO in controller layer, thus no more checks required
            FixedEndpoint newFixedEndpointEntity = new FixedEndpoint();
            newFixedEndpointEntity.setUsername(username);
            newFixedEndpointEntity.setMethod(newFixedEndpoint.getMethod());
            newFixedEndpointEntity.setEndpoint(newFixedEndpoint.getEndpoint());
            newFixedEndpointEntity.setStatusCode(newFixedEndpoint.getStatusCode());
            newFixedEndpointEntity.setResponseBody(newFixedEndpoint.getResponseBody());

            fixedEndpointRepository.save(newFixedEndpointEntity);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("message", "Created successfully."));

        } catch (DuplicateKeyException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error", e.getMessage()));

        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error", "Internal Server Error."));
        }
    }

    public ResponseEntity<?> updateFixedEndpoint(String username, FixedEndpointDTO fixedEndpoint) {
        try {
            Optional<FixedEndpoint> oldFixedEndpoint =
                    fixedEndpointRepository.findByUsernameAndMethodAndEndpoint(
                            username,
                            fixedEndpoint.getMethod(),
                            fixedEndpoint.getEndpoint()
                    );
            if (oldFixedEndpoint.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(Map.of("error", "Fixed Endpoint doesn't exist."));
            }

            FixedEndpoint updatedEndpoint = oldFixedEndpoint.get();
            updatedEndpoint.setStatusCode(fixedEndpoint.getStatusCode());
            updatedEndpoint.setResponseBody(fixedEndpoint.getResponseBody());

            fixedEndpointRepository.save(updatedEndpoint);
            return ResponseEntity
                    .status(HttpStatus.ACCEPTED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("message", "Updated successfully."));

        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error", "Internal Server Error."));
        }
    }

    public ResponseEntity<?> deleteFixedEndpoint(String username, String method, String endpoint) {
        try {
            Optional<FixedEndpoint> existingEndpoint =
                    fixedEndpointRepository.findByUsernameAndMethodAndEndpoint(username, method, endpoint);
            if (existingEndpoint.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(Map.of("error", "No endpoint found for deletion.\""));
            }

            fixedEndpointRepository.deleteById(existingEndpoint.get().getId());
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("message", "Deleted successfully."));

        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error", "Internal Server Error."));
        }
    }

    public ResponseEntity<?> getRecords(String username, int page) {
        try {
            // create a pageable to define records to retrieve
            Pageable pageable = PageRequest.of(
                    page - 1,
                    10,// setting limit of per page to 10
                    Sort.by(Sort.Direction.DESC, "time", "a") // descending order of time
            );
            Page<Record> userRecords = recordRepository.findByUsername(username, pageable);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(userRecords.stream().toList());

        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error", "Internal Server Error."));
        }
    }

    public ResponseEntity<?> deleteRecords(String username) {
        try {
            recordRepository.deleteAllByUsername(username);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("message", "All records deleted successfully."));

        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error", "Internal Server Error."));
        }
    }
}
