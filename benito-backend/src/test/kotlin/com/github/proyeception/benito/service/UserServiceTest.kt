package com.github.proyeception.benito.service

import com.github.proyeception.benito.Spec
import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.exception.NotFoundException
import com.github.proyeception.benito.mock.eq
import com.github.proyeception.benito.mock.getMock
import com.github.proyeception.benito.mock.on
import com.github.proyeception.benito.snapshot.OrganizationSnapshot
import io.kotlintest.matchers.shouldBe
import io.kotlintest.matchers.shouldThrow
import org.mockito.ArgumentMatchers.anyString
import org.mockito.Mockito.verify

class UserServiceTest : Spec() {
    init {
        val medusaMock: MedusaClient = getMock()
        val organizationMocK: OrganizationSnapshot = getMock()
        val userService = UserService(
            medusaClient = medusaMock,
            organizationSnapshot = organizationMocK
        )

        "findAuthor" should {
            "fetch user and map it to domain" {
                on(medusaMock.findUser(anyString(), anyString())).thenReturn(
                    MedusaPersonDTO(
                        id = "123",
                        username = "benitocapo123",
                        fullName = "Benito Quinquela",
                        profilePic = ImageDTO(
                            name = "profile",
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
                                icon = ImageDTO(
                                    name = "icon",
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
                                poster = ImageDTO(
                                    url = "https://poster.com",
                                    name = "poster"
                                )
                            )
                        )
                    )
                )
                on(organizationMocK.organizations()).thenReturn(
                    listOf(
                        MedusaOrganizationDTO(
                            displayName = "UTN FRBA",
                            name = "utnfrba",
                            id = "123",
                            icon = ImageDTO(
                                name = "icon",
                                url = "https://icon.com"
                            )
                        )
                    )
                )

                val expected = PersonDTO(
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
                    )
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
                        profilePic = ImageDTO(
                            name = "profile",
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
                                icon = ImageDTO(
                                    name = "icon",
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
                                poster = ImageDTO(
                                    url = "https://poster.com",
                                    name = "poster"
                                )
                            )
                        )
                    )
                )
                on(organizationMocK.organizations()).thenReturn(emptyList())

                shouldThrow<NotFoundException> {

                userService.findAuthor("123")
                }
                verify(medusaMock).findUser(eq("123"), eq("authors"))
            }
        }
    }
}