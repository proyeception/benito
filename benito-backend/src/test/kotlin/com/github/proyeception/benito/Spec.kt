package com.github.proyeception.benito

import com.github.proyeception.benito.mock.Mock
import com.nhaarman.mockito_kotlin.reset
import io.kotlintest.TestCaseContext
import io.kotlintest.specs.WordSpec

abstract class Spec : WordSpec() {
    override fun interceptTestCase(context: TestCaseContext, test: () -> Unit) {
        reset(*Mock.mocks().toTypedArray())
        super.interceptTestCase(context, test)
    }
}