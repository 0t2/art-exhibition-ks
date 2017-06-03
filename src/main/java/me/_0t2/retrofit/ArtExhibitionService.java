package me._0t2.retrofit;

import me._0t2.model.KhccExhibition;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

import java.util.List;

/**
 * Created by jessec on 2017/5/30.
 */
public interface ArtExhibitionService {
    @GET("OD_art_exhibit.ashx?")
    Call<List<KhccExhibition>> getExhibitions(@Query("SDate") String startDate, @Query("EDate") String endDate);
}
