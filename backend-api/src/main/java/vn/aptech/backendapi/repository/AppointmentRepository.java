package vn.aptech.backendapi.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import vn.aptech.backendapi.entities.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

       @Query("SELECT a.clinicHours FROM Appointment a " +
                     "WHERE a.medicalExaminationDay = :medicalExaminationDay AND a.scheduledoctor.doctor.id = :doctorId")
       List<LocalTime> findClinicHoursByBookingDateAndDoctorId(
                     @Param("medicalExaminationDay") LocalDate medicalExaminationDay,
                     @Param("doctorId") int doctorId);

       @Query("SELECT COUNT(a) FROM Appointment a " +
                     "WHERE (:doctorId IS NULL OR a.scheduledoctor.doctor.id = :doctorId) " +
                     "AND a.appointmentDate BETWEEN :startDate AND :endDate")
       Integer countAppointmentsByDoctorIdAndDateRange(
                     @Param("doctorId") Integer doctorId,
                     @Param("startDate") LocalDate startDate,
                     @Param("endDate") LocalDate endDate);

       @Query("SELECT COUNT(a) FROM Appointment a " +
                     "WHERE (:doctorId IS NULL OR a.scheduledoctor.doctor.id = :doctorId) " +
                     "AND a.medicalExaminationDay BETWEEN :startDate AND :endDate " +
                     "AND a.status = 'finished'")
       Integer countSuccessfulAppointmentsByDoctorIdAndDateRange(
                     @Param("doctorId") Integer doctorId,
                     @Param("startDate") LocalDate startDate,
                     @Param("endDate") LocalDate endDate);

}
