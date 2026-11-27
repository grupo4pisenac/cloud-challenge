# Stage 1: Build do artefato Maven (Java 21)
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /build

COPY pom.xml ./
RUN mvn -B dependency:go-offline

COPY src ./src
RUN mvn -B clean package -DskipTests

# Stage 2: Runtime JRE enxuto e usuário não-root
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=build --chown=appuser:appgroup /build/target/app.jar app.jar

USER appuser
EXPOSE 8080

ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75.0 -XX:+UseSerialGC"

ENTRYPOINT ["java", "-jar", "app.jar"]
