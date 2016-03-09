package com.definitivo.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.definitivo.domain.Favorite;
import com.definitivo.domain.Message;
import com.definitivo.domain.Space;
import com.definitivo.domain.User;
import com.definitivo.repository.FavoriteRepository;
import com.definitivo.repository.MessageRepository;
import com.definitivo.repository.SpaceRepository;
import com.definitivo.repository.UserRepository;
import com.definitivo.repository.search.SpaceSearchRepository;
import com.definitivo.security.SecurityUtils;
import com.definitivo.web.rest.dto.MessageDTO;
import com.definitivo.web.rest.dto.SpaceDTO;
import com.definitivo.web.rest.util.HeaderUtil;
import com.definitivo.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Space.
 */
@RestController
@RequestMapping("/api")
public class SpaceResource {

    private final Logger log = LoggerFactory.getLogger(SpaceResource.class);

    @Inject
    private SpaceRepository spaceRepository;

    @Inject
    private SpaceSearchRepository spaceSearchRepository;

    @Inject
    private FavoriteRepository favoriteRepository;

    @Inject
    private MessageRepository messageRepository;

    @Inject
    private UserRepository userRepository;

    /**
     * POST  /spaces -> Create a new space.
     */
    @RequestMapping(value = "/spaces",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Space> createSpace(@RequestBody Space space) throws URISyntaxException {
        log.debug("REST request to save Space : {}", space);
        if (space.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("space", "idexists", "A new space cannot already have an ID")).body(null);
        }
        Space result = spaceRepository.save(space);
        spaceSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/spaces/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("space", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /spaces -> Updates an existing space.
     */
    @RequestMapping(value = "/spaces",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Space> updateSpace(@RequestBody Space space) throws URISyntaxException {
        log.debug("REST request to update Space : {}", space);
        if (space.getId() == null) {
            return createSpace(space);
        }
        Space result = spaceRepository.save(space);
        spaceSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("space", space.getId().toString()))
            .body(result);
    }

    /**
     * GET  /spaces -> get all the spaces.
     */
    @RequestMapping(value = "/spaces",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Space>> getAllSpaces(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Spaces");
        Page<Space> page = spaceRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/spaces");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /spaces/:id -> get the "id" space.
     */
    @RequestMapping(value = "/spaces/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Space> getSpace(@PathVariable Long id) {
        log.debug("REST request to get Space : {}", id);
        Space space = spaceRepository.findOneWithEagerRelationships(id);
        return Optional.ofNullable(space)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /spaces/:id -> delete the "id" space.
     */
    @RequestMapping(value = "/spaces/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteSpace(@PathVariable Long id) {
        log.debug("REST request to delete Space : {}", id);
        spaceRepository.delete(id);
        spaceSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("space", id.toString())).build();
    }

    /**
     * SEARCH  /_search/spaces/:query -> search for the space corresponding
     * to the query.
     */
    @RequestMapping(value = "/_search/spaces/{query:.+}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Space> searchSpaces(@PathVariable String query) {
        log.debug("REST request to search Spaces for query {}", query);
        return StreamSupport
            .stream(spaceSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }


    @RequestMapping(value = "/spaces/userliked",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<SpaceDTO>> getSpaces(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Spaces");
        Page<Space> page = spaceRepository.findAll(pageable);

        List<SpaceDTO> listSpaceDTO = new ArrayList<>();

        for (Space space : page.getContent()) {
            Favorite favorite = favoriteRepository.findExistUserLiked(space.getId());
            SpaceDTO spaceDTO = new SpaceDTO();
            spaceDTO.setSpace(space);

            if (favorite == null || favorite.getLiked() == null || !favorite.getLiked()) {
                spaceDTO.setLiked(false);
            } else {
                spaceDTO.setLiked(true);
            }
            listSpaceDTO.add(spaceDTO);

        }

        Page<SpaceDTO> result = new PageImpl<SpaceDTO>(listSpaceDTO);

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/spaces");
        return new ResponseEntity<>(listSpaceDTO, headers, HttpStatus.OK);

    }

    @RequestMapping(value = "/spaces/{id}/messages",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Message> addMessageToSpace(@RequestBody MessageDTO messageDTO, @PathVariable Long id) throws URISyntaxException {
        log.debug("REST request to save Message : {}", messageDTO);

        Space space = spaceRepository.findOne(id);


        User user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin()).get();

        Message message = new Message();

        message.setText(messageDTO.getText());
        message.setUser(user);
        message.setSpace(space);

        Message result = messageRepository.save(message);

        return ResponseEntity.created(new URI("/api/spaces/"+id+"/messages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("message", result.getId().toString()))
            .body(result);
    }


    @Transactional
    @RequestMapping(value = "/spaces/{id}/messages",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Set<Message>> getMessages(@PathVariable Long id) {
        log.debug("REST request to get Messages: {}", id);
        Space space = spaceRepository.findOne(id);

        if(space==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(space.getMessages(), HttpStatus.OK);
    }

    @Transactional
    @RequestMapping(value = "/spaces/{id}/usermessages",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Message>> findByUserIsCurrentUserAndSpace(@PathVariable Long id) {
        log.debug("REST request to get Messages from User in Space: {}", id);
        Space space = spaceRepository.findOne(id);

        List<Message> messages = messageRepository.findByUserIsCurrentUserAndSpace(id);

        if(space==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(messages, HttpStatus.OK);
    }
}
