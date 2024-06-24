package vn.aptech.backendapi.service.Patient;

import vn.aptech.backendapi.dto.CustomPatientForEdit;
import vn.aptech.backendapi.dto.PatientDto;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface PatientService {
    Optional<PatientDto> getPatientByUserId(int userId);
    // writed by An in 5/6
    Optional<PatientDto> getPatientByPatientId(int patientId);
    // writed by An in 5/11
    List<PatientDto> getAll();

    List<PatientDto> findPatientsByScheduleDoctorIdAndStartTime( int scheduledoctorid, LocalTime starttime);

    List<PatientDto> findPatientsByDoctorIdAndFinishedStatus(int doctorId);

    CustomPatientForEdit getPatientDetail(int userId);

    boolean editPatient(int userId , CustomPatientForEdit dto);
    boolean Create(int userId , CustomPatientForEdit dto);
}
