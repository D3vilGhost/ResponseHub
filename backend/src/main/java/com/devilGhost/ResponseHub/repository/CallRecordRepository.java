package com.devilGhost.ResponseHub.repository;

import com.devilGhost.ResponseHub.models.CallRecordModel;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CallRecordRepository extends MongoRepository<CallRecordModel, ObjectId> {

}
