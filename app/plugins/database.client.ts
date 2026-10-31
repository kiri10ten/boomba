import { createDatabase } from '~~/database'

export default defineNuxtPlugin(async () => {
  const db = await createDatabase()

  return {
    provide: {
      db
    }
  }
})
