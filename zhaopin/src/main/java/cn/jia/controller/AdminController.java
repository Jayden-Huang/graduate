package cn.jia.controller;

import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

/**
 * Created by jia on 2017/12/30.
 * 管理员控制器
 */
@Controller
@RequestMapping("/admin")
public class AdminController {

    @RequiresRoles("admin")
    @GetMapping("/")
    public String index(HttpSession session){
        return "manage/index";
    }

    //展现简历
    @RequiresRoles("admin")
    @GetMapping("/resume")
    public String resume(){
        return "redirect:/resume/manager";
    }
    //展现题库
    @RequiresRoles("admin")
    @GetMapping("/question")
    public String question(){
        return "redirect:/question/manager";
    }
    @RequiresRoles("admin")
    @GetMapping("/position")
    public String position(){
        return "redirect:/position/manager";
    }
    @RequiresRoles("admin")
    @GetMapping("/user")
    public String user(){
        return "redirect:/user/admin/show";
    }
}
