package com.github.proyeception.benito.service

import com.github.proyeception.benito.Spec
import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.exception.AmbiguousReferenceException
import com.github.proyeception.benito.exception.NotFoundException
import com.github.proyeception.benito.mock.eq
import com.github.proyeception.benito.mock.getMock
import com.github.proyeception.benito.mock.on
import com.github.proyeception.benito.snapshot.OrganizationSnapshot
import com.github.proyeception.benito.utils.FileHelper
import com.nhaarman.mockito_kotlin.any
import com.nhaarman.mockito_kotlin.never
import io.kotlintest.matchers.shouldBe
import io.kotlintest.matchers.shouldThrow
import org.apache.http.entity.ContentType
import org.mockito.ArgumentMatchers.anyString
import org.mockito.Mockito.verify
import java.io.File

class UserServiceTest : Spec() {
    init {
        val medusaMock: MedusaClient = getMock()
        val organizationMock: OrganizationSnapshot = getMock()
        val fileHelperMock: FileHelper = getMock()
        val userService = UserService(
            medusaClient = medusaMock,
            organizationSnapshot = organizationMock,
            fileHelper = fileHelperMock
        )

        "findAuthor" should {
            "fetch user and map it to domain" {
                on(medusaMock.findUser(anyString(), anyString())).thenReturn(
                    MedusaPersonDTO(
                        id = "123",
                        username = "benitocapo123",
                        fullName = "Benito Quinquela",
                        profilePic = MedusaFileDTO(
                            id = "profile",
                            url = "https://profilepic.com"
                        ),
                        socials = listOf(
                            SocialDTO(
                                socialName = "Twitter",
                                socialProfileUrl = "https://twitter.com/benito"
                            )
                        ),
                        organizations = listOf(
                            MedusaOrganizationDTO(
                                displayName = "UTN FRBA",
                                name = "utnfrba",
                                id = "123",
                                icon = MedusaFileDTO(
                                    id = "icon",
                                    url = "https://icon.com"
                                )
                            )
                        ),
                        projects = listOf(
                            MedusaProjectRefDTO(
                                id = "123",
                                title = "Some cool title",
                                description = "Some cool description",
                                organizationId = "123",
                                poster = MedusaFileDTO(
                                    url = "https://poster.com",
                                    id = "poster"
                                )
                            )
                        ),
                        mail = null,
                        phone = null
                    )
                )
                on(organizationMock.find(any())).thenReturn(
                    MedusaOrganizationDTO(
                        displayName = "UTN FRBA",
                        name = "utnfrba",
                        id = "123",
                        icon = MedusaFileDTO(
                            id = "icon",
                            url = "https://icon.com"
                        )
                    )
                )

                val expected = PersonDTO(
                    id = "123",
                    username = "benitocapo123",
                    fullName = "Benito Quinquela",
                    profilePicUrl = "https://profilepic.com",
                    socials = listOf(
                        SocialDTO(
                            socialName = "Twitter",
                            socialProfileUrl = "https://twitter.com/benito"
                        )
                    ),
                    organizations = listOf(
                        OrganizationDTO(
                            displayName = "UTN FRBA",
                            name = "utnfrba",
                            id = "123",
                            iconUrl = "https://icon.com"
                        )
                    ),
                    projects = listOf(
                        ProjectRefDTO(
                            id = "123",
                            title = "Some cool title",
                            posterUrl = "https://poster.com",
                            description = "Some cool description",
                            organization = OrganizationDTO(
                                displayName = "UTN FRBA",
                                name = "utnfrba",
                                id = "123",
                                iconUrl = "https://icon.com"
                            )
                        )
                    ),
                    contact = ContactDTO(null, null)
                )

                val actual = userService.findAuthor("123")

                actual shouldBe expected

                verify(medusaMock).findUser(eq("123"), eq("authors"))
            }

            "throw a not found exception if no snapshot organization is found with a matching id" {
                on(medusaMock.findUser(anyString(), anyString())).thenReturn(
                    MedusaPersonDTO(
                        id = "123",
                        username = "benitocapo123",
                        fullName = "Benito Quinquela",
                        profilePic = MedusaFileDTO(
                            id = "profile",
                            url = "https://profilepic.com"
                        ),
                        socials = listOf(
                            SocialDTO(
                                socialName = "Twitter",
                                socialProfileUrl = "https://twitter.com/benito"
                            )
                        ),
                        organizations = listOf(
                            MedusaOrganizationDTO(
                                displayName = "UTN FRBA",
                                name = "utnfrba",
                                id = "123",
                                icon = MedusaFileDTO(
                                    id = "icon",
                                    url = "https://icon.com"
                                )
                            )
                        ),
                        projects = listOf(
                            MedusaProjectRefDTO(
                                id = "123",
                                title = "Some cool title",
                                description = "Some cool description",
                                organizationId = "123",
                                poster = MedusaFileDTO(
                                    url = "https://poster.com",
                                    id = "poster"
                                )
                            )
                        ),
                        mail = null,
                        phone = null
                    )
                )
                on(organizationMock.find(any())).thenReturn(null)

                shouldThrow<NotFoundException> {

                    userService.findAuthor("123")
                }
                verify(medusaMock).findUser(eq("123"), eq("authors"))
            }
        }

        "findAuthorByGoogleId" should {
            "return null if no value matches" {
                on(medusaMock.findUsersBy(eq("authors"), eq(Pair("google_user_id", "123")))).thenReturn(emptyList())

                val expected = null
                val actual = userService.findAuthorByGoogleId("123")

                actual shouldBe expected
            }

            "map medusa to domain if exactly one value is found" {
                on(medusaMock.findUsersBy(eq("authors"), eq(Pair("google_user_id", "123")))).thenReturn(listOf(
                    MedusaPersonDTO(
                        id = "123",
                        username = null,
                        fullName = "Benito Quinquela",
                        organizations = emptyList(),
                        profilePic = null,
                        projects = emptyList(),
                        socials = emptyList(),
                        mail = null,
                        phone = null
                    )
                ))

                val expected = PersonDTO(
                    id = "123",
                    username = null,
                    fullName = "Benito Quinquela",
                    organizations = emptyList(),
                    profilePicUrl = null,
                    projects = emptyList(),
                    socials = emptyList(),
                    contact = ContactDTO(
                        phone = null,
                        mail = null
                    )
                )
                val actual = userService.findAuthorByGoogleId("123")

                actual shouldBe expected
            }

            "throw an AmbiguousReferenceExecption if more than one value is found" {
                on(medusaMock.findUsersBy(eq("authors"), eq(Pair("google_user_id", "123")))).thenReturn(listOf(
                    MedusaPersonDTO(
                        id = "123",
                        username = null,
                        fullName = "Benito Quinquela",
                        organizations = emptyList(),
                        profilePic = null,
                        projects = emptyList(),
                        socials = emptyList(),
                        mail = null,
                        phone = null
                    ),
                    MedusaPersonDTO(
                        id = "123",
                        username = null,
                        fullName = "Benito Quinquela",
                        organizations = emptyList(),
                        profilePic = null,
                        projects = emptyList(),
                        socials = emptyList(),
                        mail = null,
                        phone = null
                    )
                ))

                shouldThrow<AmbiguousReferenceException> {
                    userService.findAuthorByGoogleId("123")
                }
            }
        }

        "createAuthor" should {
            "download the image to file, upload it to Medusa, upload the user, and then delete the image file" {
                val fileMock: File = getMock()
                on(fileHelperMock.downloadImage(eq("https://profilepic.com"), eq("/tmp/g-123.jpg"))).thenReturn(fileMock)
                val profilePicFile = MedusaFileDTO(
                    url = "https://profilepic.com",
                    id = "123"
                )

                on(medusaMock.createFile(
                    file = eq(fileMock),
                    filename = eq("g-123"),
                    contentType = eq(ContentType.IMAGE_JPEG)
                )).thenReturn(profilePicFile)

                userService.createAuthor(
                    username = null,
                    fullName = "Benito Quinquela",
                    mail = "benito@quinquela.com.ar",
                    googleUserId = "g-123",
                    googleToken = "123",
                    profilePicUrl = "https://profilepic.com"
                )

                verify(fileHelperMock).deleteFile(eq(fileMock))
                verify(medusaMock).createUser(
                    CreateMedusaPersonDTO(
                        username = null,
                        fullName = "Benito Quinquela",
                        mail = "benito@quinquela.com.ar",
                        googleUserId = "g-123",
                        googleToken = "123",
                        profilePic = profilePicFile
                    ),
                    "authors"
                )
            }

            "delete the image even if there's an error thrown when creating the file in medusa" {
                val fileMock: File = getMock()
                on(fileHelperMock.downloadImage(eq("https://profilepic.com"), eq("/tmp/g-123.jpg"))).thenReturn(fileMock)

                on(medusaMock.createFile(
                    file = eq(fileMock),
                    filename = eq("g-123"),
                    contentType = eq(ContentType.IMAGE_JPEG)
                )).thenThrow(RuntimeException("Error"))

                shouldThrow<RuntimeException> {
                    userService.createAuthor(
                        username = null,
                        fullName = "Benito Quinquela",
                        mail = "benito@quinquela.com.ar",
                        googleUserId = "g-123",
                        googleToken = "123",
                        profilePicUrl = "https://profilepic.com"
                    )
                }

                verify(fileHelperMock).deleteFile(eq(fileMock))
            }

            "not create the file if user has no profile picture" {
                val fileMock: File = getMock()
                on(fileHelperMock.downloadImage(eq("https://profilepic.com"), eq("/tmp/g-123.jpg"))).thenReturn(fileMock)

                userService.createAuthor(
                    username = null,
                    fullName = "Benito Quinquela",
                    mail = "benito@quinquela.com.ar",
                    googleUserId = "g-123",
                    googleToken = "123",
                    profilePicUrl = null
                )

                verify(fileHelperMock, never()).downloadImage(anyString(), anyString())
                verify(fileHelperMock, never()).deleteFile(eq(fileMock))
                verify(medusaMock, never()).createFile(
                    file = eq(fileMock),
                    filename = eq("g-123"),
                    contentType = eq(ContentType.IMAGE_JPEG)
                )
                verify(medusaMock).createUser(
                    CreateMedusaPersonDTO(
                        username = null,
                        fullName = "Benito Quinquela",
                        mail = "benito@quinquela.com.ar",
                        googleUserId = "g-123",
                        googleToken = "123",
                        profilePic = null
                    ),
                    "authors"
                )
            }
        }
    }
}