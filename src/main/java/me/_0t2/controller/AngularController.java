package me._0t2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Created by jessec on 2017/6/3.
 */
@Controller
public class AngularController {
    @GetMapping({"/login", "/favorite"})
    public String indexPage() {
        return "forward:/index.html";
    }
}
