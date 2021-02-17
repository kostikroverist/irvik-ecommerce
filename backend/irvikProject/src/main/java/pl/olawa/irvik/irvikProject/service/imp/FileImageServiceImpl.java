package pl.olawa.irvik.irvikProject.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.olawa.irvik.irvikProject.dao.FilesImageRepository;
import pl.olawa.irvik.irvikProject.domain.Filesimage;
import pl.olawa.irvik.irvikProject.service.FileImageService;

@Service
public class FileImageServiceImpl implements FileImageService {
    @Autowired
   private FilesImageRepository filesImageRepository;

    @Override
    public Filesimage save(Filesimage string) {
        return filesImageRepository.save(string);
    }

    @Override
    @Transactional
    public void deleteAllWhereProductNull() {
        filesImageRepository.deleteAllByProductsIsNull();
    }
}
