<template>
<div class="i">
	<v-app>
		<v-container>
			<h1 class="title font-weight-regular">devlars911@gmail.com</h1>
			<!-- <h1 class="title font-weight-regular">Inschrijving Nieuwsbrief</h1> -->
			<!-- <v-textarea v-model="bio" auto-grow filled color="deep-purple" label="Info" rows="1"></v-textarea> -->
			<v-form ref="form" v-model="formulier.valid">
				<v-card>
					<v-card-title class="title font-weight-regular">Persoonlijke gegevens</v-card-title>
					<v-card-text>
						<v-row>
							<v-col>
								<v-row>
									<v-text-field v-model="formulier.email" :rules="emailRules" :autofocus="true" :validate-on-blur="true" label="E-mail" :hint="bio" required @blur="$v.formulier.email.$touch()"></v-text-field>
									<div v-if="$v.formulier.email.$error">
										<p v-if="!$v.formulier.email.email">e-mail waarschijnlijk ongeldig</p>
									</div>
								</v-row>
								<v-row>
									<EmailComp :value="email2" @input="(value)=>{email2=value}" />
									<!-- <EmailComp v-model="email2" /> -->
									<!-- v-model="formulier.email2" -->
								</v-row>
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
				<v-card>
					<v-card-title class="title font-weight-regular">De beschikbare lijsten</v-card-title>
					<v-card-text>
						<v-radio-group v-model="lijsten" :mandatory="true">
							<v-radio label="Nieuwsbrief in het Nederlands, spoedig na de uitspraak" value="info_nl"></v-radio>
							<v-radio label="Nieuwsbrief in het Frans, spoedig na de uitspraak" value="info_fr"></v-radio>
							<v-radio label="Nieuwsbrief in het Duits, zonder trefwoorden" value="pdf_de"></v-radio>
						</v-radio-group>
					</v-card-text>
				</v-card>
				<v-card>
					<v-checkbox v-model="formulier.checkbox" :rules="[v => !!v || 'U dient akkoord aan te vinken om verder te gaan!']" label="Bent u akkoord ?" required></v-checkbox>
					<v-dialog v-model="dialoog" width="500">
						<template v-slot:activator="{ on }">
							<v-btn :disabled="!formulier.valid" color="primary" v-on="on" @click="submit">Accepteer</v-btn>
						</template>
						<v-card>
							<v-card-title class="headline grey lighten-2" primary-title>
								Verzoek is verzonden
							</v-card-title>
							<v-card-text>
								<div v-if="!er">
									<span v-html="ax"></span>
								</div>
								<div v-else>Mailman service is niet beschikbaar</div>
							</v-card-text>
							<v-divider></v-divider>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="primary" text @click="dialoog = false"> accepteer </v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-spacer> </v-spacer>
					<v-textarea v-model="slot" auto-grow filled label="Info" rows="1"></v-textarea>
				</v-card>
			</v-form>
			<v-snackbar v-model="snackbar" :timeout="800">
				{{ snackbartext }}
			</v-snackbar>
		</v-container>
	</v-app>
</div>
</template>

<script>
import axios from 'axios'
import {
	required,
	email
} from 'vuelidate/lib/validators'
import EmailComp from '@/components/EmailComp.vue'
// @ is an alias to /src

export default {
	name: 'home',
	validations: {
		formulier: {
			email: {
				required,
				email
			}
		}
	},
	components: {
		EmailComp
	},
	// mounted() {
	// 	alert(process.env.NODE_ENV); // OUTPUT: production
	// 	alert(process.env.DDD); // OUTPUT: undefined
	// 	alert(process.env.VUE_APP_NODE_ENV); // OUTPUT: development
	// },
	methods: {
		submit() {
			const params = new URLSearchParams();
			params.append('email', this.formulier.email.replace(/(["'|])/g, '\\'));
			params.append('fullname', this.formulier.fullname);
			params.append('language', this.formulier.selecttaal.abbr);
			params.append('pw', this.formulier.wachtw);
			params.append('pw-conf', this.formulier.wachtw);
			params.append('digest', 0);
			switch (this.lijsten) {
				case 'info_nl':
					this.url = 'https://mailman.const-court.be/mailman/subscribe/info_nl'
					break;
				case 'info_fr':
					this.url = 'https://mailman.const-court.be/mailman/subscribe/info_fr'
					break;
				case 'pdf_de':
					this.url = 'https://mailman.const-court.be/mailman/subscribe/pdf_de'
					break;
				default: {
					// geen selectie ? kies in functie van de taal
					switch (this.selecttaal.abbr) {
						case 'nl':
							this.url = 'https://mailman.const-court.be/mailman/subscribe/info_nl'
							break;
						case 'fr':
							this.url = 'https://mailman.const-court.be/mailman/subscribe/info_fr'
							break;
						case 'de':
							this.url = 'https://mailman.const-court.be/mailman/subscribe/pdf_de'
							break;
						default:
							// kan in principe niet worden gekozen
							this.url = 'https://mailman.const-court.be/mailman/subscribe/info_nl'
					}
				}
			}
			let opt = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				url: `${this.url}`,
				data: params,
				timeout: 2000
			};
			axios(opt)
				.then((response) => {
					let r = response.data.replace(/\s+/g, ' ').trim()
					r = r.replace(/<table.*table>/, '')
					this.ax = r.match(/<body.*?>([\s\S]*)<\/body>/gs)
					// this.ax = this.ax.replace(/bgcolor="white"/, '')
					// this.ax = this.ax.replace(/<\/head>/, '<style> div { background-color: #66ff99; } </style> </head>')
					if (this.ax.includes("Uw aanmeldingsverzoek is ontvangen en zal zo spoedig")) {
						this.snackbar = true
						this.snackbartext = 'Het ziet er goed uit'
					} else {
						this.snackbar = true
						this.snackbartext = 'Er lijkt een probleem te zijn'
					}
					this.messages++
					return 'xxx'
				})
				.catch((e) => {
					this.er = e
				});
		}
	},
	computed: {
		feedbackcolor() {
			if (this.ax.includes("Uw aanmeldingsverzoek is ontvangen en zal zo spoedig")) {
				return "green"
			} else {
				return "red"
			}
		}
	},
	data: () => ({
		snackbar: false,
		snackbartext: '',
		dialoog: false,
		optioneledialog: false,
		url: 'xxx',
		bio: 'Uw e-mailadres zal enkel worden gebruikt voor het versturen van die nieuwsbrief. Wij geven het niet aan derden.',
		ww: 'Automatisch gegenereerd indien niet ingevuld',
		slot: 'Om aan te melden op meerdere nieuwsbrieven maakt u een nieuwe keuze en accepteert u opnieuw.',
		voorkeurtaal: 'Kies hier Uw voorkeurtaal voor de berichtgeving, de taal van het toegezonden arrest kiest u via de lijstkeuze',
		BEtaal: [{
				taal: 'Nederlands',
				abbr: 'nl'
			},
			{
				taal: 'Frans',
				abbr: 'fr'
			},
			{
				taal: 'Duits',
				abbr: 'de'
			}
		],
		lijsten: 'info_nl',
		email2: '',
		formulier: {
			msg: 'MagWegLater',
			email: '',
			email2: '',
			wachtw: '',
			checkbox: '',
			checknl: false,
			checkfr: false,
			checkde: false,
			valid: false,
			fullname: '',
			selecttaal: {
				taal: '',
				abbr: ''
			},
		},
		ax: '',
		er: '',
		fullnameRules: [
			v => v.length <= 40 || 'Naam maximum 40 karakters bevatten',
		],
		wwRules: [
			v => v.length <= 12 || 'Wachtwoord 12 karakters is voldoende',
		],
		emailRules: [
			v => !!v || 'E-mail is het (enige) verplichtte gegeven',
			// v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail moet geldig zijn'
		],
		messages: 0,
		kleur: ''
	})
}
</script>
