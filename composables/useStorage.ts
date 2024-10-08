export function useStorage(type: string) {
  const storedItems: Ref = ref([])

  const fetchItems = <T>() => {
    const item = localStorage.getItem(type)
    if (item) {
      storedItems.value = JSON.parse(item) as T[]
    }
  }

  const updateAllItems = <T>(items: T[]): void => {
    localStorage.setItem(type, JSON.stringify(items))
  }

  return {
    storedItems,
    fetchItems,
    updateAllItems
  }
}