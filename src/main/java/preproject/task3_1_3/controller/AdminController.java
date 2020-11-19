package preproject.task3_1_3.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import preproject.task3_1_3.model.Role;
import preproject.task3_1_3.repo.UserRepo;

@Controller
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {

    @Autowired
    private UserRepo userRepo;

    @GetMapping("/admin")
    public String index(Model model) {
        model.addAttribute("roles", Role.values());
        return "index";
    }
}
