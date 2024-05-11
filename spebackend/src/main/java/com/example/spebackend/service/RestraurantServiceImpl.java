package com.example.spebackend.service;

import com.example.spebackend.model.Restaurant;
import com.example.spebackend.repository.RestraurantRepository;
import com.example.spebackend.service.RestraurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RestraurantServiceImpl implements RestraurantService {
    private final RestraurantRepository restraurantRepository;

    public RestraurantServiceImpl(RestraurantRepository restraurantRepository) {
        this.restraurantRepository = restraurantRepository;
    }

    @Override
    public List<Restaurant> getAllRestaurantsWithTableCountGreaterThanZero() {
        return restraurantRepository.findByTableCountGreaterThan(0);
    }
}