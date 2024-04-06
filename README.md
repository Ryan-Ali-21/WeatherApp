# WeatherApp
1. Build your web app ( I used Nodejs with Express)
    
    You will need to change the API Key in the index.js file to get this project running. It’s very scrappy spaghetti code but it should work as a demo. 
    
2. Containerize your webapp using a Dockerfile and Docker build
    
    ```powershell
    docker build -t weatherapp . 
    ```
    
3. Create a container registry in azure
    
    I did this via the portal
    
4. Upload your container to the an azure container registry
    
    ```powershell
    #sign into azure container registry
    docker login ryans1registry.azurecr.io
    
    #tag container registery image
    docker tag weatherapp ryans1registry.azurecr.io/weatherapp
    
    #push image to container registry
    docker push ryans1registry.azurecr.io/weatherapp
    ```
    
5. Deploy an azure container instance using az container create
    
    ```powershell
    az container create -g rg-ContainerApps --name myweatherapp --image ryans1registry.azurecr.io/weatherapp --cpu 1 --memory 1 --ports 80 --dns-name-label "rali21weatherapptesting"
    ```
    
    ![Untitled](https://personalporfoliostorage.blob.core.windows.net/personalportfolio-images/Weatherapp1.PNG)
    
6. Deploy an azure webapp using az webapp create
    
    We need to create or have an existing app service plan before deploying this
    
    ```powershell
    az webapp create -g "rg-ContainerApps" -n "weatherapptestdeployv2" -p myweatherapp-asp  -i ryans1registry.azurecr.io/weatherapp
    ```
    
    ![Untitled](https://personalporfoliostorage.blob.core.windows.net/personalportfolio-images/Weatherapp2.PNG)
