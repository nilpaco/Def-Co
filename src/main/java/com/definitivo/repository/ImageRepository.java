package com.definitivo.repository;

import com.definitivo.domain.Image;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Image entity.
 */
public interface ImageRepository extends JpaRepository<Image,Long> {

}
