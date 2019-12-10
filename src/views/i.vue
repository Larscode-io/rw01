<template>
<div class="i">
	<v-app>
		<v-container>
			<h1 class="title font-weight-regular">Inschrijving Nieuwsbrief</h1>
			<!-- <v-textarea v-model="bio" auto-grow filled color="deep-purple" label="Info" rows="1"></v-textarea> -->
			<v-form ref="form" v-model="formulier.valid">
				<v-card>
					<v-card-title class="title font-weight-regular">Persoonlijke gegevens</v-card-title>
					<v-card-text>
						<v-row>
							<v-col>
								<v-row>
									<v-text-field v-model="formulier.email" :rules="emailRules" label="E-mail" :hint=bio required></v-text-field>
								</v-row>
							</v-col>
							<v-col>
								<v-text-field v-model="formulier.fullname" :rules="nameRules" :counter="30" label="Volledige naam (optioneel)"></v-text-field>
								<v-select return-object v-model="formulier.selecttaal" :items="BEtaal" item-text="taal" item-value="formulier.selecttaal.abbr" label="Uw voorkeurtaal (optioneel)" :hint=voorkeurtaal></v-select>
								<v-tooltip bottom>
									<template v-slot:activator="{ on }">
										<v-text-field v-model="formulier.wachtw" :rules="nameRules" :counter="12" label="Wachtwoord (optioneel)" :hint=ww></v-text-field>
									</template>
									<span>{{ ww }}</span>
								</v-tooltip>
								<!-- <v-textarea v-model="ww" auto-grow filled color="deep-purple" label="Info" rows="1"></v-textarea> -->
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
					<v-btn :disabled="!formulier.valid" class="my-5" @click="submit">Accepteer</v-btn>
					<!-- <v-btn class="my-5" @click="submit">Accepteer</v-btn> -->
					<v-spacer> </v-spacer>

					<v-chip class="ma-2" :color="kleur" outlined>
						<v-icon left>mdi-server-plus</v-icon>
						Server Status
					</v-chip>
					<v-badge>
						<template v-slot:badge>
							<span v-if="messages > 0">{{ messages }}</span>
						</template>
						<v-icon large>mdi-email</v-icon>
					</v-badge>
					<v-textarea v-model="slot" auto-grow filled label="Info" rows="1"></v-textarea>
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
	components: {},
	methods: {

		submit() {
			const params = new URLSearchParams();
			params.append('email', this.formulier.email);
			params.append('fullname', this.formulier.fullname);
			params.append('language', this.formulier.selecttaal.abbr);
			params.append('pw', this.formulier.wachtw);
			params.append('pw-conf', this.formulier.wachtw);
			params.append('digest', 0);
			//params.append('param2', 'value2');
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
				data: params
			};
			axios(opt)
				.then((response) => {
          this.ax.push(response.data)
					this.messages++
					this.kleur = 'green'
					return 'xxx'
				})
				.catch((er) => {
          this.er.push( er)
					this.kleur = 'warning';
				});
		}
	},
	data: () => ({
		url: 'xxx',
		bio: 'Uw e-mailadres zal enkel worden gebruikt voor het versturen van die nieuwsbrief. Wij geven die informatie niet aan derden.',
		ww: 'Automatisch gegenereerd indien niet ingevuld',
		slot: 'Later zal het steeds mogelijk zijn u uit te schrijven via de link die in elke nieuwsbrief wordt medegedeeld.\nDoor op de \'Accepteer\' te klikken, stemt u ermee in de nieuwsbrief onder de bovenbedoelde voorwaarden te ontvangen.\nAls u ervoor kiest om geen wachtwoord in te vullen, wordt een automatisch gegenereerd wachtwoord naar u toegezonden zodra u uw aanmelding hebt bevestigd. U kunt steeds om toezending van uw wachtwoord vragen wanneer u uw persoonlijke instellingen wilt wijzigen.\nOm aan te melden op meerdere listings maakt u een nieuwe keuze en accepteert u opnieuw.',
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
		formulier: {
			email: '',
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
    ax: [],
    er: [],
		nameRules: [
			//v => !!v || 'Name is required',
			v => v.length <= 10 || 'Naam mag max. 30 karakters bevatten',
		],
		emailRules: [
			v => !!v || 'E-mail is het (enige) verplichtte gegeven',
			v => /.+@.+/.test(v) || 'E-mail met geldig zijn',
		],
		messages: 0,
		kleur: ''
	})
}
</script>
							<!-- <v-switch v-model="valid" class="ma-4" label="Valid" readonly></v-switch>
					<v-switch v-model="lazy" class="ma-4" label="Lazy"></v-switch> -->
