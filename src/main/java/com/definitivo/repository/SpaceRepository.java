package com.definitivo.repository;

import com.definitivo.domain.Space;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Space entity.
 */
public interface SpaceRepository extends JpaRepository<Space,Long> {

    @Query("select space from Space space where space.user.login = ?#{principal.username}")
    List<Space> findByUserIsCurrentUser();

    @Query("select distinct space from Space space left join fetch space.services")
    List<Space> findAllWithEagerRelationships();

    @Query("select space from Space space left join fetch space.services where space.id =:id")
    Space findOneWithEagerRelationships(@Param("id") Long id);

}
