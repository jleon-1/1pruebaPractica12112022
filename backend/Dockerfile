FROM adoptopenjdk/openjdk17:latest
COPY "./target/streaming-0.0.1-SNAPSHOT.jar" "app.jar"
EXPOSE 8081
ENTRYPOINT ["java","-jar","app.jar"]