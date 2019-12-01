<template>
<div class="moi">
	<h1>Inschrijving Nieuwsbrief</h1>
	<v-form method="post" @submit.prevent v-model="valid">
		<v-container>
			<v-card-title class="title font-weight-regular">Persoonlijke gegevens</v-card-title>
			<v-row>
				<v-col cols="12" md="4">
					<v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field v-model="firstname" :rules="nameRules" :counter="10" label="First name" required></v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field v-model="lastname" :rules="nameRules" :counter="10" label="Last name" required></v-text-field>
				</v-col>
			</v-row>
			<v-card-title class="title font-weight-regular">De beschikbare lijsten</v-card-title>
			<v-row>
				<v-col>
					<v-checkbox v-model="checknl" :label="`Checkbox 1: ${checknl.toString()}`"></v-checkbox>
				</v-col>
				<v-col>
					<v-checkbox v-model="checkfr" :label="`Checkbox 1: ${checkfr.toString()}`"></v-checkbox>
				</v-col>
				<v-col>
					<v-checkbox v-model="checkde" :label="`Checkbox 1: ${checkde.toString()}`"></v-checkbox>
				</v-col>
			</v-row>
			<v-textarea v-model="bio" auto-grow filled color="deep-purple" label="Info" rows="1"></v-textarea>
			<v-btn @click="submit" :disabled="!valid">submit</v-btn>
		</v-container>
	</v-form>
</div>
</template>

<script>
import axios from 'axios'
// @ is an alias to /src

export default {
	name: 'home',
	components: {},
	methods: {

		submit() {
			//let data = { name: this.name, selectPessoa: this.selectPessoa },
			let opt = {
				method: 'POST',
				url: 'https://mailman.const-court.be/mailman/subscribe/info_nl',
				form: { token: 'xxx' }
			};
			axios(opt)
				.then(function(response) {
					alert(response);
				})
				.catch(function(error) {
					alert(error);
				});
		}
	},
	data: () => ({
		bio: 'Uw e-mailadres zal enkel worden gebruikt voor het versturen van die nieuwsbrief. Wij geven die informatie niet aan derden. Later zal het steeds mogelijk zijn u uit te schrijven via de link die in elke nieuwsbrief wordt medegedeeld. Door op onderstaande link te klikken, stemt u ermee in de nieuwsbrief onder de bovenbedoelde voorwaarden te ontvangen.',
		checknl: false,
		checkfr: false,
		checkde: false,
		valid: false,
		firstname: '',
		lastname: '',
		nameRules: [
			v => !!v || 'Name is required',
			v => v.length <= 10 || 'Name must be less than 10 characters',
		],
		email: '',
		emailRules: [
			v => !!v || 'E-mail is required',
			v => /.+@.+/.test(v) || 'E-mail must be valid',
		],
	})
}
</script>
