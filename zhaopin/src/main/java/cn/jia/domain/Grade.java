package cn.jia.domain;

public class Grade {
    private Integer id;

    private Integer userId;

    private Float score;

    private String classify;

    public Grade(Integer id, Integer userId, Float score,String classify) {
        this.id = id;
        this.userId = userId;
        this.score = score;
        this.classify = classify;
    }

    public Grade() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
    }

    public String getClassify() {
        return classify;
    }

    public void setClassify(String classify) {
        this.classify = classify;
    }
}