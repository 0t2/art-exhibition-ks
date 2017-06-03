package me._0t2.model;

import com.google.gson.annotations.SerializedName;
import lombok.Data;
import me._0t2.model.Exhibition;

/**
 * Created by jessec on 2017/5/30.
 */
@Data
public class KhccExhibition extends Exhibition {
    @SerializedName("ID")
    private int id;
}

