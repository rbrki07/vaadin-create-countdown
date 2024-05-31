package com.example.application.services;

import org.springframework.beans.factory.annotation.Value;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

@BrowserCallable
@AnonymousAllowed
public class CountdownService {

    @Value("${countdown.end-time}")
    private String endTime;

    public String getEndTime() {
        return endTime;
    }
}
