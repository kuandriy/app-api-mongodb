# app-api-mongodb
#### Instraction  
```javascript
git clone https://github.com/kuandriy/app-api-mongodb.git
```
---

```javascript
cd app-api-mongodb
```
---

```javascript
docker-compose build
docker-compose up
```
---

>Root URI 
```javascript
localhost:49160
```

>endpoint
```javascript
GET localhost:49160/uuid
```
>response UUID

```javascript
GET localhost:49160/user
```
>response list of users

```javascript
GET localhost:49160/user/:id
```
>response user