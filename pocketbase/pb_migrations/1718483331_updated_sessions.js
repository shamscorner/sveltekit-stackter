/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kr5801ele0i62dl")

  // remove
  collection.schema.removeField("uekyq3az")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vvum5tij",
    "name": "expiresAt",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 30,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kr5801ele0i62dl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uekyq3az",
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

  // remove
  collection.schema.removeField("vvum5tij")

  return dao.saveCollection(collection)
})
