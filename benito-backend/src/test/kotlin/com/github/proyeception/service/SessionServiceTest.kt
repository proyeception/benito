package com.github.proyeception.service

import com.github.proyeception.benito.service.SessionService
import com.github.proyeception.benito.utils.HashUtil
import com.github.proyeception.mock.eq
import com.github.proyeception.mock.getMock
import com.github.proyeception.mock.on
import io.kotlintest.matchers.shouldBe
import io.kotlintest.properties.forAll
import io.kotlintest.specs.WordSpec
import org.mockito.ArgumentMatchers.anyString
import org.mockito.Mockito.verify

class SessionServiceTest : WordSpec() {
    init {
        "it should pass the string to the hash util" {
            forAll { s: String ->
                val hashMock: HashUtil = getMock()
                val sessionService = SessionService(hashMock)

                on(hashMock.expiringHash(anyString())).thenReturn("hash")

                val expected = "hash"
                val actual = sessionService.createSessionToken(s)

                expected shouldBe actual

                verify(hashMock).expiringHash(eq(s))
                true
            }
        }
    }
}