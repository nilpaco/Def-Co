package com.definitivo.web.rest.dto;

import com.definitivo.domain.Space;

/**
 * Created by nilpanescoll on 2/3/16.
 */


public class SpaceDTO {
    private Space space;
    private Boolean liked;

    public Space getSpace() {
        return space;
    }

    public void setSpace(Space space) {
        this.space = space;
    }

    public Boolean getLiked() {
        return liked;
    }

    public void setLiked(Boolean liked) {
        this.liked = liked;
    }
}
