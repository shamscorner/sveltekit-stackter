/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("di6c07owgg0t4of")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_LuSbiMr` ON `accounts` (\n  `provider`,\n  `userId`\n)",
    "CREATE UNIQUE INDEX `idx_GE7yGp7` ON `accounts` (`providerId`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qxmryd2x",
    "name": "providerId",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 100,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("di6c07owgg0t4of")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_LuSbiMr` ON `accounts` (\n  `provider`,\n  `userId`\n)"
  ]

  // remove
  collection.schema.removeField("qxmryd2x")

  return dao.saveCollection(collection)
})
