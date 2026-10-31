<script setup lang="ts">
interface PantryItem {
  id: string
  name: string
  createdAt: number
}

const { $db } = useNuxtApp()

const pantryitem = ref('')
const pantryitemarray = ref<PantryItem[]>([])

let subscription: { unsubscribe: () => void } | undefined

onMounted(() => {
  subscription = $db.pantry
    .find()
    .$
    .subscribe(items => {
      pantryitemarray.value = items.map(item => item.toJSON())
    })
})

onUnmounted(() => {
  subscription?.unsubscribe()
})

const additemstomasterpantry = async () => {
  const name = pantryitem.value.trim()

  if (!name) return

  await $db.pantry.insert({
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now()
  })

  pantryitem.value = ''
}
</script>

<template>
  <div>
    <UModal>
      <UButton>Add</UButton>

      <template #content>
        <UInput v-model="pantryitem" />

        <UButton @click="additemstomasterpantry">
          +
        </UButton>
      </template>
    </UModal>

    <UCard
      v-for="item in pantryitemarray"
      :key="item.id"
    >
      {{ item.name }}
    </UCard>
  </div>
</template>