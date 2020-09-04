package com.github.proyeception.benito.service

import com.github.proyeception.benito.Spec
import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.MedusaFileDTO
import com.github.proyeception.benito.mock.eq
import com.github.proyeception.benito.mock.getMock
import com.github.proyeception.benito.mock.on
import com.github.proyeception.benito.utils.FileHelper
import com.nhaarman.mockito_kotlin.any
import io.kotlintest.matchers.shouldBe
import io.kotlintest.matchers.shouldThrow
import org.apache.http.entity.ContentType
import org.mockito.Mockito.verify
import org.springframework.web.multipart.MultipartFile
import java.io.File

class FileServiceTest : Spec() {
    init {
        val fileHelperMock: FileHelper = getMock()
        val medusaMock: MedusaClient = getMock()
        val fileService = FileService(
            medusaClient = medusaMock,
            fileHelper = fileHelperMock
        )

        "createMedusaFileFromMultipart" should {
            "download the multipart file, create the file in medusa and then delete the file" {
                val medusaFile = MedusaFileDTO(
                    id = "123",
                    url = "https://resource.com"
                )
                val fileMock: File = getMock()
                on(fileHelperMock.downloadMultipartFile(any(), any())).thenReturn(fileMock)
                on(medusaMock.createFile(any(), any(), any())).thenReturn(medusaFile)

                val multipartMock: MultipartFile = getMock()

                val expected = medusaFile
                val actual = fileService.createMedusaFileFromUpload(
                    multipart = multipartMock,
                    filePath = "/tmp/file.jpg",
                    fileName = "file.jpg",
                    contentType = ContentType.IMAGE_JPEG
                )

                actual shouldBe expected

                verify(fileHelperMock).downloadMultipartFile(eq(multipartMock), eq("/tmp/file.jpg"))
                verify(fileHelperMock).deleteFile(eq(fileMock))
                verify(medusaMock).createFile(eq(fileMock), eq("file.jpg"), eq(ContentType.IMAGE_JPEG))
            }

            "delete the file even if something in medusa fails" {
                val fileMock: File = getMock()
                on(fileHelperMock.downloadMultipartFile(any(), any())).thenReturn(fileMock)
                on(medusaMock.createFile(any(), any(), any())).thenThrow(RuntimeException("error"))

                shouldThrow<RuntimeException> {
                    fileService.createMedusaFileFromUpload(
                        multipart = getMock(),
                        filePath = "/tmp/image.jpg",
                        fileName = "image.jpg",
                        contentType = ContentType.IMAGE_JPEG
                    )
                }

                verify(fileHelperMock).deleteFile(eq(fileMock))
            }
        }

        "createMedusaImageFromUrl" should {
            "download the file from the url to a temporary file, upload it to medusa and then delete the file" {
                val medusaFile = MedusaFileDTO(
                    id = "123",
                    url = "https://resource.com"
                )
                val fileMock: File = getMock()
                on(fileHelperMock.downloadFromUrl(any(), any())).thenReturn(fileMock)
                on(medusaMock.createFile(any(), any(), any())).thenReturn(medusaFile)

                val expected = medusaFile
                val actual = fileService.createMedusaFileFromUrl(
                    url = "https://resource.jpg",
                    filePath = "/tmp/file.jpg",
                    fileName = "file.jpg",
                    contentType = ContentType.IMAGE_JPEG
                )

                actual shouldBe expected

                verify(fileHelperMock).downloadFromUrl(eq("https://resource.jpg"), eq("/tmp/file.jpg"))
                verify(fileHelperMock).deleteFile(eq(fileMock))
                verify(medusaMock).createFile(eq(fileMock), eq("file.jpg"), eq(ContentType.IMAGE_JPEG))
            }

            "delete the file even if something fails in medusa" {
                val fileMock: File = getMock()
                on(fileHelperMock.downloadFromUrl(any(), any())).thenReturn(fileMock)
                on(medusaMock.createFile(any(), any(), any())).thenThrow(RuntimeException("error"))

                shouldThrow<RuntimeException> {
                    fileService.createMedusaFileFromUrl(
                        url = "https://resource.jpg",
                        filePath = "/tmp/file.jpg",
                        fileName = "file.jpg",
                        contentType = ContentType.IMAGE_JPEG
                    )
                }

                verify(fileHelperMock).downloadFromUrl(eq("https://resource.jpg"), eq("/tmp/file.jpg"))
                verify(fileHelperMock).deleteFile(eq(fileMock))
            }
        }
    }
}