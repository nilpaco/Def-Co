package com.definitivo.repository.search;

import com.definitivo.domain.Space;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data ElasticSearch repository for the Space entity.
 */
public interface SpaceSearchRepository extends ElasticsearchRepository<Space, Long> {
}
