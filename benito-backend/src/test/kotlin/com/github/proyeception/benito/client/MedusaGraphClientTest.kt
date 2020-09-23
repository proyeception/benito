package com.github.proyeception.benito.client

import com.github.proyeception.benito.Spec
import com.github.proyeception.benito.connector.GraphConnector
import com.github.proyeception.benito.mock.getMock
import io.kotlintest.matchers.shouldBe

class MedusaGraphClientTest : Spec() {
    init {
        val medusaConnectorMock: GraphConnector = getMock()
        val medusaGraphClient = MedusaGraphClient(
            medusaConnectorMock
        )

        "formatParams" should {
            "return only the limit and offset if all params are null" {
                val expected = "start: 0, limit: 10"
                val actual = medusaGraphClient.formatParams()

                actual shouldBe expected
            }

            "add the params to where if not null" {
                val expected = "where: { title_contains: \"proyectate\", authors: { full_name_contains: " +
                    "\"Benito+Quinquela\" } }, start: 0, limit: 10"
                val actual = medusaGraphClient.formatParams(title = "proyectate", authorName = "Benito Quinquela")

                actual shouldBe expected
            }
        }
    }
}