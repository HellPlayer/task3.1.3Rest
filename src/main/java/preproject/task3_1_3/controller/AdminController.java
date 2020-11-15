package preproject.task3_1_3.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import preproject.task3_1_3.model.Role;
import preproject.task3_1_3.model.User;
import preproject.task3_1_3.repo.UserRepo;

@Controller
@RequestMapping("/admin")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {

    @Autowired
    private UserRepo userRepo;

    @GetMapping()
    public String adminMain(Model model) {
        model.addAttribute("users", userRepo.findAll());
        model.addAttribute("roles", Role.values());
        return "admin";
    }

    @PostMapping("/save")
    public String save(User user) {
        userRepo.save(user);
        return "redirect:/admin";
    }

    @GetMapping("/delete")
    public String deleteUser(Long id) {
        userRepo.deleteById(id);
        return "redirect:/admin";
    }

    @GetMapping("/findOne")
    @ResponseBody
    public User findOne(Long id) {
        return userRepo.findById(id).get();
    }
}
