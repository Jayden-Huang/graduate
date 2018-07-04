
package cn.jia.common;
/**
 * Created by jia on 2017/11/23.
 */
public enum  RoleType {
    user(1,"user"),
    admin(2,"admin");

    private int id;
    private String msg;

    RoleType(int id,String msg){
        this.id = id;
        this.msg = msg;
    }

    public int getId() {
        return id;
    }

    public String getMsg() {
        return msg;
    }
}
