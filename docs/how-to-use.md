## Swgit
[![version](https://img.shields.io/badge/version-1.1.0-yellow.svg)](https://semver.org)
## Getstarted
## Install 
> We don't have officially version right now, please use it with development mode.
1. MAC OS
1. Ubuntu
1. Window
1. [Development](./development.md)

## Swgit config
### Add an user
> If you dont have ssk key paths, please ignore it. Swgit will create new ssh key for you.
- Create new user with username and email
- Example:
    ```
    swgit --add.username=<username> --add.email=<email> --add.privateKeyPath=<privateKeyPath> --add.empublicKeyPathail=<publicKeyPath>
    # or
    swgit -a.username=<username> -a.email=<email> -a.privateKeyPath=<privateKeyPath> -a.publicKeyPath=<publicKeyPath>
    ```
- Description:

|name   |type  | required  | default|
|---|---|---|---|
| username  |string|true   | 
| email | string  | true  |
|  host | string  | optional  | github.com
|  privateKeyPath | string  | optional  | 
|  publicKeyPath | string  | optional  |


### User info
- Return and log user info with username

    ```
    swgit --get=<username>
    # or
    swgit -g=<username>
    ```
- Description:

|name   |type  | required  |
|---|---|---|
| username  |string|true   |

### Update user info
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

## Switch default user
- Example:
```
swgit --switch=<username>
# or
swgit -s=<username>
```
- Description:

|name   |type  | required  |
|---|---|---|
| username  |string|true   |

## Get user default of the repo
- Example:
```
swgit --ur
# or
swgit --user-repo
```
