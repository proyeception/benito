package com.github.proyeception.benito.controller

import com.github.proyeception.benito.X_QUI_TOKEN
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.exception.ForbiddenException
import com.github.proyeception.benito.exception.UnauthorizedException
import com.github.proyeception.benito.service.*
import org.springframework.http.MediaType
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.time.LocalDate


@Controller
open class ProjectController(
    private val projectService: ProjectService,
    private val sessionService: SessionService,
    private val userService: UserService,
    private val recommendationService: RecommendationService,
    private val keywordService: KeywordService
) {

    @RequestMapping("/benito/projects", method = [RequestMethod.GET])
    @ResponseBody
    private fun findProject(
        @RequestParam(required = false) orderBy: OrderDTO?,
        @RequestParam(required = false) from: String?,
        @RequestParam(required = false) to: String?,
        @RequestParam(required = false) title: String?,
        @RequestParam(required = false) category: String?,
        @RequestParam(required = false) keyword:String?,
        @RequestParam(required = false, name = "author") authorId: String?,
        @RequestParam(required = false) authorName: String?,
        @RequestParam(required = false, name = "organization") organizationId: String?,
        @RequestParam(required = false) organizationName: String?,
        @RequestParam(required = false) page: Int?,
        @RequestParam(required = false) tag: String?
    ): SearchProjectDTO = projectService.findProjects(
        orderBy = orderBy,
        from = from,
        to = to,
        title = title,
        category = category,
        keyword = keyword,
        page = page,
        authorName = authorName,
        authorId = authorId,
        organizationId = organizationId,
        organizationName = organizationName,
        tag = tag
    )

    @RequestMapping("/benito/projects/featured", method = [RequestMethod.GET])
    @ResponseBody
    private fun featuredProjects(): List<ProjectDTO> = projectService.featuredProjects()

    @RequestMapping("/benito/projects/{id}/recommendations", method = [RequestMethod.GET])
    @ResponseBody
    private fun projectRecommendations(@PathVariable id: String): List<ProjectDTO> {if(id == "1") {
        val rec = ProjectDTO(
                id = "1",
                title = "project title",
                description = "project description",
                extraContent = "nicely formatted content",
                creationDate = LocalDate.of(2020, 2, 6),
                pictureUrl = "https://images.unsplash.com/photo-1541327079290-5127e8c6d7b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
                authors = listOf(
                        PersonRefDTO(
                                id = "123",
                                username = "author",
                                fullName = "Benito Quinquela"
                        )
                ),
                supervisors = listOf(
                        PersonRefDTO(
                                id = "123",
                                username = "supervisor",
                                fullName = "Jorge Luis Borges"
                        )
                ),
                tags = emptyList(),
                documentation = listOf(DocumentationDTO(
                        id = "asd",
                        fileName = "Acta de proyecto",
                        driveId = "123"
                )),
                organization = OrganizationRefDTO(
                        id = "123",
                        displayName = "UTN FRBA"
                ),
                recommendations = emptyList(),
                project_keywords = emptyList()
        )
        return mutableListOf(rec, rec, rec)
    } else {
            return projectService.recommendedProjects(id)
        }
    }

    @RequestMapping("/benito/project-count", method = [RequestMethod.GET])
    @ResponseBody
    private fun count(): CountDTO = projectService.count()

    @RequestMapping("/benito/projects/{id}", method = [RequestMethod.GET])
    @ResponseBody
    private fun findProject(@PathVariable id: String): ProjectDTO = projectService.findProject(id)

    @RequestMapping("/benito/keywords", method = [RequestMethod.GET])
    @ResponseBody
    private fun findTextKeywords(@RequestBody content: String): List<KeywordDTO> {
        val a = content.replace("\"text\":", "").replace("\"", "")
        println(a)
        return keywordService.getKeywordsFromText(a)
    }

    @RequestMapping(
        value = ["/benito/projects/{projectId}/documents"],
        method = [RequestMethod.POST],
        consumes = [MediaType.MULTIPART_FORM_DATA_VALUE]
    )
    @ResponseBody
    private fun saveFile(
        @PathVariable projectId: String,
        @RequestParam("file") files: Array<MultipartFile>
    ): ProjectDTO = projectService.saveDocuments(projectId, files.toList())

    @RequestMapping(value = ["/benito/projects/{id}/content"], method = [RequestMethod.PATCH])
    @ResponseBody
    fun updateProjectContent(
        @PathVariable id: String,
        @RequestBody content: UpdateContentDTO,
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String
    ): ProjectDTO = doWithMixedAuthorization(id, token) { projectService.updateProjectContent(content, id) }

    @RequestMapping(
        value = ["/benito/projects/{id}/picture"],
        method = [RequestMethod.POST], // should be a PUT, but it seems PUT doesn't work with multipart
        consumes = [MediaType.MULTIPART_FORM_DATA_VALUE]
    )
    @ResponseBody
    fun updateProjectPoster(
        @PathVariable id: String,
        @RequestParam("file") image: MultipartFile,
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String
    ): ProjectDTO = doWithMixedAuthorization(projectId = id, token = token) {
        projectService.updateProjectImage(id, image)
    }

    @RequestMapping(value = ["/benito/projects/{projectId}/documents/{documentId}"], method = [RequestMethod.DELETE])
    @ResponseBody
    fun deleteDocument(
        @PathVariable projectId: String,
        @PathVariable documentId: String,
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String
    ): ProjectDTO = doWithMixedAuthorization(projectId = projectId, token = token) {
        projectService.deleteDocument(projectId, documentId)
    }

    @RequestMapping(value = ["/benito/testing"], method = [RequestMethod.POST])
    @ResponseBody
    fun posTag(
        @RequestBody text: String,
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String
    ): String { return "holi"/*keywordService.posTag(text);*/ }

    @RequestMapping(value = ["/benito/projects/{projectId}/authors"], method = [RequestMethod.POST])
    @ResponseBody
    fun addAuthors(
        @PathVariable projectId: String,
        @RequestBody users: AddUsersDTO,
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String
    ): ProjectDTO = doSupervisorAuthorized(projectId, token) { projectService.addAuthors(projectId, users) }

    @RequestMapping(value = ["/benito/projects/{projectId}/tags"], method = [RequestMethod.POST])
    @ResponseBody
    fun setTags(
        @PathVariable projectId: String,
        @RequestBody tags: SetTagsDTO,
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String
    ): ProjectDTO = doWithMixedAuthorization(projectId, token) { projectService.setTags(projectId, tags) }

    @RequestMapping(value = ["/benito/projects/{projectId}/users"], method = [RequestMethod.PUT])
    @ResponseBody
    fun setUsers(
        @PathVariable projectId: String,
        @RequestBody users: SetUsersDTO,
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String
    ): ProjectDTO = doSupervisorAuthorized(projectId, token) { projectService.setAuthors(projectId, users) }

    @RequestMapping(value = ["/benito/projects/{projectId}/authors"], method = [RequestMethod.DELETE])
    @ResponseBody
    fun deleteAuthors(
        @PathVariable projectId: String,
        @RequestParam(value = "items", required = true) items: String,
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String
    ): ProjectDTO = doSupervisorAuthorized(projectId, token) { projectService.deleteAuthors(projectId, items) }

    @RequestMapping(value = ["/benito/projects/{projectId}/supervisors"], method = [RequestMethod.POST])
    @ResponseBody
    fun addSupervisors(
        @PathVariable projectId: String,
        @RequestBody users: AddUsersDTO,
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String
    ): ProjectDTO = doSupervisorAuthorized(projectId, token) { projectService.addSupervisors(projectId, users) }

    @RequestMapping(value = ["/benito/projects/{projectId}/supervisors"], method = [RequestMethod.DELETE])
    @ResponseBody
    fun deleteSupervisors(
        @PathVariable projectId: String,
        @RequestParam(value = "items", required = true) items: String,
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String
    ): ProjectDTO = doSupervisorAuthorized(projectId, token) { projectService.deleteSupervisors(projectId, items) }


    @RequestMapping(value = ["/benito/projects"], method = [RequestMethod.POST])
    @ResponseBody
    fun createProject(
        @RequestBody project: CreateProjectDTO,
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String
    ): ProjectDTO = doAuthorized(
        token = token,
        allowedRoles = listOf(RoleDTO.SUPERVISOR),
        authorizeCheck = { userService.findSupervisor(it).organizations.any { o -> o.id == project.organizationId } },
        f = {
            projectService.createProject(it, project)
        },
        forbiddenMessage = "You're not allowed to create a project in this organization"
    )

    private fun <T> doWithMixedAuthorization(projectId: String, token: String, f: (String) -> T) = doAuthorized(
        token = token,
        allowedRoles = listOf(RoleDTO.SUPERVISOR, RoleDTO.AUTHOR),
        authorizeCheck = {
            projectService.hasSupervisor(supervisorId = it, projectId = projectId) ||
            projectService.hasAuthor(authorId = it, projectId = projectId)
        },
        f = f
    )

    private fun <T> doSupervisorAuthorized(projectId: String, token: String, f: (String) -> T) = doAuthorized(
        token = token,
        allowedRoles = listOf(RoleDTO.SUPERVISOR),
        authorizeCheck = { projectService.hasSupervisor(supervisorId = it, projectId = projectId) },
        f = f
    )

    private fun <T> doAuthorized(
        token: String,
        allowedRoles: List<RoleDTO>,
        f: (String) -> T,
        authorizeCheck: (String) -> Boolean,
        forbiddenMessage: String = "You're not allowed to edit this project"
    ): T {
        val session = sessionService[token] ?: throw UnauthorizedException("I don't know who you are")

        return session.takeIf { allowedRoles.contains(it.role) }
            ?.userId
            ?.takeIf(authorizeCheck)
            ?.let(f)
            ?: throw ForbiddenException(forbiddenMessage)
    }
}
