<template>
  <input
    v-if="type === 'number'"
    :max="max"
    :min="min"
    @input="$emit('update:modelValue', $event.target.value)"
    class="input"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    :disabled="disabled"
  >
  <input
    v-else
    @input="$emit('update:modelValue', $event.target.value)"
    class="input"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    :disabled="disabled"
  >
</template>

<script>
export default {
  name: "YInput",
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    max: {
      default: 0
    },
    min: {
      default: 0
    },
    disabled: {
      default: false,
    },
    modelValue: [String, Number]
  },
}
</script>

<style scoped>
.input {
  background: rgba(255, 255, 255, 0.24);
  color: var(--light);
  border-color: var(--border-dark);
  border-width: 1px;
  border-style: solid;
  height: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  user-select: none;
  outline: none;
  transition: all .3s ease-in-out;
}
.input:hover {
  background: hsla(0, 0%, 100%, 0.5);
  color: var(--light);
  border-color: var(--border-dark);
  border-width: 1px;
  border-style: solid;
  height: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  user-select: none;
  outline: none;
  transition: all .3s ease-in-out;
}
.input:active {
  background: hsla(0, 0%, 100%, 0.17);
  color: var(--light);
  border-color: var(--border-dark);
  border-width: 1px;
  border-style: solid;
  height: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  user-select: none;
  outline: none;
  transition: all .3s ease-in-out;
}
.input:invalid {
  background-color: hsla(0, 83%, 41%, 0.89);
  color: var(--light);
  border-color: var(--border-dark);
  border-width: 1px;
  border-style: solid;
  height: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  user-select: none;
  outline: none;
  transition: all .3s ease-in-out;
}

::placeholder {
  font-style: italic;
  color: rgba(255, 255, 255, 0.53);
}
</style>
