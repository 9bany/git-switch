# Commands
1. Add new user
```
swgit --add.username=<username> --add.email=<email>
```
**username** and **email** is required

2. Get user info
```
swgit --get.username=<username>
```
**username** is required

3. Update an user info
```
swgit --update.username=<username> --update.privateKeyPath=<privateKeyPath> --update.publicKeyPath=<publicKeyPath> --update.isDefault=<isDefault> --update.email=<email> --update.newUser=<new username>
```
**username** and **email** is required

4. Delete user
```
swgit --delete.username=<username> 
```
**username** is required

5. Get user list
```
 swgit --list
```

6. Switch default user
```
swgit --switch.username=<username>
```
**username** is required

7. Get default user info
```
swgit --default
```

8. Check rule of user
```
swgit --checkrule.username=<username>
```
**username** is required