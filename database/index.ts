import { createRxDatabase } from 'rxdb/plugins/core'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'

import { pantrySchema } from './schemas/pantry.schema'

export async function createDatabase() {
  const db = await createRxDatabase({
    name: 'pantrydb',
    storage: getRxStorageDexie()
  })

  await db.addCollections({
    pantry: {
      schema: pantrySchema
    }
  })

  return db
}
