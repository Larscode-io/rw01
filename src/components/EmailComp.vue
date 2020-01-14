<template>
<div class="hello">
	<!-- <v-text-field :value="value" @input="updateValue" :rules="emailRules" placeholder="user@yahoo.com" /> -->
	<v-text-field :autofocus="true" label="E-mail" @blur="doBlur" v-model="email" placeholder="user@yahoo.com" />
	<div v-if="blurred && vv.$error">
		<p v-if="!vv.email">e-mail waarschijnlijk ongeldig</p>
		<p v-if="!vv.required">e-mail is vereist</p>
	</div>
</div>
</template>

<script>
export default {
	name: 'EmailComp',
	data: () => ({
		blurred: false,
		emailRules: [
			v => !!v || 'E-mail is het (enige) verplichtte gegeven',
			// v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail moet geldig zijn'
		]
	}),
	props: {
		value: [String, Number],
		vv: {
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
				this.vv.$touch();
				this.$emit('input', value);
			}
		}
	},
	methods: {
    doBlur(e) {
      this.blurred=true
      this.$emit('blurrr', e)
    },
		updateValue(e) {
			// this.$emit('input', e.target.value)
			this.$emit('input', e)
		}
	}
}
</script>
