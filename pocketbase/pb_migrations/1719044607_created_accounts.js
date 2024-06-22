/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "di6c07owgg0t4of",
    "created": "2024-06-22 08:23:27.414Z",
    "updated": "2024-06-22 08:23:27.414Z",
    "name": "accounts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "g2gnf1dp",
        "name": "provider",
        "type": "select",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "github",
            "google"
          ]
        }
      },
      {
        "system": false,
        "id": "pa1f8qaf",
        "name": "userId",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_LuSbiMr` ON `accounts` (\n  `provider`,\n  `userId`\n)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("di6c07owgg0t4of");

  return dao.deleteCollection(collection);
})
