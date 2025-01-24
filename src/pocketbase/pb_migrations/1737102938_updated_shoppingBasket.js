/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3350570875")

  // remove field
  collection.fields.removeById("relation148074040")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3350570875")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1218262561",
    "hidden": false,
    "id": "relation148074040",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "business",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
