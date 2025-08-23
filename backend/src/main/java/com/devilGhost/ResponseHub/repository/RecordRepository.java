package com.devilGhost.ResponseHub.repository;

import com.devilGhost.ResponseHub.models.Record;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RecordRepository extends MongoRepository<Record, ObjectId> {

}
