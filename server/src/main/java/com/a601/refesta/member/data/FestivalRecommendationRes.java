package com.a601.refesta.member.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class FestivalRecommendationRes {

    private List<ScheduledFestival> scheduledFestivalList;

    private List<EndedFestival> endedFestivalList;

    @AllArgsConstructor
    public static class ScheduledFestival {

        private int id;

        private String name;

        private LocalDate date;

        private String posterUrl;
    }

    @AllArgsConstructor
    public static class EndedFestival {

        private int id;

        private String name;

        private LocalDate date;

        private String posterUrl;

        private String lineup;
    }
}
