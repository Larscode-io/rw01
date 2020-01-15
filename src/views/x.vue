<template>
<div class="uitschrijven">
	<v-app>
		<v-container>
			<h1 class="title font-weight-regular">Afmelden Nieuwsbrief en Opvragen wachtwoord</h1>
			<v-form ref="form" v-model="formulier.valid">
				<v-card>
					<v-card-text>
						<v-text-field v-model="formulier.email" :rules="emailRules" label="E-mail" :hint=bio required></v-text-field>
					</v-card-text>
				</v-card>
				<v-card>
					<v-checkbox v-model="formulier.checkbox" :rules="[v => !!v || 'U dient akkoord aan te vinken om verder te gaan!']" label="Bent u akkoord ?" required></v-checkbox>
					<v-btn :disabled="!formulier.valid" class="my-5" @click="afmelden">Afmelden</v-btn>
          <v-spacer />
					<span>of</span>
          <v-spacer />
					<v-btn :disabled="!formulier.valid" class="my-5" @click="herinnering">Herinnering wachtwoord</v-btn>
					<!-- <v-btn class="my-5" @click="submit">Accepteer</v-btn> -->
					<v-textarea v-model="slot" auto-grow filled label="Info" rows="1"></v-textarea>
				</v-card>
				<v-card>
				</v-card>
			</v-form>
		</v-container>
	</v-app>
</div>
</template>

<script>
import axios from 'axios'

// @ is an alias to /src

export default {
	name: 'home',
	methods: {
		afmelden() {
			for (const myurl of Object.entries(this.lijsten)) {
				const params = new URLSearchParams();
        // language moet overeenkomen met de taal van de mailinglijst, bv nl=info_nl
				params.append('language', `${myurl[0]}`)
				params.append('email', this.formulier.email)
				params.append('password', '')
				params.append('login-unsub', this.formulier.loginunsub)
				const opt = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					url: `${myurl[1]}`,
					data: params
				};
				axios(opt)
					.then(() => {
						this.messages++;
						this.kleur = 'green';
						return 'xxx'
					})
					.catch(() => {
						this.kleur = 'warning';
					});
			}
		},
		herinnering() {
			for (const myurl of Object.entries(this.lijsten)) {
				const params = new URLSearchParams();
        // language moet overeenkomen met de taal van de mailinglijst, bv nl=info_nl
				params.append('language', `${myurl[0]}`)
				params.append('email', this.formulier.email)
				params.append('password', '')
				params.append('login-remind', this.formulier.loginremind)
				const opt = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					url: `${myurl[1]}`,
					data: params
				};
				axios(opt)
					.then(() => {
						this.messages++;
						this.kleur = 'green';
						return 'xxx'
					})
					.catch(() => {
						this.kleur = 'warning';
					});
			}
		}
	},
	computed: {},
	data: () => ({
		lijsten: {
			nl: 'https://mailman.const-court.be/mailman/options/info_nl',
			fr: 'https://mailman.const-court.be/mailman/options/info_fr',
			de: 'https://mailman.const-court.be/mailman/options/pdf_de'
		},
		bio: 'Klik op Afmelden of Herinnering wachtwoord na het invoeren van uw e-mail adres.',
		slot: 'Bij de keuze Afmelden krijgt u voor alle lijsten waarop u bent ingeschreven een e-mail. U kan dan kiezen voor welke lijst of lijsten u wenst af te melden.\nBij de keuze Herinnering krijgt u uw wachtwoord per e-mail toegestuurd alsook een link om alle opties te wijzigen. Deze link redirect naar onze mailman server.',
		formulier: {
			email: '',
			loginremind: 'Herinnering',
			loginunsub: 'Afmelden',
			checkbox: '',
			valid: false,
		},
		emailRules: [
			v => !!v || 'E-mail is het (enige) verplichtte gegeven',
			v => /.+@.+/.test(v) || 'E-mail met geldig zijn',
		],
		messages: 0,
		kleur: ''
	})
}
</script>
