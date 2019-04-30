# General Set
Websocket server for general set

## Run Locally
```
cargo run
```

## Run With Docker
```
docker-compose up
```

## notes
```
kompose convert
kubectl apply -f actix-service.yaml actix-doployment.yaml
kubectl apply -f redis-service.yaml redis-doployment.yaml redis-data-persistentvolumeclaim.yaml
kubectl expose deployment/actix --type="NodePort" --port 3001 --name=mp
```