package com.devilGhost.ResponseHub.repository;

import com.devilGhost.ResponseHub.models.FixedRequestModel;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FixedRequestRepository extends MongoRepository<FixedRequestModel, ObjectId> {

}
