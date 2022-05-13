## Development
- Before to do something: please understand [how it work](./how_it_work.md)

## 1. Setup
- Init database: 
    - Manually:
        - Create `db.json` file into `db_store/db` folder.
        - Copy code line below and paste to `db.json` file.
            ``` json
            {
                "users": [],
                "repos": [],
                "default": {}
            }
            ```
    - Command line:
        ```
        cp -i db_store/db/example_db.json db_store/db/db.json 
        ```
    - Resualt: 
    ![data folder file data](./../sources/doc_images/database_folderfile.png)
- Init test:
    - Manually:
        - Create folder with name `data` in `test` folder
    - Command line:
        ```
        mkdir test/data
        ```
- Init ssh
    >If you dont have ssh key before
    - Run command line on mac or linux:
        ```
        mkdir ~/.ssh
        ```
    - Window:
## 2. Install 
```
    make install
    # or
    npm install -g .
```
Now you can run `swgit --help` on your terminal.

Check this [doc](./commands.md)

## 3. Uninstall 
```
    make uninstall
    # or
    npm uninstall -g .
```