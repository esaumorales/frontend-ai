import {
    map_study_hours,
    map_social_media,
    map_netflix,
    map_attendance,
    map_sleep,
    map_exercise,
    map_mental_health,
    map_anxiety,
    map_financial_stress,
    map_focus,
    map_motivation,
    map_self_efficacy,
    map_time_management,
    map_study_techniques,
    map_resources,
} from "./mappers";

export const mapRawForUI = (raw: any) => {
    if (!raw) return null;

    return {
        sleep_hours: map_sleep(raw.sleep_hours),
        attendance_percentage: map_attendance(raw.attendance_percentage),
        study_hours_per_day: map_study_hours(raw.study_hours_per_day),
        exercise_frequency: map_exercise(raw.exercise_frequency),

        social_media_hours: map_social_media(raw.social_media_hours),
        netflix_hours: map_netflix(raw.netflix_hours),

        mental_health_rating: map_mental_health(raw.mental_health_rating),
        academic_motivation: map_motivation(raw.academic_motivation),
        focus_level: map_focus(raw.focus_level),

        time_management: map_time_management(raw.time_management),

        test_anxiety_level: map_anxiety(raw.test_anxiety_level),
        academic_self_efficacy: map_self_efficacy(raw.academic_self_efficacy),

        study_techniques_usage: map_study_techniques(raw.study_techniques_usage),
        home_study_environment: map_resources(raw.home_study_environment),
        study_resources_availability: map_resources(raw.study_resources_availability),

        financial_stress_level: map_financial_stress(raw.financial_stress_level),
    };
};
