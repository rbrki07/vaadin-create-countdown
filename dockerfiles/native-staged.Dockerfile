# First stage: JDK with GraalVM and native image support
FROM ghcr.io/graalvm/native-image-community:21.0.2 AS build

WORKDIR /usr/src/app

# Copy project files 
COPY . .

# Create native image
RUN ./mvnw clean package -Pproduction -Pnative native:compile

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