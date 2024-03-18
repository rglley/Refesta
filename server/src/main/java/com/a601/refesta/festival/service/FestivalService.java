package com.a601.refesta.festival.service;

import com.a601.refesta.common.exception.CustomException;
import com.a601.refesta.common.exception.ErrorCode;
import com.a601.refesta.festival.data.FestivalDetailRes;
import com.a601.refesta.festival.data.FestivalInfoRes;
import com.a601.refesta.festival.data.FestivalReviewRes;
import com.a601.refesta.festival.domain.Festival;
import com.a601.refesta.festival.domain.FestivalDetail;
import com.a601.refesta.festival.repository.FestivalDetailRepository;
import com.a601.refesta.festival.repository.FestivalLikeRepository;
import com.a601.refesta.festival.repository.FestivalRepository;
import com.a601.refesta.member.domain.join.FestivalLike;
import com.a601.refesta.member.service.MemberService;
import com.a601.refesta.song.domain.Song;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.a601.refesta.festival.domain.QFestival.festival;
import static com.a601.refesta.festival.domain.QFestivalDetail.festivalDetail;
import static com.a601.refesta.song.domain.QSong.song;

@Service
@RequiredArgsConstructor
public class FestivalService {

    private final MemberService memberService;

    private final FestivalRepository festivalRepository;
    private final FestivalDetailRepository festivalDetailRepository;
    private final FestivalLikeRepository festivalLikeRepository;

    private final JPAQueryFactory jpaQueryFactory;

    /**
     * 페스티벌 정보 조회
     * @param festivalId
     * @return FestivalInfoRes - 이름, 날짜, 장소, 포스터 URL, 가격
     */
    public FestivalInfoRes getFestivalInfo(int festivalId) {
        Festival findFestival = getFestival(festivalId);

        //기본 정보 저장
        FestivalInfoRes festivalInfo = FestivalInfoRes.builder()
                .name(findFestival.getName())
                .date(findFestival.getDate())
                .location(findFestival.getLocation())
                .posterUrl(findFestival.getPosterUrl())
                .price(findFestival.getPrice())
                .isEnded(findFestival.isEnded())
                .build();

        return festivalInfo;
    }

    /**
     * 페스티벌(예정) 상세 정보 조회
     * @param festivalId
     * @return FestivalDetailRes - 상세 정보 URL
     */
    public FestivalDetailRes getFestivalDetail(int festivalId) {
        Optional<FestivalDetail> optFindDetail = festivalDetailRepository.findByFestival_Id(festivalId);

        if(optFindDetail.isEmpty()) {
            Festival findFestival = getFestival(festivalId);

            ErrorCode errorCode = findFestival.isEnded() ?
                    ErrorCode.FESTIVAL_ALREADY_ENDED : ErrorCode.FESTIVAL_DETAIL_NOT_FOUND_ERROR;

            throw new CustomException(errorCode);
        }

        FestivalDetailRes festivalDetail = FestivalDetailRes.builder()
                .infoImgUrl(optFindDetail.get().getInfoImgUrl())
                .build();

        return festivalDetail;
    }



    /**
     * 페스티벌 좋아요 업데이트
     * @param memberId - 구글 식별 ID
     * @param festivalIdList
     */
    public void updateFestivalLike(String memberId, List<Integer> festivalIdList) {
        for(int festivalId : festivalIdList) {
            Optional<FestivalLike> optFindLike = festivalLikeRepository.findByFestival_IdAndMember_Id(memberId, festivalId);
            //DB에 없으면 추가
            if(optFindLike.isEmpty()) {
                festivalLikeRepository.save(FestivalLike.builder()
                        .member(memberService.getMember(memberId))
                        .festival(getFestival(festivalId))
                        .isLiked(true)
                        .build()
                );

                continue;
            }

            //DB에 있으면 좋아요 상태 업데이트 후 저장
            FestivalLike findLike = optFindLike.get();
            findLike.updateStatus();

            festivalLikeRepository.save(findLike);
        }
    }

    public Festival getFestival(int festivalId) {
        return  festivalRepository.findById(festivalId)
                .orElseThrow(() -> new CustomException(ErrorCode.FESTIVAL_NOT_FOUND_ERROR));
    }
}
