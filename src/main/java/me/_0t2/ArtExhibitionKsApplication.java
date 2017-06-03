package me._0t2;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import me._0t2.model.Exhibition;
import me._0t2.model.KhccExhibition;
import me._0t2.retrofit.ArtExhibitionService;
import me._0t2.retrofit.ArtExhibitionServiceGenerator;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import retrofit2.Call;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@EnableScheduling
@SpringBootApplication
public class ArtExhibitionKsApplication {

    private static final Logger logger = LoggerFactory.getLogger(ArtExhibitionKsApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(ArtExhibitionKsApplication.class, args);
    }

    @Autowired
    private FirebaseDatabase firebaseDatabase;

    @PostConstruct
    void onInit() {
        createImageFolder();
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        LocalDate now = LocalDate.now();

        Call<List<KhccExhibition>> exhibitionsCall = ArtExhibitionServiceGenerator
                .createService(ArtExhibitionService.class)
                .getExhibitions(now.format(dateTimeFormatter), now.plusYears(1).format(dateTimeFormatter));

        List<KhccExhibition> khccExhibitions = null;
        try {
            khccExhibitions = exhibitionsCall.execute().body();
            Map<String, Exhibition> exs = new HashMap<>();
            khccExhibitions.stream().forEach(khccExhibition -> {
                Exhibition exhibition = new Exhibition();
                BeanUtils.copyProperties(khccExhibition, exhibition);
                if (!khccExhibition.getImage1().equals("")) {
                    downloadImage(exhibition.getImage1());
                    exhibition.setImage1("assets/art-images/" + FilenameUtils.getName(exhibition.getImage1()));
                }
                if (!khccExhibition.getImage2().equals("")) {
                    downloadImage(khccExhibition.getImage2());
                    exhibition.setImage2("assets/art-images/" + FilenameUtils.getName(exhibition.getImage2()));
                }
                exs.put(String.valueOf(khccExhibition.getId()), exhibition);
            });


            DatabaseReference ref = firebaseDatabase.getReference("exhibits");

            ref.setValue(exs, (databaseError, databaseReference) -> {
                if (databaseError != null) {
                    System.out.println("Data could not be saved " + databaseError.getMessage());
                } else {
                    System.out.println("Data saved successfully.");
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    void createImageFolder() {
        Path imageFolderPath = Paths.get("art-images");
        if (!imageFolderPath.toFile().exists()) {
            try {
                Files.createDirectory(imageFolderPath);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    void downloadImage(String imageUrl) {
        String imageName = FilenameUtils.getName(imageUrl);
        try {
            Path filePath = Paths.get("art-images", imageName);
            if (!filePath.toFile().exists()) {
                try (InputStream in = new URL(imageUrl).openStream()) {
                    Files.copy(in, filePath);
                }
            }
        } catch (IOException e) {
            logger.debug("get {} failed.", imageUrl);
            e.printStackTrace();
        }
    }


    @Scheduled(cron = "0 0 0 * * *")
    void reportCurrentTime() {
        onInit();
    }
}
