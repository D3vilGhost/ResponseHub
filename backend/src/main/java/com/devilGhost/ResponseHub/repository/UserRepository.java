package com.devilGhost.ResponseHub.repository;

import com.devilGhost.ResponseHub.models.UserEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<UserEntity, ObjectId> {

    Optional<UserEntity> findByUsername(String username);

    Optional<UserEntity> findByApiKey(String apiKey);

}
