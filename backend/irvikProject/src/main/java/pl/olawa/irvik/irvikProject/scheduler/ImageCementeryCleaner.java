package pl.olawa.irvik.irvikProject.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import pl.olawa.irvik.irvikProject.service.FileImageService;

@Component
public class ImageCementeryCleaner {


    @Autowired
    private FileImageService fileImageService;

    @Scheduled(cron = "@monthly")
    public void clean(){

        fileImageService.deleteAllWhereProductNull();

    }

}
