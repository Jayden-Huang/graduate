package cn.jia.dto;

/**
 * Created by jia on 2017/12/31.
 */
public class GradeDto {
    private Integer id;

    private Float score;

    private String classify;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
