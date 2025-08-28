package com.devilGhost.ResponseHub.services;

import com.devilGhost.ResponseHub.config.ClientRequestErrorException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Random;

@Slf4j
@Component
public class RandomDataGeneratorService {

    private final Random random=new Random();

    private final String[] WORD_POOL=new String[]{
            "a", "I", "on", "up", "it", "go", "sun", "cat", "run", "map",
            "tree", "moon", "blue", "jump", "apple", "cloud", "river", "stone",
            "forest", "planet", "yellow", "jungle", "horizon", "blanket", "thunder", "freedom",
            "mountain", "umbrella", "notebook", "eclipse", "adventure", "waterfall", "chocolate",
            "generation", "excitement", "playground",
            "sky", "dog", "car", "web", "key", "light", "dream", "glass", "flame", "storm",
            "bridge", "circle", "rocket", "signal", "mirror", "castle", "battery", "network",
            "database", "function", "variable", "solution", "strategy", "interface", "algorithm",
            "elephant", "triangle", "calendar", "backpack", "keyboard", "dinosaur", "volcano",
            "code", "data", "byte", "node", "api", "json", "html", "java", "linux", "proxy",
            "stack", "cache", "token", "input", "query", "debug", "script", "object", "client",
            "server", "docker", "binary", "crypto", "kernel", "router", "github", "branch",
            "commit", "method", "module", "stream", "boolean", "payload", "backend", "frontend",
            "firewall", "virtual", "console", "package", "process", "compile", "storage", "cluster"
    };
    // word_pool takes approx 7kb of memory

    public Object generateData(Object data) throws ClientRequestErrorException , Exception{
        // we know that each field's property will be a json as well
        // with at-least "type" field as it a must

        Map<String,Object> content=(Map<String,Object>) data;
        String type=(String) content.getOrDefault("type",null);

        // now based on different values of type we can generate random data
        if(type==null){
            throw new ClientRequestErrorException("Invalid request format","Type is null");
        }
        // now check for value of type
        switch (type) {
            case "integer" -> {
                return randomInt(content);
            }
            case "string" -> {
                return randomString(content);
            }
            case "boolean" -> {
                return randomBoolean();
            }
            case "array" -> {
                return randomArray(content);
            }
            case "object" -> {
                // this case is basically recursive in nature
//                Map<String,Object> requestedObject=(Map<String, Object>)content.getOrDefault("properties",null);
                return "hey";
            }
        }
        // else type had something else thus throw not valid type exception
        throw new ClientRequestErrorException(
                "Invalid type in response_schema.",
                " 'type' of key allowed are [integer,boolean,array]"
        );
    }

    private long randomInt(Map<String,Object> data) throws ClientRequestErrorException{
        // first check if min and max are valid values
        Integer min=(Integer)data.getOrDefault("min",null);
        Integer max=(Integer)data.getOrDefault("max",null);
        if(min==null || max==null){
            throw new ClientRequestErrorException("Invalid request format","min and max value must be specified");
        }
        // then only return a random int
        return random.nextInt(max-min+1)+min;
    }

    private boolean randomBoolean() {
        // return a random boolean value
        return random.nextBoolean();
    }

    private String randomString(Map<String,Object> data) throws ClientRequestErrorException{
        // first check if size is valid then only proceed
        Integer size=(Integer) data.getOrDefault("size",null);
        if(size ==null){
            throw new ClientRequestErrorException("Invalid request format","size value must be specified");
        }
        // now generate the string
        StringBuilder responseString=new StringBuilder();
        for(int i=0;i<size;i++){
            // for random string generation we will select a word at random from word pool and add it to our
            // responseString
            int index= random.nextInt(WORD_POOL.length);
            responseString.append(WORD_POOL[index]);
            // add a space after it, if it's not the last word
            if(i!=size-1){
                responseString.append(" ");
            }
        }
        // return the string
        return responseString.toString();
    }

    private Object randomArray(Map<String,Object> data) throws ClientRequestErrorException{
        // first check if itemType and size are available or not
        String itemType=(String)data.getOrDefault("item_type",null);
        Integer size=(Integer)data.getOrDefault("size",null);
        if(itemType==null || size==null){
            throw new ClientRequestErrorException(
                    "Invalid request format",
                    " itemType and size must be defined"
            );
        }

        // now check if the itemType belongs to allowed ones
        switch (itemType){

            case "integer"->{

                int[] responseArray=new int[size];
                for(int i=0;i<size;i++){
                    responseArray[i]=random.nextInt(10000);
                }
                return responseArray;

            }
            case "boolean"->{

                boolean[] responseArray=new boolean[size];
                for(int i=0;i<size;i++){
                    responseArray[i]=random.nextBoolean();
                }
                return responseArray;

            }
            case "string"->{

                String[] responseArray=new String[size];
                for (int i=0;i<size;i++){
                    responseArray[i]=WORD_POOL[random.nextInt(WORD_POOL.length)];
                }
                return responseArray;

            }

        }
        // item type is not the one from allowed thus throw error
        throw new ClientRequestErrorException(
                "Invalid itemType in response_schema.",
                " 'itemType' allowed are [integer,boolean,string]"
        );
    }

}
