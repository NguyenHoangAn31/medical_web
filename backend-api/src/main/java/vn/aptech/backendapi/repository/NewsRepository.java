package vn.aptech.backendapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.aptech.backendapi.entities.News;


@Repository
public interface NewsRepository extends JpaRepository<News, Integer> {
}
