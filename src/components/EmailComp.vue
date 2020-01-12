<template>
<div class="hello">
	<v-text-field :value="value" @input="updateValue" />
	<!-- <input :value="value" @input="updateValue" /> -->



</div>
</template>
<script>
export default {
	name: 'EmailComp',
	props: {
		value: [String, Number]
	},
	methods: {
		updateValue(e) {
			// this.$emit('input', e.target.value)
      // https://stackoverflow.com/questions/42918710/how-to-use-v-bind-in-a-custom-component/54335369#54335369
			this.$emit('input', e)
		}
	}
}
</script>
