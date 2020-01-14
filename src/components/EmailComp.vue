<template>
<div class="hello">
	<!-- <v-text-field :value="value" @input="updateValue" :rules="emailRules" placeholder="user@yahoo.com" /> -->
	<v-text-field @blur="doBlur" v-model="email" placeholder="user@yahoo.com" :rules="rules.c" />
	<div v-if="blurred && v.$error">
		<p v-if="!v.email">e-mail waarschijnlijk ongeldig</p>
		<p v-if="!v.required">e-mail is vereist</p>
	</div>
</div>
</template>

<script>
export default {
	name: 'EmailComp',
	data: () => ({
		blurred: false,
		rules: {
			c: [
				() => true || 'fout',
			],
		},
		emailRules: [
			v => !!v || 'E-mail is het (enige) verplichtte gegeven',
			// v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail moet geldig zijn'
		]
	}),
	props: {
		value: [String, Number],
		v: {
			type: Object,
			required: true
		},
		kleur: {
			type: String,
			default: 'black'
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
