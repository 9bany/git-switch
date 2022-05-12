# Commands
- All commands for config swgit.

## Swgit Config
### 1. Add new user
- Create new user with username and email
- Example:
    ```
    swgit config --add.username=<username> --add.email=<email>
    ```
- Description:

|name   |type  | required  |
|---|---|---|
| username  |string|true   |
| email | string  | true  |
|  host | string  | optional  |

### 2. User info
- Return and log user info with username

    ```
    swgit --get.username=<username>
    ```
- Description:

|name   |type  | required  |
|---|---|---|
| username  |string|true   |

### 3. Update user info
- Example:
```
swgit --update.<name>=<value>
```
- Description:

|name   |type  | required  |
|---|---|---|
| username  |string|true   |
| newUser  |string|optional   |
| privateKeyPath  |string|optional   |
| publicKeyPath  |string|optional   |
| isDefault  |string|optional   |
| email  |string|optional   |

### 4. Delete user with username
- Example:
```
swgit --delete.username=<username> 
```
- Description:

|name   |type  | required  |
|---|---|---|
| username  |string|true   |


## 5. Get user list
- Example:
```
 swgit --list
```

## 6. Switch default user
- Example:
```
swgit --switch.username=<username>
```
- Description:

|name   |type  | required  |
|---|---|---|
| username  |string|true   |

## 7. Get user default info
- Example:
```
swgit --default
```

## 8. Check rule of user
```
swgit --checkrule.username=<username>
```
|name   |type  | required  |
|---|---|---|
| username  |string|true   |

## Swgit command
1. General
```
swgit <your-command>
```
2. Commit code
```
swgit commit -m "your message"
```
3. Push code
```
swgit push origin
```
4. Pull code
```
swgit pull origin
```
4. Help
```
swgit --help
```