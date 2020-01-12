<template>
<div class="hello">
	<v-text-field :value="value" @input="updateValue" :validate-on-blur="true" @blur="$v.formulier.email2.$touch()" />
</div>
</template>
<script>
import {
	required,
	email
} from 'vuelidate/lib/validators'

export default {
	name: 'EmailComp',
	props: {
		value: [String, Number]
	},
	validations: {
		formulier: {
			email2: {
				required,
				email
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
