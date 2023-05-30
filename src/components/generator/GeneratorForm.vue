<template>
  <Toaster position="top-right" richColors closeButton :expand="false" />
  <div class="bg-slate-600 p-4 rounded-lg shadow-xl">
    <form>
      <h1 class="text-2xl font-bold mb-4">{{ formData.name }}</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div
            v-for="(type, field) in props.formData.data"
            :key="field"
            class="flex"
        >
          <div>
            <label class="block font-medium mb-2 uppercase text-lg">{{
                field
              }}</label>
            <div v-if="getInputType(type) !== 'select'">
              <input
                  :type="getInputType(type)"
                  v-model="formData.data[field]"
                  :class="{ 'border-red-500 border-2': errors[field] }"
                  class="border border-gray-400 text-gray-800 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
            <div v-else>
              <select
                  v-model="formData.data[field]"
                  :class="{ 'border-red-500 border-2': errors[field] }"
                  class="border border-gray-400 text-gray-800 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option
                    v-for="option in getOptions(type)"
                    :key="option"
                    :value="option"
                >
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div>
        <generator-buttons
            @generate-data="generateData"
            @generate-random-data="generateRandomData"
        />
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { PropType, reactive, ref } from "vue";
import { FormData } from "../../models/models";
import { faker } from "@faker-js/faker";
import { Toaster, toast } from "vue-sonner";
import GeneratorButtons from "./GeneratorButtons.vue";

const props = defineProps({
  formData: {
    type: Object as PropType<FormData>,
    required: true,
  },
});

const emit = defineEmits(["generate-data"]);

const formData: FormData = reactive({
  name: props.formData.name,
  route: props.formData.route,
  data: Object.fromEntries(
    Object.entries(props.formData.data).map(([key]) => [key, ""])
  ),
});

const errors = reactive(
  Object.fromEntries(
    Object.keys(props.formData.data).map((key) => [key, false])
  )
);
const getInputType = (type) => {
  if (type === "string" || type === "email") {
    return type;
  } else if (type === "Date") {
    return "date";
  } else if (type === "boolean") {
    return "checkbox";
  } else if (type.includes("|")) {
    return "select";
  } else if (type === "number") {
    return "number";
  }
};

const getOptions = (type) => {
  if (type.includes("|")) {
    return type.split("|").map((opt) => opt.trim());
  }
};

const generateData = () => {
  // Check if all fields are filled
  const missingFields = Object.entries(formData.data).filter(
    ([, value]) => value === ""
  );

  if (missingFields.length > 0) {
    toast.error("Remplissez les champs manquants.");
    missingFields.forEach(([key]) => {
      errors[key] = true;
    });
    return;
  }

  // Generate the data object from user input values
  const { name, route } = props.formData;
  const data = [];

  const fields = Object.entries(props.formData.data).reduce(
    (acc, [key, value]) => {
      switch (value) {
        case "Date":
          // Format to be yyyy-MM-dd
          acc[key] = new Date(formData.data[key]).toISOString().split("T")[0];
          break;
        case "number":
          acc[key] = parseFloat(formData.data[key]);
          break;
        case "boolean":
        case "string":
        case "email":
          acc[key] = formData.data[key];
          break;
        default:
          if (value.includes("|")) {
            const options = value.split("|").map((opt) => opt.trim());
            acc[key] = options[Math.floor(Math.random() * options.length)];
          }
      }
      return acc;
    },
    {}
  );

  data.push(fields);

  emit("generate-data", { name, route, data: { ...data } });

  // Clear form
  Object.keys(formData.data).forEach((key) => {
    formData.data[key] = "";
  });
};

const generateRandomData = (nbData: number) => {
  const { route, name } = props.formData;
  const data = [];

  for (let i = 0; i < nbData; i++) {
    const fields = Object.entries(props.formData.data).reduce(
      (acc, [key, value]) => {
        if (value === "string") {
          acc[key] = faker.name.firstName();
        } else if (value === "email") {
          acc[key] = faker.internet.email();
        } else if (value === "Date") {
          acc[key] = faker.date.future().toISOString().split("T")[0];
        } else if (value.includes("|")) {
          const options = value.split("|").map((opt) => opt.trim());
          acc[key] = options[Math.floor(Math.random() * options.length)];
        } else if (value === "number") {
          acc[key] = parseFloat(faker.finance.amount());
        } else if (value === "boolean") {
          acc[key] = faker.datatype.boolean();
        }

        return acc;
      },
      {}
    );

    data.push(fields);
  }

  emit("generate-data", { name, route, data: { ...data } });
};
</script>
