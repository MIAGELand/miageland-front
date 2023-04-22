<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto">
      <div class="py-2 align-middle inline-block min-w-full">
        <div class="overflow-hidden border-b border-gray-200 rounded-xl">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th v-for="row in props.rows" scope="col" class="px-6 py-3 text-left text-gray-500 uppercase tracking-wider cursor-pointer">
                    {{ row }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="d in props.data">
                  <td v-for="col in rows" class="px-6 py-4 whitespace-nowrap text-gray-900">{{ d[col] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps ({
  data: {
    type: Array,
    required: true
  },
  rows: {
    type: Array,
    required: true
  }
});

</script>