package com.github.proyeception.benito.service

import arrow.core.left
import arrow.core.right
import com.github.proyeception.benito.Spec
import com.github.proyeception.benito.dto.FileCreatedDTO
import com.github.proyeception.benito.dto.GoogleFileDTO
import com.github.proyeception.benito.mock.eq
import com.github.proyeception.benito.mock.getMock
import com.github.proyeception.benito.mock.on
import com.github.proyeception.benito.oauth.GoogleDriveClient
import io.kotlintest.matchers.shouldBe
import io.kotlintest.matchers.shouldThrow
import io.kotlintest.properties.forAll
import org.mockito.Mockito.anyString
import org.springframework.web.multipart.MultipartFile

class DocumentServiceTest : Spec() {
    init {
        val googleMock: GoogleDriveClient = getMock()
        val documentService = DocumentService(googleClient = googleMock)

        "saveFile" should {
            "return the id of the new file if it succeeds" {
                val multipartMock: MultipartFile = getMock()
                on(multipartMock.originalFilename).thenReturn("some-doc")

                on(googleMock.createFile(
                    name = eq("some-doc"),
                    file = eq(multipartMock),
                    folderId = eq("456")
                )).thenReturn(FileCreatedDTO(
                    id = "123",
                    name = "some-doc",
                    mimeType = "application/pdf"
                ).right())

                val expected = "123"
                val actual = documentService.saveFile(file = multipartMock, folderId = "456")

                actual shouldBe expected
            }

            "throw the exception as is if it failed" {
                val multipartMock: MultipartFile = getMock()
                on(multipartMock.originalFilename).thenReturn("some-doc")

                on(googleMock.createFile(
                    name = eq("some-doc"),
                    file = eq(multipartMock),
                    folderId = eq("456")
                )).thenReturn(RuntimeException("error").left())

                shouldThrow<RuntimeException> {
                    documentService.saveFile(file = multipartMock, folderId = "456")
                }
            }
        }

        "fileWebContentLink" should {
            "return the web content link if it's not null" {
                forAll { id: String, webContentLink: String ->
                    on(googleMock.getFile(eq(id))).thenReturn(
                        GoogleFileDTO(
                            id = "123",
                            name = "some-doc",
                            mimeType = "application/pdf",
                            webContentLink = webContentLink
                        ).right()
                    )
                    val expected = webContentLink
                    val actual = documentService.fileWebContentLink(id)

                    expected == actual
                }
            }

            "return the fallback if the web content link is null" {
                forAll { id: String ->
                    on(googleMock.getFile(eq(id))).thenReturn(
                        GoogleFileDTO(
                            id = "123",
                            name = "some-doc",
                            mimeType = "application/pdf",
                            webContentLink = null
                        ).right()
                    )
                    val expected = "https://fallback.com"
                    val actual = documentService.fileWebContentLink(id)

                    expected == actual
                }
            }

            "throw the exception as is if it failed" {
                on(googleMock.getFile(anyString())).thenReturn(RuntimeException("Error").left())

                shouldThrow<RuntimeException> {
                    documentService.fileWebContentLink("123")
                }
            }
        }
    }
}