package me._0t2.firebase;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseCredentials;
import com.google.firebase.database.FirebaseDatabase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.FileInputStream;
import java.io.InputStream;

/**
 * Created by jessec on 2017/5/30.
 */
@Configuration
public class FirebaseConfig {

    @Bean
    FirebaseDatabase initialFirebase() {
        try {
            InputStream serviceAccount = FirebaseConfig.class.getClassLoader().getResourceAsStream("firebase.json");
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredential(FirebaseCredentials.fromCertificate(serviceAccount))
                    .setDatabaseUrl("https://art-exhibitions-khcc.firebaseio.com/")
                    .build();

            FirebaseApp.initializeApp(options);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return FirebaseDatabase.getInstance();
    }

}
