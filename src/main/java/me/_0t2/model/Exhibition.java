package me._0t2.model;

import com.google.gson.annotations.SerializedName;
import lombok.Data;

/**
 * Created by jessec on 2017/5/30.
 */
@Data
public class Exhibition {
    @SerializedName("NAME")
    private String name;
    @SerializedName("TYPE")
    private String type;
    @SerializedName("ORGNAME")
    private String orgName;
    @SerializedName("PLACE")
    private String place;
    @SerializedName("EXSDATE")
    private long exsDate;
    @SerializedName("EXEDATE")
    private long exeDate;
    @SerializedName("DESCRIPTION")
    private String description;
    @SerializedName("IMAGE1")
    private String image1;
    @SerializedName("IMAGE2")
    private String image2;
}
