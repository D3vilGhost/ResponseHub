package com.devilGhost.ResponseHub.repository;

import com.devilGhost.ResponseHub.models.FixedEndpoint;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FixedEndpointRepository extends MongoRepository<FixedEndpoint, ObjectId> {

    List<FixedEndpoint> findByUsername(String username);

    Optional<FixedEndpoint> findByUsernameAndMethodAndEndpoint(String username, String method, String endpoint);


}
