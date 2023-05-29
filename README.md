# Pocketkit

Pocketkit is a simple [SvelteKit](https://kit.svelte.dev/) starter template to get quickly up and running with [PocketBase](https://pocketbase.io/). It has all neccessary auth features without being complicated or bloated.

### Features:
- Tailwind CSS with DaisyUi
- Svelte French Toast for displaying Toast Notifications
- Lucide Icons

## Get Started

1. Start using the template.
2. Download Pocketbase [here](https://pocketbase.io/docs/) and serve it.
4. Import collections in PocketBase

Go into the Pocketbase Settings and paste the following schema in "Import collections".
```
[
    {
        "id": "_pb_users_auth_",
        "name": "users",
        "type": "auth",
        "system": false,
        "schema": [
            {
                "id": "users_name",
                "name": "name",
                "type": "text",
                "system": false,
                "required": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "id": "oAuthIndicator",
                "name": "isOAuth",
                "type": "bool",
                "system": false,
                "required": false,
                "options": {}
            }
        ],
        "indexes": [],
        "listRule": "id = @request.auth.id",
        "viewRule": "id = @request.auth.id",
        "createRule": "",
        "updateRule": "id = @request.auth.id",
        "deleteRule": "id = @request.auth.id",
        "options": {
            "allowEmailAuth": true,
            "allowOAuth2Auth": true,
            "allowUsernameAuth": true,
            "exceptEmailDomains": null,
            "manageRule": null,
            "minPasswordLength": 8,
            "onlyEmailDomains": null,
            "requireEmail": false
        }
    }
]
```

5. Create an .env file in the root folder with the following content: 
```
PUBLIC_POCKETBASE="http://127.0.0.1:8090
```
6. npm i
7. npm run dev and enjoy ;)


