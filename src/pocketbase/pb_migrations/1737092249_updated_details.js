/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3816125536")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "file1204091606",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "attachments",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3816125536")

  // remove field
  collection.fields.removeById("file1204091606")

  return app.save(collection)
})
