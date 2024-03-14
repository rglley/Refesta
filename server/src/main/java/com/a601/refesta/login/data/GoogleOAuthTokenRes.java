package com.a601.refesta.login.data;

import lombok.Data;

@Data
public class GoogleOAuthTokenRes {
    private String access_token;
    private String expires_in;
    private String refresh_token;
    private String scope;
    private String token_type;
    private String id_token;
}
