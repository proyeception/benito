package com.github.proyeception.benito.service

import arrow.fx.Promise
import arrow.fx.extensions.io.concurrent.Promise
import com.github.proyeception.benito.client.MedusaClient
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.exception.AmbiguousReferenceException
import com.github.proyeception.benito.storage.CustomizationStorage
import com.github.proyeception.benito.utils.HashHelper
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.future.future
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withContext
import org.apache.http.entity.ContentType
import org.slf4j.LoggerFactory
import org.springframework.web.multipart.MultipartFile
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

open class UserService(
    private val medusaClient: MedusaClient,
    private val organizationService: OrganizationService,
    private val fileService: FileService,
    private val customizationStorage: CustomizationStorage,
    private val projectService: ProjectService,
    private val hashUtils: HashHelper
) {
    open fun findAuthor(userId: String): PersonDTO = findUserById(userId, UserType.AUTHOR)

    open fun findSupervisor(userId: String): PersonDTO = findUserById(userId, UserType.SUPERVISOR)

    open fun findSupervisorByGoogleId(id: String): PersonDTO? = findUserByGoogleId(id, UserType.SUPERVISOR)

    open fun findAuthorByEmail(mail: String): PersonDTO? = findOneUserBy(
        UserType.SUPERVISOR,
        Pair("mail", mail)
    )

    open fun findAuthorByGoogleId(id: String): PersonDTO? = findUserByGoogleId(id, UserType.AUTHOR)

    open fun findSupervisorByEmail(mail: String): PersonDTO? = findOneUserBy(
        UserType.SUPERVISOR,
        Pair("mail", mail)
    )

    open fun createGhostAuthor(ghost: CreateGhostUserDTO) = createGhostUser(
        ghost,
        UserType.AUTHOR
    )

    open fun createGhostSupervisor(ghost: CreateGhostUserDTO) = createGhostUser(
        ghost,
        UserType.SUPERVISOR
    )

    open fun createAuthor(
        username: String?,
        fullName: String,
        mail: String,
        googleUserId: String,
        googleToken: String,
        profilePicUrl: String?
    ): PersonDTO = mapMedusaToDomain {
        val image = createImageFromUrl(googleUserId, profilePicUrl)

        val person = CreateMedusaPersonDTO(
            fullName = fullName,
            username = username,
            mail = mail,
            googleUserId = googleUserId,
            profilePic = image?.id,
            googleToken = googleToken
        )

        medusaClient.createUser(person, UserType.AUTHOR)
    }

    fun updateAuthorProfilePicture(id: String, image: MultipartFile): PersonDTO = updateUserProfilePicture(
        id = id,
        image = image,
        userType = UserType.AUTHOR
    )

    fun updateSupervisorProfilePicture(id: String, image: MultipartFile): PersonDTO = updateUserProfilePicture(
        id = id,
        image = image,
        userType = UserType.SUPERVISOR
    )

    fun updateAuthor(id: String, user: UpdateUserDTO) = updateUser(
        id = id,
        user = user,
        userType = UserType.AUTHOR
    )

    fun updateSupervisor(id: String, user: UpdateUserDTO) = updateUser(
        id = id,
        user = user,
        userType = UserType.SUPERVISOR
    )

    fun authorLeaveOrganization(authorId: String, organizationId: String) = leaveOrganization(
        userId = authorId,
        organizationId = organizationId,
        userType = UserType.AUTHOR
    )

    fun supervisorLeaveOrganization(supervisorId: String, organizationId: String) = leaveOrganization(
        userId = supervisorId,
        organizationId = organizationId,
        userType = UserType.SUPERVISOR
    )

    fun getCustomRecommendedProjects(token: String): List<ProjectDTO> {
        val tracking = customizationStorage.customRecommendations(token)

        tracking.map {
            CoroutineScope(Dispatchers.IO).future { projectService.recommendedProjects(it.projectId) }
        }

        CoroutineScope(Dispatchers.IO).future {
        }

        return runBlocking {
            tracking.flatMap {
                withContext(Dispatchers.Default) { projectService.recommendedProjects(it.projectId) }
            }
        }
            .distinct()
            .take(10)
    }

    private fun createGhostUser(ghost: CreateGhostUserDTO, userType: UserType) = mapMedusaToDomain {
        medusaClient.createGhostUser(ghost, userType)
    }

    private fun findOneUserBy(userType: UserType, vararg filters: Pair<String, String>): PersonDTO? = medusaClient
        .findUsersBy(
            userType,
            *filters
        )
        .let {
            when (it.size) {
                0 -> null
                1 -> mapMedusaToDomain(it::first)
                else -> {
                    LOGGER.error("Ambiguous filter $filters")
                    throw AmbiguousReferenceException("Ambiguous filter")
                }
            }
        }

    private fun findUserByGoogleId(id: String, userType: UserType): PersonDTO? = findOneUserBy(
        userType,
        Pair("google_user_id", id)
    )

    private fun findUserById(userId: String, userType: UserType) = mapMedusaToDomain {
        medusaClient.findUser(
            userId,
            userType
        )
    }

    private fun createImageFromUrl(userId: String, profilePicUrl: String?): MedusaFileDTO? = profilePicUrl?.let {
        fileService.createMedusaFileFromUrl(
            url = it,
            filePath = "/tmp/$userId.jpg",
            fileName = "$userId.jpg",
            contentType = ContentType.IMAGE_JPEG
        )
    }
        ?.also { LOGGER.info("Created image with id ${it.id} on medusa") }

    private fun mapIdToOrganization(organizationId: String): OrganizationDTO = organizationService
        .find(organizationId)

    private fun mapMedusaToDomain(f: () -> MedusaPersonDTO): PersonDTO = f().let { medusa ->
        PersonDTO(
            id = medusa.id,
            username = medusa.username,
            fullName = medusa.fullName,
            organizations = medusa.organizations.map { OrganizationDTO(it) },
            profilePicUrl = medusa.profilePic?.url,
            projects = medusa.projects
                .distinct()
                .map {
                ProjectRefDTO(
                    id = it.id,
                    title = it.title,
                    pictureUrl = it.picture?.url,
                    organization = mapIdToOrganization(it.organizationId),
                    description = it.description
                )
            },
            socials = SocialDTO(
                facebook = medusa.facebook,
                linkedin = medusa.linkedin,
                twitter = medusa.twitter
            ),
            contact = ContactDTO(
                mail = medusa.mail,
                phone = medusa.phone
            ),
            about = medusa.about,
            ghost = medusa.ghost
        )
    }

    private fun updateUserProfilePicture(id: String, image: MultipartFile, userType: UserType) = mapMedusaToDomain {
        val file = fileService.createMedusaFileFromUpload(
            multipart = image,
            contentType = ContentType.getByMimeType(image.contentType),
            fileName = image.originalFilename ?: "$id.jpg",
            filePath = "/tmp/$id.jpg"
        )
        medusaClient.updateUserProfilePicture(
            userId = id,
            userType = userType,
            profilePic = UpdateProfilePictureDTO(profilePic = file)
        )
            .also {
                LOGGER.info("Successfully updated $userType $id profile picture")
            }
    }

    private fun updateUser(id: String, user: UpdateUserDTO, userType: UserType) = mapMedusaToDomain {
        medusaClient.updateUser(
            userId = id,
            user = UpdateMedusaUserDTO(user),
            userType = userType
        )
    }

    private fun leaveOrganization(
        userId: String,
        organizationId: String,
        userType: UserType
    ) = mapMedusaToDomain {
        medusaClient.leaveOrganization(
            userId = userId,
            organizationId = organizationId,
            userType = userType
        )
    }

    fun createCustomizationId(): String = hashUtils.sha256(LocalDateTime.now().format(dtf))

    fun trackRecommendation(projectId: String, token: String) = customizationStorage
        .track(projectId = projectId, customizationToken = token)

    fun setCustomizationUserId(customizationToken: String, userId: String) = customizationStorage
        .setUserId(customizationToken, userId)

    companion object {
        private val LOGGER = LoggerFactory.getLogger(UserService::class.java)
        private val dtf = DateTimeFormatter.ofPattern("yyyyMMdd")
    }
}
