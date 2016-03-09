package com.definitivo.repository;

import com.definitivo.domain.Message;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Message entity.
 */
public interface MessageRepository extends JpaRepository<Message,Long> {

    @Query("select message from Message message where message.user.login = ?#{principal.username}")
    List<Message> findByUserIsCurrentUser();

    @Query("select message from Message message where message.user.login = ?#{principal.username} and message.space.id = :id")
    List<Message> findByUserIsCurrentUserAndSpace(@Param("id") Long id);


}
