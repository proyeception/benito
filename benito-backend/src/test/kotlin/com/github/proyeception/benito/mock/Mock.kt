package com.github.proyeception.benito.mock

import org.mockito.Mockito
import org.mockito.stubbing.OngoingStubbing

object Mock {

    private val mocks: MutableSet<Any> = mutableSetOf()

    fun mocks() = mocks.toSet()

    fun addMock(mock: Any) {
        mocks += mock
    }

    inline fun <reified T> get(): T {
        val mock = Mockito.mock(T::class.java)!!
        addMock(mock)
        return mock
    }

    infix fun <A> A.thenReturn(value: A): OngoingStubbing<A> =
        Mockito.`when`(this).thenReturn(value)

    fun setUpResponses(block: Mock.() -> Unit) =
        this.block()
}

fun <A> on(methodCall: A): OngoingStubbing<A> = Mockito.`when`(methodCall)
inline fun <reified T> getMock() = Mock.get<T>()
fun <T : Any> eq(value: T): T = Mockito.eq(value) ?: value