import 'package:mobile/models/patient.dart';

class Feedback{
  late final int id;
  late final double rate;
  late final String comment;
  late final bool status;
  late final Patient patient;
  Feedback({
    required this.id,
    required this.rate,
    required this.comment,
    required this.status,
    required this.patient,
  });
  factory Feedback.fromJson(Map<String, dynamic> json){
    return Feedback(
      id: json['id'] ?? 0,
      rate: json['rate'] ?? 0.0,
      comment: json['comment'] ?? '',
      status: json['status'] ?? false,
      patient: Patient.fromJson(json['patient'] ?? {}),
    );
  }

  Map<String, dynamic> toJson(){
    return {
      'id': id,
      'rate': rate,
      'comment': comment,
     'status': status,
      'patient': patient.toJson(),
    };
  }
}