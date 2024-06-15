/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kr5801ele0i62dl")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lsvrpdn5",
    "name": "expiresAt",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kr5801ele0i62dl")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lsvrpdn5",
    "name": "expiresAt",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
