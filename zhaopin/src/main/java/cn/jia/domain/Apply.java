package cn.jia.domain;

/**
 * Created by jia on 2017/12/4.
 * 职位申请
 */
public class Apply {
    private int id;
    private int pId;
    private int userId;
    private int resumeId; //1代表在线简历，2代表附件简历

    public Apply(Integer id,Integer userId, Integer pId, Integer resumeId) {
        this.id = id;
        this.pId = pId;
        this.userId = userId;
        this.resumeId = resumeId;
    }
    public Apply(){}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getpId() {
        return pId;
    }

    public void setpId(int pId) {
        this.pId = pId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getResumeId() {
        return resumeId;
    }

    public void setResumeId(int resumeId) {
        this.resumeId = resumeId;
    }
}
