1. Add user
```
swgit --add.user=<username> --add.email=<email>
```
**username** and **email** is required

2. Get user info
```
swgit --get.user=<username>
```
**username** is required

3. Update an user info
```
swgit --update.user=<username> --update.sshKeyPath=<sshKeyPath> --update.isDefault=<isDefault> --update.email=<email> --update.newUser=<new username>
```
**username** and **email** is required

4. Delete user
```
swgit --delete.user=<username> 
```
**username** is required

5. Get user list
```
 swgit --list
```

6. Switch default user
```
swgit --switch.user=<username>
```
**username** is required

7. Get default user info
```
swgit --default
```

8. Check rule of user
```
swgit --checkrule.user=<username>
```
**username** is required