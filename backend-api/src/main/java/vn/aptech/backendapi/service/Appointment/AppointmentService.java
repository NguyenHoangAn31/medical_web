package vn.aptech.backendapi.service.Appointment;

import java.util.List;

import vn.aptech.backendapi.dto.AppointmentDto;
import vn.aptech.backendapi.dto.Appointment.CustomAppointmentDto;

public interface AppointmentService {
        AppointmentDto save(AppointmentDto dto);

        List<CustomAppointmentDto> findAll();
}
