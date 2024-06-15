/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kr5801ele0i62dl")

  // remove
  collection.schema.removeField("vvum5tij")

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kr5801ele0i62dl")

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

  // remove
  collection.schema.removeField("lsvrpdn5")

  return dao.saveCollection(collection)
})
