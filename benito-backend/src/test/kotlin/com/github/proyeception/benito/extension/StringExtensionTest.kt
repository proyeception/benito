package com.github.proyeception.benito.extension

import com.github.proyeception.benito.Spec
import io.kotlintest.matchers.shouldBe

class StringExtensionTest : Spec() {
    init {
        "fromCamelToKebab" should  {
            "replace all capital letters for - plus lower case, except for the first letter" {
                "UpperCamelCaseWord".fromCamelToKebab() shouldBe "upper-camel-case-word"
                "lowerCamelCaseWord".fromCamelToKebab() shouldBe "lower-camel-case-word"
                "kebab-case-word".fromCamelToKebab() shouldBe  "kebab-case-word"
                "snake_case_word".fromCamelToKebab() shouldBe "snake_case_word"
                "word with spaces".fromCamelToKebab() shouldBe "word-with-spaces"
                "Word With Spaces".fromCamelToKebab() shouldBe "word-with-spaces"
            }
        }
    }
}