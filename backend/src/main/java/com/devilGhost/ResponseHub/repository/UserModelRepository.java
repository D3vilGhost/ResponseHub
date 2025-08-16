package com.devilGhost.ResponseHub.repository;

import com.devilGhost.ResponseHub.models.UserModel;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserModelRepository extends MongoRepository<UserModel, ObjectId> {
    Optional<UserModel> findByUsername(String username);
    Optional<UserModel> findByApiKey(String apiKey);
}
