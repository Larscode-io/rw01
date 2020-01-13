<template>
<div class="hello">
  <!-- <v-text-field :value="value" @input="updateValue" :rules="emailRules" placeholder="user@yahoo.com" /> -->
  <v-text-field v-model="email" placeholder="user@yahoo.com" />
</div>
</template>

<script>
export default {
  name: 'EmailComp',
  props: {
    value: [String, Number],
    v: {
      type: Object,
      required: true
    }
  },
  computed: {
    email: {
      get() {
        return this.value;
      },
      set(value) {
        this.v.$touch();
        this.$emit('input', value);
      }
    }
  },
  methods: {
    updateValue(e) {
      // this.$emit('input', e.target.value)
      this.$emit('input', e)
    }
  }
}
</script>
