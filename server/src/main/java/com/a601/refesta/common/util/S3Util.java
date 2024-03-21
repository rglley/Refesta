package com.a601.refesta.common.util;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;

@Component
@RequiredArgsConstructor
public class S3Util {
    @Autowired
    AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.s3.base-url}")
    private String baseUrl;

    public String uploadFile(MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();
//            String fileUrl = baseUrl + fileName;
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());

            PutObjectRequest putObjectRequest = new PutObjectRequest(
                    bucket, fileName, file.getInputStream(), metadata
            );
            putObjectRequest.withCannedAcl(CannedAccessControlList.PublicRead);
            amazonS3Client.putObject(putObjectRequest);

            return fileName;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteFile(String S3FileName) {
        amazonS3Client.deleteObject(bucket, S3FileName);
    }

    public String getFile(String S3FileName) {
        try {
            URL url = amazonS3Client.getUrl(bucket, S3FileName);
            return (url != null) ? url.getPath() : null;
        } catch (Exception e) {
            return null;
        }
    }
}
