<template>
<div class="uitschrijven">
	<v-app>
		<v-container>
			<h1 class="title font-weight-regular">Opvragen wachtwoord</h1>
			<v-form ref="form" v-model="formulier.isValid">
				<v-card>
					<v-card-text>
						<v-text-field v-model="formulier.email" :rules="emailRules" label="E-mail" :hint=bio required>
            </v-text-field>
					</v-card-text>
				</v-card>
				<v-card>
					<v-btn class="my-5" @click="afmelden">Afmelden</v-btn>
          <v-spacer />
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
						return 'xxx'
					})
					.catch(() => {
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
		bio: `Klik op 'Afmelden' na het invoeren van uw e-mail adres. Voor alle nieuwsbrieven waarop \
u bent ingeschreven krijgt u een mailbericht. U kan dan kiezen voor welke lijst of lijsten u wenst \
af te melden.`,
		formulier: {
			email: '',
      isValid: false,
			loginremind: 'Herinnering',
			loginunsub: 'Afmelden',
		},
		emailRules: [
			v => !!v || 'E-mail hebben we echt wel nodig',
			v => /.+@.+/.test(v) || 'E-mail moet geldig zijn',
		],
		messages: 0,
	})
}
</script>
