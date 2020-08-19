package com.github.proyeception.benito.controller

import com.github.proyeception.benito.dto.OrderDTO
import com.github.proyeception.benito.dto.ProjectDTO
import com.github.proyeception.benito.service.ProjectService
import org.apache.commons.io.FilenameUtils
import org.apache.tika.config.TikaConfig
import org.apache.tika.metadata.Metadata
import org.apache.tika.parser.AutoDetectParser
import org.apache.tika.parser.ParseContext
import org.apache.tika.sax.BodyContentHandler
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.lang.StringBuilder


@Controller
class ProjectController(
    private val projectService: ProjectService
) {

    @RequestMapping("/benito/projects", method = [RequestMethod.GET])
    @ResponseBody
    @CrossOrigin
    private fun findProjects(
        @RequestParam(required = false) orderBy: OrderDTO?,
        @RequestParam(required = false) from: String?,
        @RequestParam(required = false) to: String?,
        @RequestParam(required = false, name = "name") nameContains: String?,
        @RequestParam(required = false, name = "tags") tags: String?
    ): List<ProjectDTO> {
        return projectService.findProjects(orderBy, from, to, nameContains, tags)
    }

    @RequestMapping("/benito/projects/{id}", method = [RequestMethod.GET])
    @ResponseBody
    @CrossOrigin
    private fun findProjects(@PathVariable id: String): ProjectDTO {
        return projectService.findProject(id)
    }

    @RequestMapping("/benito/projects/{projectId}", method = [RequestMethod.POST], consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    @ResponseBody
    private fun saveFile(@PathVariable projectId: String,
                         @RequestParam name: String,
                         @RequestParam("file") file: MultipartFile) : ResponseEntity<String> {

        val parser = AutoDetectParser()
        val handler = BodyContentHandler()
        val metadata = Metadata()
        parser.parse(file.inputStream, handler, metadata)
        val extension = FilenameUtils.getExtension(file.originalFilename)
        val content = getContent(handler.toString(), extension)

        return ResponseEntity.ok("todo oki")
    }

    private fun getContent(content: String, extension: String): String {

        var result: String = ""
        var sheets: String = ""
        result = when (extension) {
            "docx" -> splitBetween("word/document.xml","word/_rels/document.xml.rels", content)
            "xlsx" -> {
                var result = StringBuilder()
                var remainingString = content
                while(!remainingString.isBlank()){
                    if(remainingString.contains("xl/worksheets/sheet") ) {
                        val slide = splitBetweenRegex("xl/worksheets/sheet", Regex("\n\n\n"), remainingString)
                        val regex = Regex("\\d+[.]xml")
                        val res = slide.replace(regex, "")

                        remainingString = remainingString.split("xl/worksheets/sheet", ignoreCase = false, limit = 2)[1]

                        result.append(res)
                    } else { remainingString = "" }
                }
                var sharedStrings = splitBetween("xl/sharedStrings.xml", "xl/worksheets/_rels/", content)
                result.append(sharedStrings).toString().toString()

            }
            "pptx" -> {
                var result = StringBuilder()
                var remainingString = content
                while(!remainingString.isBlank()){
                    if(remainingString.contains("ppt/slides/slide") ) {
                        val slide = splitBetweenRegex("ppt/slides/slide", Regex("\n\n\n"), remainingString)
                        val regex = Regex("\\d+[.]xml")
                        val res = slide.replace(regex, "")

                        remainingString = remainingString.split("ppt/slides/slide", ignoreCase = false, limit = 2)[1]

                        result.append(res)
                    } else { remainingString = "" }
                }
                result.toString()
            }
            else -> content
        }
        return result

    }

    private fun splitBetweenRegex(string: String, regex: Regex, content: String): String {
        return content.split(string)[1].split(regex)[0]
    }

    private fun splitBetween(string1: String, string2: String, content: String): String {
        return content.split(string1)[1].split(string2)[0]
    }

}