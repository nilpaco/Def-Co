package com.definitivo.web.rest.dto;

import java.time.LocalDate;

/**
 * Created by nilpanescoll on 9/3/16.
 */
public class MessageDTO {
    private String text;

    private LocalDate time;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDate getTime() {
        return time;
    }

    public void setTime(LocalDate time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "MessageDTO{" +
            "text='" + text + '\'' +
            ", time=" + time +
            '}';
    }
}
