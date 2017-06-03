package me._0t2.retrofit;

import com.google.gson.*;
import okhttp3.OkHttpClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import retrofit2.Converter;
import retrofit2.Retrofit;
import retrofit2.Retrofit.Builder;
import retrofit2.converter.gson.GsonConverterFactory;

import java.lang.reflect.Type;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.TimeZone;

/**
 * Created by jessec on 2017/5/30.
 */
public class ArtExhibitionServiceGenerator {
    public static final String ART_EXHIBITION_ENDPOINT = "http://opendata.khcc.gov.tw/public/";
    private static OkHttpClient httpClient;
    private static Builder builder;

    private static final Logger logger = LoggerFactory.getLogger(ArtExhibitionServiceGenerator.class);

    public static <T> T createService(Class<T> serviceClass) {
        httpClient = new OkHttpClient.Builder()
                .addInterceptor(
                        chain -> {
                            logger.debug("Final url: {}", chain.request().url());
                            return chain.proceed(chain.request());
                        }
                )
                .build();
        Gson gson = new GsonBuilder()
                .registerTypeAdapter(long.class, new GsonLongAdapter())
                .create();

        Converter.Factory gsonFactory = GsonConverterFactory.create(gson);

        builder = new Retrofit.Builder()
                .baseUrl(ART_EXHIBITION_ENDPOINT)
                .addConverterFactory(gsonFactory);

        return builder.client(httpClient).build().create(serviceClass);
    }

    private static class GsonLongAdapter implements JsonDeserializer<Long> {
        @Override
        public Long deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
            String dateFormatString = "yyyy/MM/dd";
            DateFormat dateFormat = new SimpleDateFormat(dateFormatString);
            dateFormat.setTimeZone(TimeZone.getTimeZone("GMT+08:00"));
            try {
                return dateFormat.parse(json.getAsString()).getTime();
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return 0L;
        }
    }
}
