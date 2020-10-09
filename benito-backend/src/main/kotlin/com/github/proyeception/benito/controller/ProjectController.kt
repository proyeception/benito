package com.github.proyeception.benito.controller

import com.github.proyeception.benito.X_QUI_TOKEN
import com.github.proyeception.benito.dto.*
import com.github.proyeception.benito.exception.ForbiddenException
import com.github.proyeception.benito.exception.UnauthorizedException
import com.github.proyeception.benito.service.*
import org.springframework.http.MediaType
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile


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
        @RequestParam(required = false) page: Int?
    ): List<ProjectDTO> = projectService.findProjects(
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
        organizationName = organizationName
    )

    @RequestMapping("/benito/projects/featured", method = [RequestMethod.GET])
    @ResponseBody
    private fun featuredProjects(): List<ProjectDTO> = projectService.featuredProjects()

    @RequestMapping("/benito/projects/{id}/recommendations", method = [RequestMethod.GET])
    @ResponseBody
    private fun projectRecommendations(@PathVariable id: String): List<ProjectDTO> = projectService.recommendedProjects(id)

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
    ): ProjectDTO {
        val updatedProject = doAuthorAuthorized(id, token) {
            projectService.updateProjectContent(content, id)
        }
        return updatedProject
    }

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
    ): ProjectDTO = doAuthorAuthorized(projectId = id, token = token) { projectService.updateProjectImage(id, image) }

    @RequestMapping(value = ["/benito/projects/{projectId}/documents/{documentId}"], method = [RequestMethod.DELETE])
    @ResponseBody
    fun deleteDocument(
        @PathVariable projectId: String,
        @PathVariable documentId: String,
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String
    ): ProjectDTO = doAuthorAuthorized(projectId = projectId, token = token) {
        projectService.deleteDocument(projectId, documentId)
    }

    @RequestMapping(value = ["/benito/projects/{projectId}/authors"], method = [RequestMethod.POST])
    @ResponseBody
    fun addAuthors(
        @PathVariable projectId: String,
        @RequestBody users: AddUsersDTO,
        @RequestHeader(value = X_QUI_TOKEN, required = true) token: String
    ): ProjectDTO = doSupervisorAuthorized(projectId, token) { projectService.addAuthors(projectId, users) }

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
    ): ProjectDTO {
        val createdProject = doAuthorized(
                token = token,
                requiredRole = RoleDTO.SUPERVISOR,
                authorizeCheck = { userService.findSupervisor(it).organizations.any { o -> o.id == project.organizationId } },
                f = {
                    projectService.createProject(it, project)
                },
                forbiddenMessage = "You're not allowed to create a project in this organization"
        )

            return createdProject
        }

    private fun <T> doSupervisorAuthorized(projectId: String, token: String, f: (String) -> T) = doAuthorized(
        token = token,
        requiredRole = RoleDTO.SUPERVISOR,
        authorizeCheck = { projectService.hasSupervisor(supervisorId = it, projectId = projectId) },
        f = f
    )

    private fun <T> doAuthorAuthorized(projectId: String, token: String, f: (String) -> T) = doAuthorized(
        token = token,
        requiredRole = RoleDTO.AUTHOR,
        authorizeCheck = {true},//{ projectService.hasAuthor(authorId = it, projectId = projectId) },
        f = f
    )

    private fun <T> doAuthorized(
        token: String,
        requiredRole: RoleDTO,
        f: (String) -> T,
        authorizeCheck: (String) -> Boolean,
        forbiddenMessage: String = "You're not allowed to edit this project"
    ): T {
        /*val session = sessionService[token] ?: throw UnauthorizedException("I don't know who you are")

        return session.takeIf { it.role == requiredRole }
            ?.userId
            ?.takeIf(authorizeCheck)
            ?.let(f)
            ?: throw ForbiddenException(forbiddenMessage)*/
        return "hola".let(f)
    }
}
