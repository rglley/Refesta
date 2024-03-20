package com.a601.refesta.member.service;

import com.a601.refesta.common.exception.CustomException;
import com.a601.refesta.common.exception.ErrorCode;
import com.a601.refesta.member.domain.Member;
import com.a601.refesta.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Member getMember(String googleId) {
        Member member = memberRepository.findByGoogleId(googleId);
        if (member == null) {
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND_ERROR);
        }
        return member;
    }
}