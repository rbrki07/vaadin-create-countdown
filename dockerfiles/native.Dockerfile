FROM debian:bookworm-slim

WORKDIR /app

# Copy the produced library files from the build stage
COPY target/*.so /app/
# Copy the native binary from the build stage
COPY target/vaadin-create-countdown /app/vaadin-create-countdown

EXPOSE 8080

# Run the application
CMD ["/app/vaadin-create-countdown"]