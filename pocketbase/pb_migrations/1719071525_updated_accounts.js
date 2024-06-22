/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("di6c07owgg0t4of")

  collection.updateRule = "id = @request.auth.id"
  collection.deleteRule = "id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("di6c07owgg0t4of")

  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
