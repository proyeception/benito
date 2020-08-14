package com.github.proyeception.benito.mock

import org.mockito.Mockito
import org.mockito.stubbing.OngoingStubbing

inline fun <reified T> getMock() = Mockito.mock(T::class.java)
fun <A> on(methodCall: A): OngoingStubbing<A> = Mockito.`when`(methodCall)
fun <T : Any> eq(value: T): T = Mockito.eq(value) ?: value