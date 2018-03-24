### Como rodar o projeto
#### Server
* Acessar o diretório de cada serviço dentro de ```tasks-server``` e instalar as dependências com ```$ npm install```.
* Criar um serviço no [https://engine.apollographql.com](https://engine.apollographql.com) e adicionar a ENGINE_API_KEY no arquivo ```bin/server.js```.
##### Database
* Criar um banco de dados no PostgreSQL com nome ```tasks``` e adicionar a tabela que está no script ```postgres.sql```
* Criar um banco de dados no MySQL com nome ```tasks``` e adicionar a tabela que está no script ```mysql.sql```
* Criar um banco de dados no MongoDB com nome ```tasks```
##### ... por fim
* Acessar o diretório de cada serviço dentro de ```tasks-server``` e rodar com o comando ```$ nodejs bin/server.js```
* Rodar o service proxy que está no diretório ```services-proxy``` com o comando ```$ nodejs bin/server.js```

#### Client
* Acessar o diretório ```tasks-client``` e instalar as dependências com ```$ npm install```.
* Rodar o projeto com ```$ quasar dev``` e caso não tenha o ```quasar-cli``` instalado rodar com ```$ npm run dev```.