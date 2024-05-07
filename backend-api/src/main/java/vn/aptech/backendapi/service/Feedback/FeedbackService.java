package vn.aptech.backendapi.service.Feedback;

import java.util.List;

import vn.aptech.backendapi.dto.Feedback.FeedbackCreateDto;
import vn.aptech.backendapi.dto.Feedback.FeedbackDetail;
import vn.aptech.backendapi.dto.Feedback.FeedbackShowDto;

public interface FeedbackService {
    FeedbackCreateDto save(FeedbackCreateDto dto);
    List<FeedbackShowDto> findAll();
    FeedbackDetail feedbackDetail(int doctorId);
}
