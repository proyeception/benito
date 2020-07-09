package com.github.proyeception.service

import com.github.proyeception.benito.client.MangoClient
import com.github.proyeception.benito.dto.UserInfoDTO
import com.github.proyeception.benito.dto.UserTypeDTO
import com.github.proyeception.benito.service.UserService
import com.github.proyeception.benito.utils.HashUtil
import com.github.proyeception.mock.eq
import com.github.proyeception.mock.getMock
import com.github.proyeception.mock.on
import io.kotlintest.matchers.shouldBe
import io.kotlintest.properties.forAll
import io.kotlintest.specs.WordSpec
import org.mockito.ArgumentMatchers.anyString
import org.mockito.Mockito.verify

class UserServiceTest : WordSpec() {
    init {
        "should hash the password and convert the userType to string" {
            forAll { username: String, password: String ->
                val hashMock: HashUtil = getMock()
                val mangoClient: MangoClient = getMock()
                val userService = UserService(
                    mangoClient = mangoClient,
                    hashUtil = hashMock
                )

                on(hashMock.hashAndSalt(anyString())).thenReturn("hash")
                on(mangoClient.findUser(anyString(), anyString(), anyString())).thenReturn(UserInfoDTO(
                    id = "123",
                    name = "Benito",
                    lastName = "Quinquela",
                    profilePicUrl = "https://github.com/favicon.ico",
                    email = "benito@project.com",
                    organization = "Proyectate",
                    projectRefs = emptyList(),
                    socials = emptyList()
                ))

                val expected = UserInfoDTO(
                    id = "123",
                    name = "Benito",
                    lastName = "Quinquela",
                    profilePicUrl = "https://github.com/favicon.ico",
                    email = "benito@project.com",
                    organization = "Proyectate",
                    projectRefs = emptyList(),
                    socials = emptyList()
                )
                val actual = userService.findUser(username, password, UserTypeDTO.STUDENT)

                expected shouldBe actual
                verify(hashMock).hashAndSalt(eq(password))
                verify(mangoClient).findUser(eq(username), eq("hash"), eq("STUDENT"))
                true
            }
        }
    }
}