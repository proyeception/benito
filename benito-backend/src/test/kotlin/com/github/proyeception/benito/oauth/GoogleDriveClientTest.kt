package com.github.proyeception.benito.oauth

import arrow.core.right
import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.proyeception.benito.Spec
import com.github.proyeception.benito.connector.OAuthConnector
import com.github.proyeception.benito.connector.HttpResponse
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.mock.eq
import com.github.proyeception.benito.mock.getMock
import com.github.proyeception.benito.mock.on
import com.github.proyeception.benito.utils.FileHelper
import com.nhaarman.mockito_kotlin.anyVararg
import io.kotlintest.matchers.shouldBe
import org.mockito.ArgumentMatchers.any
import org.mockito.ArgumentMatchers.anyString
import org.mockito.Mockito.verify
import org.springframework.web.multipart.MultipartFile
import java.time.LocalDate
import java.time.LocalDateTime

class GoogleDriveClientTest : Spec() {
    init {
        val mapperMock: ObjectMapper = getMock()
        val connectorMock: OAuthConnector = getMock()
        val fileHelperMock: FileHelper = getMock()
        val googleDriveClient = GoogleDriveClient(
            objectMapper = mapperMock,
            googleDriveConnector = connectorMock,
            fileHelper = fileHelperMock
        )

        "getFile" should {
            "retrieve the fileId asking for webContentLink, mimeType and name of the file" {
                val responseMock: HttpResponse = getMock()
                on(connectorMock.get(anyString())).thenReturn(responseMock.right())
                val date = LocalDateTime.now()
                on(responseMock.deserializeAs(any(TypeReference::class.java))).thenReturn(
                    GoogleFileDTO(
                        id = "123",
                        name = "some name",
                        mimeType = "application/pdf",
                        webContentLink = null,
                        modifiedTime = date
                    )
                )

                val expected = GoogleFileDTO(
                    id = "123",
                    name = "some name",
                    mimeType = "application/pdf",
                    webContentLink = null,
                    modifiedTime = date
                ).right()

                val actual = googleDriveClient.getFile("123")

                actual shouldBe expected

                verify(connectorMock).get(
                    eq("https://www.googleapis.com/drive/v3/files/123?fields=id,webContentLink,name,mimeType,modifiedTime")
                )
            }
        }

        "createFile" should {
            "make a POST to the API with the file" {
                val date = LocalDateTime.now()

                val metadataBytes = ByteArray(60)
                val responseMock: HttpResponse = getMock()
                on(mapperMock.writeValueAsBytes(any(MetadataDTO::class.java))).thenReturn(metadataBytes)
                on(connectorMock.post(
                    anyString(),
                    anyVararg()
                )).thenReturn(responseMock.right())
                on(responseMock.deserializeAs(any(TypeReference::class.java))).thenReturn(
                    FileCreatedDTO(
                        id = "123",
                        name = "some-file",
                        mimeType = "application/pdf",
                        createdTime = date
                    )
                )
                val multipartMock: MultipartFile = getMock()
                val multipartBytes = ByteArray(70)
                on(multipartMock.bytes).thenReturn(multipartBytes)

                val expected = FileCreatedDTO(
                    id = "123",
                    name = "some-file",
                    mimeType = "application/pdf",
                    createdTime = date
                ).right()

                val actual = googleDriveClient.createFile("123", multipartMock, "456")

                actual shouldBe expected

                verify(connectorMock).post(
                    eq("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,createdTime"),
                    eq(Pair("application/json", metadataBytes)),
                    eq(Pair("multipart/form-data", multipartBytes))
                )
            }
        }

        "createFolder" should {
            "make a POST to the API and then make it public" {
                val date = LocalDateTime.now()

                val metadataBytes = ByteArray(60)
                val responseMock: HttpResponse = getMock()
                on(mapperMock.writeValueAsBytes(any(MetadataDTO::class.java))).thenReturn(metadataBytes)
                on(connectorMock.post(
                    anyString(),
                    any(Any::class.java)
                )).thenReturn(responseMock.right())
                on(responseMock.deserializeAs(any(TypeReference::class.java))).thenReturn(
                    FileCreatedDTO(
                        id = "123",
                        name = "some-file",
                        mimeType = "application/pdf",
                        createdTime = date
                    )
                )

                val expected = GoogleFileDTO(
                    id = "123",
                    name = "some-file",
                    mimeType = "application/pdf",
                    webContentLink = null,
                    modifiedTime = date
                ).right()

                val actual = googleDriveClient.createFolder("folder")

                actual shouldBe expected

                verify(connectorMock).post(
                    eq("https://www.googleapis.com/drive/v3/files?fields=id,name,mimeType,createdTimeg"),
                    eq(CreateFolderDTO(
                        name = "folder"
                    ))
                )
                verify(connectorMock).post(
                    eq("https://www.googleapis.com/drive/v3/files/123/permissions"),
                    eq(CreatePermissionDTO(
                        type = "anyone",
                        role = "reader"
                    ))
                )
            }
        }
    }
}