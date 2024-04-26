package vn.aptech.backendapi.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.aptech.backendapi.dto.WorkingCreateDto;
import vn.aptech.backendapi.dto.WorkingDto;
import vn.aptech.backendapi.service.Working.WorkingService;

@RestController
@RequestMapping(value = "/api/working")
public class WorkingController {
    @Autowired
    private WorkingService workingService;

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<WorkingDto>> findAll() {
        List<WorkingDto> result = workingService.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<WorkingDto> findById(@PathVariable("id") int id) {
        Optional<WorkingDto> result = workingService.findById(id);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteById(@PathVariable("id") int id) {
        boolean deleted = workingService.deleteById(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<WorkingDto> Create(@RequestBody WorkingDto dto) {
        WorkingDto result = workingService.save(dto);
        if (result != null) {
            return ResponseEntity.ok(result); // Return the created SlotDto
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping(value = "/update/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<WorkingDto> updateTutorial(@PathVariable("id") int id, @RequestBody WorkingCreateDto dto) {
        Optional<WorkingDto> existingWorkingOptional = workingService.findById(id);
        if (existingWorkingOptional.isPresent()) {
            WorkingDto existingWorking = existingWorkingOptional.get();
            existingWorking.setAddress(dto.getAddress());
            existingWorking.setCompany(dto.getCompany());


            String startWork = dto.getStartWork();
            String endtWork = dto.getEndWork();

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate startWorkDate = LocalDate.parse(startWork, formatter);
            LocalDate endtWorkDate = LocalDate.parse(endtWork, formatter);

            existingWorking.setStartWork(startWorkDate);
            existingWorking.setEndWork(endtWorkDate);

            WorkingDto updatedWorking = workingService.save(existingWorking);
            return ResponseEntity.ok(updatedWorking);
        }
        return ResponseEntity.notFound().build();

    }
}
