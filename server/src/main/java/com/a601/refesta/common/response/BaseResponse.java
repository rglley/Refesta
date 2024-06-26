package com.a601.refesta.common.response;

import lombok.Getter;

@Getter
public abstract class BaseResponse<T> {

    private final String status;

    private final T data;

    public BaseResponse(String status, T data) {
        this.status = status;
        this.data = data;
    }
}
