# First stage: JDK with GraalVM and native image support
FROM ghcr.io/graalvm/native-image-community:21.0.2 AS build

# Update package lists and install maven
RUN microdnf --enablerepo ol9_codeready_builder update -y && \
    microdnf install -y maven && \
    microdnf clean all

WORKDIR /usr/src/app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy project files 
COPY . .

# Create native image
RUN mvn clean package -Pproduction -Pnative native:compile

# Second stage: Lightweight debian-slim image
FROM debian:bookworm-slim

WORKDIR /app

# Copy the produced library files from the build stage
COPY --from=build /usr/src/app/target/*.so /app/
# Copy the native image from the build stage
COPY --from=build /usr/src/app/target/vaadin-create-countdown /app/vaadin-create-countdown

EXPOSE 8080

# Run the application
CMD ["/app/vaadin-create-countdown"]