package com.github.proyeception.benito.utils;

import org.slf4j.MDC;

import java.util.HashMap;
import java.util.Map;

public class ThreadMap {
    private static ThreadLocal<Map<String, String>> state = ThreadLocal.withInitial(HashMap::new);

    public static Map<String, String> get() {
        return state.get();
    }

    public static void put(String key, String value) {
        state.get().put(key, value);
        MDC.put(key, value);
    }
}