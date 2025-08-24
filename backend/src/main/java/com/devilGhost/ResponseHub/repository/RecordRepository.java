package com.devilGhost.ResponseHub.repository;

import com.devilGhost.ResponseHub.models.Record;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RecordRepository extends MongoRepository<Record, ObjectId> {

    // we basically pass pageable parameter from service layer
    // it tells it to select which records
    Page<Record> findByUsername(String username, Pageable pageable);

    void deleteAllByUsername(String username);

}
