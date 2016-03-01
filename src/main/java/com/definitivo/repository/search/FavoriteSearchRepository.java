package com.definitivo.repository.search;

import com.definitivo.domain.Favorite;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data ElasticSearch repository for the Favorite entity.
 */
public interface FavoriteSearchRepository extends ElasticsearchRepository<Favorite, Long> {
}
