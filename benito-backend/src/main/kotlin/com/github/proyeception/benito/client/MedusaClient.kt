package com.github.proyeception.benito.client

import com.fasterxml.jackson.core.type.TypeReference
import com.github.proyeception.benito.connector.HttpConnector
import com.github.proyeception.benito.connector.MultipartMetadataBuilder
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.exception.FailedDependencyException
import com.github.proyeception.benito.exception.NotFoundException
import com.github.proyeception.benito.extension.replaceUrlSpaces
import org.apache.http.entity.ContentType
import org.bson.types.ObjectId
import org.slf4j.LoggerFactory
import java.io.File

open class MedusaClient(
    private val medusaConnector: HttpConnector
) {
    open fun findProjects(
        orderBy: OrderDTO? = null,
        from: String? = null,
        to: String? = null,
        nameContains: String? = null,
        category: String? = null,
        limit: Int? = null,
        offset: Int? = null
    ): List<MedusaProjectDTO> {
        val endpoint = "/projects?"
            .appendOrder(orderBy)
            .appendParam("creation_date", from, MedusaFilter.GREATER_OR_EQUAL)
            .appendParam("creation_date", to, MedusaFilter.LESS_OR_EQUAL)
            .appendParam("title", nameContains?.replaceUrlSpaces() ?: nameContains, MedusaFilter.CONTAINS)
            .appendParam("category.tag_name", category, MedusaFilter.EQ)
            .appendParam("_limit", limit?.toString())
            .appendParam("_start", offset?.toString())
            .dropLast(1)

        val response = medusaConnector.get(endpoint)

        if (response.isError()) {
            LOGGER.error("Error getting projects from medusa: ${response.body}")
            throw FailedDependencyException("Error getting projects from Medusa")
        }

        return response.deserializeAs(object : TypeReference<List<MedusaProjectDTO>>() {})
    }

    open fun featuredProjects(): List<MedusaProjectDTO> = findProjects(limit = 10, orderBy = OrderDTO.VIEWS_DESC)

    open fun categories(): List<CategoryDTO> = find(
        collection = "categories",
        ref = object : TypeReference<List<CategoryDTO>>() {},
        params = emptyList()
    )

    open fun projectCount(): Int = count(PROJECTS)

    open fun categoriesCount() = count("categories")

    private val typeReference = MEDUSA_PROJECT_REF

    open fun findProject(projectId: String): MedusaProjectDTO = findOne(
        collection = PROJECTS,
        id = projectId,
        ref = MEDUSA_PROJECT_REF
    )

    open fun saveDocuments(docs: CreateDocumentsDTO, projectId: String): MedusaProjectDTO = create(
        collection = "projects/$projectId/documents",
        dto = docs,
        ref = MEDUSA_PROJECT_REF
    )

    open fun saveDocument(projectId: String, name: String, driveId: String, content: String): MedusaProjectDTO = create(
        collection = "projects/$projectId/documents",
        dto = CreateDocumentDTO(
            fileName = name,
            driveId = driveId,
            content = content
        ),
        ref = MEDUSA_PROJECT_REF
    )

    open fun findUser(userId: String, userType: UserType): MedusaPersonDTO = findOne(
        collection = userType.collection,
        id = userId,
        ref = MEDUSA_PERSON_REF
    )

    open fun createUser(person: CreateMedusaPersonDTO, userType: UserType): MedusaPersonDTO = create(
        collection = userType.collection,
        dto = person,
        ref = MEDUSA_PERSON_REF
    )

    open fun createGhostUser(ghost: CreateGhostUserDTO, userType: UserType): MedusaPersonDTO = create(
        collection = userType.collection,
        dto = ghost,
        ref = MEDUSA_PERSON_REF
    )

    open fun findUsersBy(userType: UserType, vararg params: Pair<String, String>): List<MedusaPersonDTO> = find(
        collection = userType.collection,
        params = params.takeIf { it.isNotEmpty() }?.map { (field, value) -> "$field=$value" }
            ?: emptyList(),
        ref = object : TypeReference<List<MedusaPersonDTO>>() {}
    )

    open fun createFile(file: File, filename: String, contentType: ContentType): MedusaFileDTO {
        val multipart = MultipartMetadataBuilder()
            .setText("name", "files")
            .setBinary("files", file, contentType, filename)
            .buildPart()
            .build()
        val response = medusaConnector.post("/upload", multipart)

        if (response.isError()) {
            LOGGER.error(response.body)
            throw FailedDependencyException("Failed to create file")
        }

        return response.deserializeAs(object : TypeReference<List<MedusaFileDTO>>() {}).first()
    }

    open fun updateProjectContent(content: UpdateContentDTO, id: String): MedusaProjectDTO = update(
        collection = PROJECTS,
        id = id,
        dto = content,
        ref = MEDUSA_PROJECT_REF
    )

    open fun updateProjectImage(projectId: String, picture: UpdatePictureDTO): MedusaProjectDTO = update(
        collection = PROJECTS,
        id = projectId,
        dto = picture,
        ref = MEDUSA_PROJECT_REF
    )

    open fun updateUserProfilePicture(
        userId: String,
        profilePic: UpdateProfilePictureDTO,
        userType: UserType
    ): MedusaPersonDTO = update(
        collection = userType.collection,
        id = userId,
        dto = profilePic,
        ref = MEDUSA_PERSON_REF
    )

    open fun updateUser(userId: String, user: UpdateUserDTO, userType: UserType): MedusaPersonDTO = update(
        collection = userType.collection,
        id = userId,
        dto = user,
        ref = MEDUSA_PERSON_REF
    )

    open fun deleteDocumentFromProject(projectId: String, documentId: String): MedusaProjectDTO = delete(
        collection = "projects/$projectId",
        id = documentId,
        ref = MEDUSA_PROJECT_REF
    )

    fun addUsersToProject(projectId: String, users: AddUsersDTO, userType: UserType): MedusaProjectDTO = create(
        collection = "projects/$projectId/${userType.collection}",
        dto = users,
        ref = MEDUSA_PROJECT_REF
    )

    fun deleteUsersFromProject(projectId: String, items: String, userType: UserType): MedusaProjectDTO {
        val response = medusaConnector.delete("/projects/${projectId}/${userType.collection}?items=$items")

        if (response.isError()) {
            LOGGER.error("Error deleting ${userType.collection} from project $projectId on Medusa", response.body)
            throw FailedDependencyException("Error deleting ${userType.collection} from $projectId on Medusa")
        }

        return response.deserializeAs(MEDUSA_PROJECT_REF)
    }

    fun createProject(project: CreateMedusaProjectDTO) = create(
        collection = PROJECTS,
        ref = MEDUSA_PROJECT_REF,
        dto = project
    )

    fun findOrganizations() = find(
        collection = "organizations",
        params = emptyList(),
        ref = object : TypeReference<List<MedusaOrganizationDTO>>() {}
    )

    fun findOrganization(id: String): MedusaOrganizationDTO = findOne(
        collection = "organizations",
        id = id,
        ref = object : TypeReference<MedusaOrganizationDTO>() {}
    )

    fun modifyProjectUsers(projectId: String, users: SetUsersDTO): MedusaProjectDTO = update(
        collection = PROJECTS,
        ref = MEDUSA_PROJECT_REF,
        dto = users,
        id = projectId
    )

    fun leaveOrganization(userId: String, organizationId: String, userType: UserType): MedusaPersonDTO = delete(
        collection = "${userType.collection}/$userId/organizations",
        id = organizationId,
        ref = MEDUSA_PERSON_REF
    )

    fun updateProjectKeywords(kw: List<KeywordDTO>, project: ProjectDTO): List<KeywordDTO> {

        project.project_keywords.filter { it.id.isNullOrBlank() }.map { delete("keywords", it.id.orEmpty(), MEDUSA_KEYWORD_REF) }
        val updatedKeywords = kw.map{ create("keywords", it, MEDUSA_KEYWORD_REF) }
        val keywordsIdList = updatedKeywords.map{ it.id }
        val keywordsIdRef = ProjectKeywords(keywordsIdList.map { ObjectId(it).toHexString() } )
        update("projects", project.id, keywordsIdRef, ANY_REF)
        return updatedKeywords

    }

    fun updateRecommendations(recommendations: List<CreateRecommendationDTO>, project: ProjectDTO) {

        project.recommendations
                .map { it.id.orEmpty() }
                .filter { it.isNotBlank() }.map { delete("recommendations", it, MEDUSA_RECOMMENDATION_REF) }
        val recommendationsIdList = recommendations
            //crear variante de create con un cuarto parametro que indique con que clase deserealizar la response
            .map{ create("recommendations", it, CREATE_RECOMMENDATION_REF, MEDUSA_RECOMMENDATION_REF).id }
        val recommendationsIdRef = ProjectRecommendations(recommendationsIdList.map { it } )
        update("projects", project.id, recommendationsIdRef, MEDUSA_PROJECT_REF)

    }

    private fun <T> find(collection: String, params: List<String>, ref: TypeReference<List<T>>): List<T> {
        val response = medusaConnector.get("/$collection?${params.joinToString("&")}")

        if (response.isError()) {
            LOGGER.error("Error fetching $collection on Medusa")
            throw FailedDependencyException("Error fetching $collection on Medusa")
        }

        return response.deserializeAs(ref)
    }

    private fun <T> findOne(collection: String, id: String, ref: TypeReference<T>): T {
        val response = medusaConnector.get("/$collection/$id")
        when (response.status) {
            200 -> return response.deserializeAs(ref)
            404 -> throw NotFoundException("$id not found in $collection")
            else -> {
                LOGGER.error("Error getting $id from $collection on Medusa", response.body)
                throw FailedDependencyException("Error getting $id from $collection on Medusa")
            }
        }
    }

    private fun <T> create(collection: String, dto: Any, ref: TypeReference<T>): T {
        val response = medusaConnector.post("/$collection", dto)

        if (response.isError()) {
            LOGGER.error("Error creating a new item in $collection on Medusa", response.body)
            throw FailedDependencyException("Error when creating a new item in $collection on Medusa")
        }

        return response.deserializeAs(ref)
    }

    private fun <T, U> create(collection: String, dto: Any, refOrigin: TypeReference<T>, refDestiny: TypeReference<U>): U {
        val response = medusaConnector.post("/$collection", dto)

        if (response.isError()) {
            LOGGER.error("Error creating a new item in $collection on Medusa", response.body)
            throw FailedDependencyException("Error when creating a new item in $collection on Medusa")
        }

        return response.deserializeAs(refDestiny)
    }

    private fun <T> update(collection: String, id: String, dto: Any, ref: TypeReference<T>): T {
        val response = medusaConnector.put("/$collection/$id", dto)

        if (response.isError()) {
            LOGGER.error("Error updating $id from $collection on Medusa", response.body)
            throw FailedDependencyException("Error updating $id from $collection on Medusa")
        }

        return response.deserializeAs(ref)
    }

    private fun <T> delete(collection: String, id: String, ref: TypeReference<T>): T {
        val response = medusaConnector.delete("/$collection/$id")

        if (response.isError()) {
            LOGGER.error("Error deleting $id from $collection on Medusa", response.body)
            throw FailedDependencyException("Error deleting $id from $collection")
        }

        return response.deserializeAs(ref)
    }

    private fun count(collection: String): Int {
        val response = medusaConnector.get("/$collection/count")

        if (response.isError()) {
            LOGGER.error("Error counting $collection in medusa: ${response.body}")
            throw FailedDependencyException("Error counting $collection from Medusa")
        }

        return response.body?.toInt() ?: throw FailedDependencyException("Medusa returned null for count")
    }

    private fun String.appendOrder(orderBy: OrderDTO?): String = orderBy?.sortMethod
        ?.let { "${this}_sort=${it}&" }
        ?: this

    private fun String.appendParam(param: String, value: String?, filter: MedusaFilter): String =
        value?.let { "${this}${param}_${filter.filterName}=$it&" } ?: this

    private fun String.appendParam(param: String, value: String?) = value?.let { "$this${param}=$it&" } ?: this

    companion object {
        private val LOGGER = LoggerFactory.getLogger(MedusaClient::class.java)
        private const val PROJECTS = "projects"
        private val MEDUSA_PROJECT_REF = object : TypeReference<MedusaProjectDTO>() {}
        private val MEDUSA_PERSON_REF = object : TypeReference<MedusaPersonDTO>() {}
        private val MEDUSA_KEYWORD_REF = object  : TypeReference<KeywordDTO>() {}
        private val MEDUSA_RECOMMENDATION_REF = object : TypeReference<CreatedRecommendationDTO>() {}
        private val CREATE_RECOMMENDATION_REF = object : TypeReference<CreateRecommendationDTO>() {}
        private val ANY_REF = object : TypeReference<Any>() {}
    }
}
