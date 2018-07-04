package cn.jia.controller;

import cn.jia.common.ServerResponse;
import cn.jia.domain.Information;
import cn.jia.domain.User;
import cn.jia.mapper.InformationMapper;
import cn.jia.mapper.UserMapper;
import cn.jia.service.InformationService;
import cn.jia.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;

/**
 * Created by jia on 2017/12/11.
 */
@Controller
@RequestMapping("/info")
public class InformationController {

    @Autowired
    private InformationService informationService;
    @Autowired
    private UserService userService;
   /* @Value("${path}")
    private String path;*/
   String path = "/Users/jia/Workspace/projects/zhaopin/src/main/webapp/static/upload/";


    /**
     * 新增或更新个人信息
     * @param information
     * @param httpSession
     * @return
     */
    @PostMapping("/addOrUpdate")
    @ResponseBody
    public ServerResponse addOrUpdateInfo(Information information, HttpSession httpSession){
        String username = (String) httpSession.getAttribute("username");
        if (StringUtils.isEmpty(username)){
            return ServerResponse.buildErrorMsg("请登录");
        }
        User user = userService.findByUsername(username);
        return informationService.addOrUpdate(information,user.getId());
    }

    /**
     * 查询个人信息
     * @param session
     * @return
     */
    @GetMapping
    @ResponseBody
    public ServerResponse get(HttpSession session){
        String username = (String) session.getAttribute("username");
        if (StringUtils.isEmpty(username)){
            return ServerResponse.buildErrorMsg("请登录");
        }
        User user = userService.findByUsername(username);
        return informationService.findByUserId(user.getId());
    }

    /**
     * 上传文件
     * @param filename
     * @param session
     * @return
     */
    @PostMapping("/upload")
    @ResponseBody
    public ServerResponse uploadPhoto(@RequestParam("filename")MultipartFile filename, HttpSession session){
        String username =(String) session.getAttribute("username");
        if (StringUtils.isEmpty(username)){
            return ServerResponse.buildErrorMsg("用户未登录");
        }
        User user = userService.findByUsername(username);
        return informationService.upload(filename,path,user.getId());
    }

    @PostMapping("/uploadFile")
    @ResponseBody
    public ServerResponse uploadFiles(@RequestParam("filename")MultipartFile filename, HttpSession session){
        String username =(String) session.getAttribute("username");
        if (StringUtils.isEmpty(username)){
            return ServerResponse.buildErrorMsg("用户未登录");
        }
        User user = userService.findByUsername(username);
        return informationService.upload(filename,path,user.getId());
    }

    @DeleteMapping("/delete")
    @ResponseBody
    public ServerResponse deleteFile(HttpSession session){
        String username =(String) session.getAttribute("username");
        if (StringUtils.isEmpty(username)){
            return ServerResponse.buildErrorMsg("用户未登录");
        }
        User user = userService.findByUsername(username);
        return informationService.deleteFile(user.getId(),path);
    }

}
