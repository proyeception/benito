package com.github.proyeception.benito.service

import com.github.proyeception.benito.dto.KeywordDTO
import com.github.proyeception.benito.dto.ProjectDTO
import edu.stanford.nlp.ling.CoreAnnotations
import edu.stanford.nlp.ling.CoreLabel
import edu.stanford.nlp.pipeline.Annotation
import edu.stanford.nlp.pipeline.StanfordCoreNLP
import edu.stanford.nlp.util.CoreMap
import org.slf4j.LoggerFactory
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import ucar.httpservices.HTTPFactory.Post
import java.util.*

public class KeywordService() {
    open fun getKeywords(project: ProjectDTO): List<KeywordDTO> {
        val url = "http://rochychipian.pythonanywhere.com/keywords"
        val map: MutableMap<String, String> = HashMap()
        val content = project.title + ". " + project.description + ". " + project.extraContent

        val stopwords = getStopwords(content)

        map["text"] = content
        map["stopwords"] = stopwords.dropLast(1).drop(1).toString()

        val restService = RestService(RestTemplateBuilder());
        val result = restService.postRequest(url, map)

        println(result)

        return result
    }

    open fun getKeywordsFromPlainText(text: String): List<String> {
        val cleanText = text.replace("\"text\":", "").replace("\"", "")

        val stopwords = getStopwords(cleanText)

        val url = "http://rochychipian.pythonanywhere.com/hashtags"
        val map: MutableMap<String, String> = HashMap()

        map["text"] = cleanText
        map["stopwords"] = stopwords.dropLast(1).drop(1).toString()

        val restService = RestService(RestTemplateBuilder());
        val result = restService.postRequestHashtags(url, map)

        return result;
    }

    fun getStopwords(text: String): List<String> {
        System.out.println("Starting Stanford NLP");
        val props = Properties()
        props["annotators"] = "tokenize, ssplit, pos, lemma, ner";

        props.setProperty("tokenize.language", "es");
        props.setProperty("pos.model", "edu/stanford/nlp/models/pos-tagger/spanish/spanish-distsim.tagger");
        props.setProperty("ner.model", "edu/stanford/nlp/models/ner/spanish.ancora.distsim.s512.crf.ser.gz");
        props.setProperty("ner.applyNumericClassifiers", "false");
        props.setProperty("ner.useSUTime", "false");
        val pipeline = StanfordCoreNLP(props)

        //http://data.cervantesvirtual.com/blog/2017/07/17/libreria-corenlp-de-stanford-de-procesamiento-lenguage-natural-reconocimiento-entidades/
        val document: Annotation = Annotation(text)
        pipeline.annotate(document)

        val sentences: List<CoreMap> = document.get(CoreAnnotations.SentencesAnnotation::class.java)

        val stanfordResult: MutableMap<String, String> = mutableMapOf()
        for (sentence: CoreMap in sentences) {
            for (token: CoreLabel in sentence[CoreAnnotations.TokensAnnotation::class.java]) {
                val word = token[CoreAnnotations.TextAnnotation::class.java]
                val pos = token[CoreAnnotations.PartOfSpeechAnnotation::class.java]
                stanfordResult[word] = pos
            }
        }
        return getStopwords(stanfordResult)
    }

    private fun getStopwords(stanfordResult: MutableMap<String, String>): List<String> {
        val stopwords: MutableList<String> = mutableListOf()

        for(word in stanfordResult){
            if(isStopword(word.value) && (word.value != ",")){
                stopwords.add(word.key)
            }
        }
        return stopwords
    }

    private fun isStopword(value: String): Boolean {
        return STOPWORDS_CLASSES.any { value.startsWith(it)  }
    }

    companion object {
        private val STOPWORDS_CLASSES = listOf('c', 'd', 'f', 'i', 'p', 'r', 's', 'v', 'w', 'z')
    }
}