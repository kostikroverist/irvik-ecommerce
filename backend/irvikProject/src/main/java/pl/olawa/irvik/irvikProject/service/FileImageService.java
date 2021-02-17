package pl.olawa.irvik.irvikProject.service;

import pl.olawa.irvik.irvikProject.domain.Filesimage;

public interface FileImageService {


    Filesimage save(Filesimage filesimage);

    void deleteAllWhereProductNull();

}
