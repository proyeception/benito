package com.github.proyeception.benito.service

import com.github.proyeception.benito.Spec
import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.exception.AmbiguousReferenceException
import com.github.proyeception.benito.mock.eq
import com.github.proyeception.benito.mock.getMock
import com.github.proyeception.benito.mock.on
import com.github.proyeception.benito.mongodb.MongoCustomRecommendations
import com.nhaarman.mockito_kotlin.any
import io.kotlintest.matchers.shouldBe
import io.kotlintest.matchers.shouldThrow
import org.apache.http.entity.ContentType
import org.mockito.ArgumentMatchers.anyString
import org.mockito.Mockito.verify

class UserServiceTest : Spec() {
    init {
        val medusaMock: MedusaClient = getMock()
        val organizationMock: OrganizationService = getMock()
        val fileServiceMock: FileService = getMock()
        val recommendations: MongoCustomRecommendations = getMock()
        val userService = UserService(
            medusaClient = medusaMock,
            organizationService = organizationMock,
            fileService = fileServiceMock,
                recommendations = recommendations
        )

        "findAuthor" should {
            "fetch user and map it to domain" {
                on(medusaMock.findUser(anyString(), any())).thenReturn(
                    MedusaPersonDTO(
                        id = "123",
                        username = "benitocapo123",
                        fullName = "Benito Quinquela",
                        profilePic = MedusaFileDTO(
                            id = "profile",
                            url = "https://profilepic.com"
                        ),
                        organizations = listOf(
                            MedusaOrganizationDTO(
                                displayName = "UTN FRBA",
                                name = "utnfrba",
                                id = "123",
                                icon = MedusaFileDTO(
                                    id = "icon",
                                    url = "https://icon.com"
                                ),
                                authors = emptyList(),
                                supervisors = emptyList()
                            )
                        ),
                        projects = listOf(
                            MedusaProjectRefDTO(
                                id = "123",
                                title = "Some cool title",
                                description = "Some cool description",
                                organizationId = "123",
                                picture = MedusaFileDTO(
                                    url = "https://picture.com",
                                    id = "picture"
                                )
                            )
                        )
                    )
                )
                on(organizationMock.find(eq("123"), eq(true))).thenReturn(
                    OrganizationDTO(
                        displayName = "UTN FRBA",
                        name = "utnfrba",
                        id = "123",
                        iconUrl = "https://icon.com",
                        authors = emptyList(),
                        supervisors = emptyList()
                    )
                )

                val expected = PersonDTO(
                    id = "123",
                    username = "benitocapo123",
                    fullName = "Benito Quinquela",
                    profilePicUrl = "https://profilepic.com",
                    organizations = listOf(
                        OrganizationDTO(
                            displayName = "UTN FRBA",
                            name = "utnfrba",
                            id = "123",
                            iconUrl = "https://icon.com",
                            authors = emptyList(),
                            supervisors = emptyList()
                        )
                    ),
                    projects = listOf(
                        ProjectRefDTO(
                            id = "123",
                            title = "Some cool title",
                            pictureUrl = "https://picture.com",
                            description = "Some cool description",
                            organization = OrganizationDTO(
                                displayName = "UTN FRBA",
                                name = "utnfrba",
                                id = "123",
                                iconUrl = "https://icon.com",
                                authors = emptyList(),
                                supervisors = emptyList()
                            )
                        )
                    ),
                    contact = ContactDTO(null, null),
                    socials = SocialDTO()
                )

                val actual = userService.findAuthor("123")

                actual shouldBe expected

                verify(medusaMock).findUser(eq("123"), eq(UserType.AUTHOR))
            }
        }

        "findAuthorByGoogleId" should {
            "return null if no value matches" {
                on(medusaMock.findUsersBy(eq(UserType.AUTHOR), eq(Pair("google_user_id", "123")))).thenReturn(emptyList())

                val expected = null
                val actual = userService.findAuthorByGoogleId("123")

                actual shouldBe expected
            }

            "map medusa to domain if exactly one value is found" {
                on(medusaMock.findUsersBy(eq(UserType.AUTHOR), eq(Pair("google_user_id", "123")))).thenReturn(listOf(
                    MedusaPersonDTO(
                        id = "123",
                        username = null,
                        fullName = "Benito Quinquela",
                        organizations = emptyList(),
                        profilePic = null,
                        projects = emptyList(),
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
                    socials = SocialDTO(),
                    contact = ContactDTO(
                        phone = null,
                        mail = null
                    )
                )
                val actual = userService.findAuthorByGoogleId("123")

                actual shouldBe expected
            }

            "throw an AmbiguousReferenceExecption if more than one value is found" {
                on(medusaMock.findUsersBy(eq(UserType.AUTHOR), eq(Pair("google_user_id", "123")))).thenReturn(listOf(
                    MedusaPersonDTO(
                        id = "123",
                        username = null,
                        fullName = "Benito Quinquela",
                        organizations = emptyList(),
                        projects = emptyList()
                    ),
                    MedusaPersonDTO(
                        id = "123",
                        username = null,
                        fullName = "Benito Quinquela",
                        organizations = emptyList(),
                        projects = emptyList()
                    )
                ))

                shouldThrow<AmbiguousReferenceException> {
                    userService.findAuthorByGoogleId("123")
                }
            }
        }

        "createAuthor" should {
            "download the image to file, upload it to Medusa, upload the user, and then delete the image file" {
                val profilePicFile = MedusaFileDTO(
                    url = "https://profilepic.com",
                    id = "123"
                )

                on(fileServiceMock.createMedusaFileFromUrl(
                    url = eq("https://profilepic.com"),
                    filePath = eq("/tmp/g-123.jpg"),
                    fileName = eq("g-123.jpg"),
                    contentType = eq(ContentType.IMAGE_JPEG)
                )).thenReturn(profilePicFile)

                on(medusaMock.createUser(
                    CreateMedusaPersonDTO(
                        username = null,
                        fullName = "Benito Quinquela",
                        mail = "benito@quinquela.com.ar",
                        googleUserId = "g-123",
                        googleToken = "123",
                        profilePic = profilePicFile.id
                    ),
                    UserType.AUTHOR
                )).thenReturn(MedusaPersonDTO(
                    id = "123",
                    username = null,
                    fullName = "Benito Quinquela",
                    organizations = emptyList(),
                    projects = emptyList()
                ))

                userService.createAuthor(
                    username = null,
                    fullName = "Benito Quinquela",
                    mail = "benito@quinquela.com.ar",
                    googleUserId = "g-123",
                    googleToken = "123",
                    profilePicUrl = "https://profilepic.com"
                )
            }

            "not create the file if user has no profile picture" {
                on(medusaMock.createUser(
                    CreateMedusaPersonDTO(
                        username = null,
                        fullName = "Benito Quinquela",
                        mail = "benito@quinquela.com.ar",
                        googleUserId = "g-123",
                        googleToken = "123",
                        profilePic = null
                    ),
                    UserType.AUTHOR
                )).thenReturn(MedusaPersonDTO(
                    id = "123",
                    username = null,
                    fullName = "Benito Quinquela",
                    organizations = emptyList(),
                    projects = emptyList()
                ))

                userService.createAuthor(
                    username = null,
                    fullName = "Benito Quinquela",
                    mail = "benito@quinquela.com.ar",
                    googleUserId = "g-123",
                    googleToken = "123",
                    profilePicUrl = null
                )
            }
        }
    }
}