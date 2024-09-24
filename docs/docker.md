# Docker containers

This boilerplate uses Docker to run the application and its dependencies.

The application is run using the `docker-compose.yaml` file in the root directory.

## Prerequisites

- Docker
- Docker Compose

## Usage

To start the application, run the following command:

```bash
docker-compose up -d
```

This will start the application and its dependencies in the background.

To stop the application, run the following command:

```bash
docker-compose down
```

This will stop the application and its dependencies.

## Explanation

The `docker-compose.yaml` file defines the following services:

- `node`: The Node.js application

These services are configured to run in the background and communicate with each other using Docker networks.

The `node` service is responsible for running the Node.js application and its dependencies.