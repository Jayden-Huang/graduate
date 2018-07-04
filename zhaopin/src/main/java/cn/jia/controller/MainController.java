package cn.jia.controller;


import cn.jia.common.ServerResponse;
import cn.jia.domain.User;
import cn.jia.exception.ErrorException;
import cn.jia.service.UserService;
import org.apache.catalina.Server;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.UUID;

@Controller
public class MainController {

    @Autowired
    private UserService userService;

    @GetMapping("/login1")
    public String login(){

        return "login";
    }

    @GetMapping("/index1")
    public String index(){
        return "index";
    }

    @PostMapping("/loginCheck")
    public String loginCheck(String username, String password, HttpSession session, Model model){

        UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken(username,password);
        usernamePasswordToken.setRememberMe(true);

        Subject subject = SecurityUtils.getSubject();

        try {
            subject.login(usernamePasswordToken);
            session.setAttribute("username",(String)subject.getPrincipal());
            model.addAttribute("username",(String)subject.getPrincipal());
             //session1 = subject.getSession(true);
           /* User user = (User) subject.getPrincipal();
            System.out.println("---"+user.getUsername());*/
            return "index";
        }catch (Exception e){
            model.addAttribute("flag","failed");
            return "login";
        }
    }
    @GetMapping("/error1")
    public String loginError(){
        return "err";
    }

      /**
       * 注册
       */
      @GetMapping("/register")
      public String register(){
          return "register";
      }



      @PostMapping("/registerCheck")
      @ResponseBody
      public ServerResponse register(User user){
          //密码加密
          Md5Hash md5Hash = new Md5Hash(user.getPassword().toString(),"",1);
          user.setPassword(md5Hash.toString());
          return userService.register(user);
      }
      //检验答案
      @PostMapping("/checkAnswer")
      @ResponseBody
      public ServerResponse checkAnswer(String username, String answer1,
                                        String answer2, HttpSession httpSession){
          ServerResponse serverResponse =   userService.checkAnswer(username,answer1,answer2);
          if (serverResponse.isSuccess()){
              //存储一个token，根据username
              httpSession.setAttribute(username, UUID.randomUUID());
          }

          return  serverResponse;
      }

      //更改密码
      @PostMapping("/changePassword")
      @ResponseBody
     public ServerResponse changePassword(String username,
                              String newPassword,HttpSession session){
          Object UUID = session.getAttribute(username);
          if (UUID == null){
              return ServerResponse.buildErrorMsg("请先验证密保");
          }
         return userService.changePassword(username,newPassword);
     }

     @GetMapping("/logout")
     public String logout(HttpSession session){
         session.removeAttribute("username");
         Subject subject = SecurityUtils.getSubject();
         subject.logout();
         return "login";
     }


}
