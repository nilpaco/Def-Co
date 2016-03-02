package com.definitivo.web.rest.dto;

import com.definitivo.domain.Space;

/**
 * Created by nilpanescoll on 2/3/16.
 */


public class SpaceDTO {
    private Space song;
    private Boolean liked;

    public Space getSong() {
        return song;
    }

    public void setSong(Space song) {
        this.song = song;
    }

    public Boolean getLiked() {
        return liked;
    }

    public void setLiked(Boolean liked) {
        this.liked = liked;
    }

}
