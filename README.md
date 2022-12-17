# Workshop 3-4-5 documentation

## 🗒 Infos générales

Ce code met en place une API contenant deux routes principales : 
- /locations
- /users

La route /users/register permet de s'inscrire en tant que nouvel utilisateur. On vérifie que l'username est unique et les mots de passe sont hashés avant d'être enregistrés dans la base de données.

Les routes /locations/login et /users/login utilisent un middleware (local strategy) pour vérifier que le mot de passe entré matche bien (une fois crypté) avec celui de l'utilisateur trouvé dans la base de données.

Toutes les routes /users/me et /locations sont protégées par un middleware d'authentification par token (JWT strategy) et un middleware d'authentification par rôle (RBAC). Le seul rôle accepté est le rôle admin.

Les requêtes suivantes sont possibles : 

Locations :
- get /locations
- post /locations
- post /locations/login
- get /locations/:id
- put /locations/:id
- delete /locations/:id

Users : 
- post /users/register
- post /users/login
- get /users
- get /users/me
- put /users/me
- delete /users/me

Un user est composé d'un username, d'un password et d'un rôle.

## Contenu de .env

Dans le fichier .env, doivent être présentes une variable MONGO_URI contenant le lien de votre database MongoDB, ainsi qu'une variable SECRET_JWT contenant une clé secrète de votre choix ('secret' par exemple).

## Lancer le code

1. lancer index.js
2. Sur insomnia, pour tester les différentes routes
   1. Pour se register : ajouter un body JSON à la requête de cette forme :  
   ```    
      {  
          "username": "xxx",   
          "password": "xxx",  
          "role": "xxx"  
      }
   ```
   2. Pour se login sur /locations/login ou /users/login : ajouter le même body JSON qui a été registered
   3. Copier le token qui est retourné une fois login
   4. Pour accéder à toutes les routes /users/me et /locations, il sera nécessaire d'ajouter une Auth "Bearer Token" et de coller le token précédent dans le champ "token"
   5. Pour créer une nouvelle location (post /locations) ou en modifier une (put /locations/:id) : ajouter un body JSON de cette forme (exemple) :
   ```    
      {
            "filmName": "xxx"
      }
   ```
   6. Pour modifier l'utilisateur connecté (put /users/me) : ajouter le body JSON suivant :
   ```    
      {  
          "username": "xxx",   
          "password": "xxx",  
          "role": "xxx"  
      }
   ```
  
## Lancer les tests

1. Lancer chaque test dans locations/locations.service.test.js
2. Lancer chaque test dans users/users.service.test.js

## SonarCloud

https://sonarcloud.io/summary/overall?id=Carla802_secure-web-dev-workshop3