package com.a601.refesta.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    //Member
    MEMBER_NOT_FOUND_ERROR(404, "MEM001", "존재하지 않는 사용자입니다."),

    //Token
    ACCESS_TOKEN_EXPIRE_ERROR(401,"TOK001","ACCESS TOKEN이 만료되었습니다."),
    ACCESS_TOKEN_ERROR(401, "TOK002", "Access Token이 잘못되었습니다."),
    //Festival
    FESTIVAL_NOT_FOUND_ERROR(404, "FES001", "존재하지 않는 페스티벌입니다."),
    FESTIVAL_DETAIL_NOT_FOUND_ERROR(500, "FES002", "예정된 페스티벌의 상세 정보가 존재하지 않습니다."),

    //Artist
    Artist_NOT_FOUND_ERROR(404, "Art001", "존재하지 않는 아티스트입니다.");

    private final int status;

    private final String code;

    private final String message;
}
