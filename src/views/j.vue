<template>
<div class="uitschrijven">
	<v-app>
		<v-container>
			<h1 class="title font-weight-regular">Aanmelden voor verwittiging bij uitspraak</h1>
			<v-form ref="form" v-model="formulier.isValid">
				<v-card>
					<v-card-text>
						<v-checkbox v-model="formulier.allrol" label="Alle rolnummers" ></v-checkbox>
						<v-text-field v-model.number="formulier.rolnr" :autofocus="true" :rules="rolRules" label="Rolnummer"> </v-text-field>
						<v-text-field v-model="formulier.email" :rules="emailRules" label="E-mail" :hint=bio> </v-text-field>
					</v-card-text>
				</v-card>
				<v-card>
					<v-btn class="my-5" @click="rollen">Aanmelden</v-btn>
          <v-spacer />
				</v-card>
					<section v-if="errored">
						<p>.oO°</p>
					</section>
					<section v-if="idroles.includes(formulier.rolnr) && !errored">
						{{ rolRestData.data.find(x => (x.idRole === formulier.rolnr)).trefwoorden.toLowerCase() }}
					</section>
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
		rollen() {
		},
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
						return 'xxx'
					})
					.catch(() => {
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
					timeout: 500,
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
	mounted () {
    axios
      .get('http://172.18.0.113:3000/api/Xaffzaks?filter={%22fields%22:{%22idRole%22:true,%22trefwoorden%22:true,%22motsCles%22:true,%22codeProcAnprNl%22:true,%22codeProcAnprFr%22:true}}')
      .then(response => {
				this.rolRestData = response
				this.idroles = response.data.map(rol=>{return rol.idRole})
			})
			.catch(error => {
				alert(error)
				this.errored = true
			})
      // .then(response => (this.idroles = response.data.map(rol=>{return rol.idRole})))
  },
	computed: {
		// idroles() {
		// 	return this.rolRestData.data.map(rol=>{return rol.idRole});
		// },
		rolRules() {
			return [
				v => !!v || 'Een rolnummer is nodig',
				v => this.idroles.includes(v) || 'Dit rolnummer lijkt onvolledig of niet te bestaan'
				// v => this.idroles.includes(v) || "info:".concat(this.idroles.includes(v).toString()).concat(this.idroles.toString())
				// xx.find(x => x.idRole = 7009).trefwoorden
			]
		},
	},
	data: () => ({
		rolRestData: null,
		idroles: [],
		errored: false,
		lijsten: {
			nl: 'https://mailman.const-court.be/mailman/options/info_nl',
			fr: 'https://mailman.const-court.be/mailman/options/info_fr',
			de: 'https://mailman.const-court.be/mailman/options/pdf_de'
		},
		bio: `Klik op 'Aanmelden' na het invoeren van uw e-mail adres. U krijgt een e-mail waarin u uw aanmelding \
nog dient te bevestigen. Zodra er voor het opgegeven rolnummer een uitspraak gebeurt krijgt u een bericht.`,
		formulier: {
			allrol: false,
			email: '',
			rolnr: null,
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
