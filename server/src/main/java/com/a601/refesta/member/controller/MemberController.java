package com.a601.refesta.member.controller;

import com.a601.refesta.common.jwt.TokenProvider;
import com.a601.refesta.common.response.SuccessResponse;
import com.a601.refesta.member.data.LikeArtistRes;
import com.a601.refesta.member.data.LikeFestivalRes;
import com.a601.refesta.member.data.MemberProfileRes;
import com.a601.refesta.member.data.PreferGenreReq;
import com.a601.refesta.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final TokenProvider tokenProvider;

    @GetMapping
    public SuccessResponse<MemberProfileRes> getProfile(HttpServletRequest request) {
        int memberId = tokenProvider.getMemberIdByToken(request);
        MemberProfileRes memberProfileRes = memberService.getProfile(memberId);
        return new SuccessResponse<>(memberProfileRes);
    }

    @PostMapping
    public SuccessResponse<Integer> editProfile(HttpServletRequest request, @RequestParam(value = "file", required = false) MultipartFile file, @RequestParam("nickname") String nickname) {
        int memberId = tokenProvider.getMemberIdByToken(request);
        memberService.updateProfile(memberId, nickname, file);
        return new SuccessResponse<>(HttpStatus.SC_OK);
    }

    @PostMapping("/genres")
    public SuccessResponse<Integer> getPreferGenre(HttpServletRequest request, @RequestBody PreferGenreReq genres) {
        int memberId = tokenProvider.getMemberIdByToken(request);
        memberService.getPreferGenre(memberId, genres);
        return new SuccessResponse<>(HttpStatus.SC_OK);
    }

    @GetMapping("/festivals")
    public SuccessResponse<Map<String, List<LikeFestivalRes>>> getLikeFestivals(HttpServletRequest request) {
        int memberId = tokenProvider.getMemberIdByToken(request);
        Map<String, List<LikeFestivalRes>> data = new TreeMap<>();
        data.put("festivalList", memberService.getLikeFestivals(memberId));
        return new SuccessResponse<>(data);
    }

    @GetMapping("/artists")
    public SuccessResponse<Map<String, List<LikeArtistRes>>> getLikeArtists(HttpServletRequest request) {
        int memberId = tokenProvider.getMemberIdByToken(request);
        Map<String, List<LikeArtistRes>> data = new TreeMap<>();
        data.put("artistList", memberService.getLikeArtists(memberId));
        return new SuccessResponse<>(data);
    }
}
