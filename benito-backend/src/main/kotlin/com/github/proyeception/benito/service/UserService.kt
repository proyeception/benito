package com.github.proyeception.benito.service

import com.github.proyeception.benito.client.MangoClient
import com.github.proyeception.benito.dto.UserInfoDTO
import com.github.proyeception.benito.dto.UserTypeDTO
import com.github.proyeception.benito.utils.HashUtil

open class UserService(
    private val mangoClient: MangoClient,
    private val hashUtil: HashUtil
) {
    fun findUser(
        username: String,
        password: String,
        userTypeDTO: UserTypeDTO
    // TODO: use another enum instead of a String for the userType (but not the UserTypeDTO)
    ): UserInfoDTO = mangoClient.findUser(username, password.hash(), userTypeDTO.toString())

    private fun String.hash(): String = hashUtil.hashAndSalt(this)
}