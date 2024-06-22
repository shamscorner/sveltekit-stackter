/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("di6c07owgg0t4of")

  // update
  collection.schema.addField(new SchemaField({
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
        "password",
        "github",
        "google"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("di6c07owgg0t4of")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
