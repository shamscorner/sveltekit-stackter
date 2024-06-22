/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("di6c07owgg0t4of")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_LuSbiMr` ON `accounts` (\n  `provider`,\n  `userId`\n)",
    "CREATE UNIQUE INDEX `idx_tKqgMaz` ON `accounts` (\n  `provider`,\n  `providerId`\n)",
    "CREATE INDEX `idx_RrVZ3gw` ON `accounts` (`providerId`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("di6c07owgg0t4of")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_LuSbiMr` ON `accounts` (\n  `provider`,\n  `userId`\n)",
    "CREATE UNIQUE INDEX `idx_tKqgMaz` ON `accounts` (\n  `provider`,\n  `providerId`\n)"
  ]

  return dao.saveCollection(collection)
})
