package preproject.task3_1_3.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import preproject.task3_1_3.model.User;
import preproject.task3_1_3.repo.UserRepo;

import java.util.List;

@RestController
@RequestMapping("/rest/users/")
public class UsersRestController {

    @Autowired
    private UserRepo userRepo;

    @GetMapping()
    public List<User> findAll() {
        return userRepo.findAll();
    }

    @GetMapping("{id}")
    public User findOne(@PathVariable("id") Long id) {
        return userRepo.findById(id).get();
    }

    @PostMapping
    public User create(@RequestBody User user) {
        userRepo.save(user);
        return user;
    }

    @PutMapping("{id}")
    public User update(@PathVariable("id") Long id, @RequestBody User user) {
        User userFromDB = userRepo.findById(id).get();
        userFromDB.setUsername(user.getUsername());
        userFromDB.setPassword(user.getPassword());
        userFromDB.setEmail(user.getEmail());
        userFromDB.setRoles(user.getRoles());
        return userFromDB;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Long id) {
        userRepo.deleteById(id);
    }
}
