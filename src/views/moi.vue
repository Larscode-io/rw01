<template>
<div class="moi">
  <v-app>
    <v-container>
      <h1>Inschrijving Nieuwsbrief</h1>
      <!-- <v-textarea v-model="bio" auto-grow filled color="deep-purple" label="Info" rows="1"></v-textarea> -->
      <v-form ref="form" v-model="valid">
        <v-card>
          <v-card-title class="title font-weight-regular">Persoonlijke gegevens</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-row>
                  <v-text-field v-model="email" :rules="emailRules" label="E-mail" :hint=bio required></v-text-field>
                </v-row>
              </v-col>
              <v-col>
                <v-text-field v-model="fullname" :rules="nameRules" :counter="10" label="Volledige naam (optioneel)"></v-text-field>
                <v-select v-model="SELECTtaal" :hint="`${SELECTtaal}`" :items="BEtaal" item-text="taal" item-value="abbr" label="Uw taal kiezen (optioneel)"></v-select>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="wachtw" :rules="nameRules" :counter="10" label="Wachtwoord (optioneel)" :hint=ww></v-text-field>
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
              <v-radio label="Nieuwsbrief in het Nederlands, verzending zodra trefwoorden opgesteld" value="NL"></v-radio>
              <v-radio label="Nieuwsbrief in het Frans, verzending zodra trefwoorden opgesteld" value="FR"></v-radio>
              <v-radio label="Nieuwsbrief in het Duits, onmiddellijk na uitspraak" value="DE"></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
        <v-card>
          <v-checkbox v-model="checkbox" :rules="[v => !!v || 'U dient akkoord aan te vinken om verder te gaan!']" label="Bent u akkoord ?" required></v-checkbox>
          <v-btn :disabled="!valid" class="my-5" @click="submit">Accepteer</v-btn>
          <v-spacer> </v-spacer>

          <v-chip class="ma-2" :color="kleur" outlined>
            <v-icon left>mdi-server-plus</v-icon>
            Server Status
          </v-chip>
					<v-badge color="green" overlap>
						<template v-slot:badge>
							<span v-if="messages > 0">{{ messages }}</span>
						</template>
						<v-icon large>mdi-email</v-icon>
					</v-badge>
          <v-textarea v-model="slot" auto-grow filled color="deep-purple" label="Info" rows="1"></v-textarea>
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
  components: {},
  methods: {

    submit() {
      const params = new URLSearchParams();
      //params.append('email', this.email);
      params.append('fullname', this.fullname);
      params.append('language', this.taal);
      params.append('pw', this.wachtw);
      params.append('pw-conf', this.wachtw);
      params.append('digest', 0);
      //params.append('param2', 'value2');
      let opt = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: 'https://mailman.const-court.be/mailman/subscribe/info_nl',
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
  data: () => ({
    bio: 'Uw e-mailadres zal enkel worden gebruikt voor het versturen van die nieuwsbrief. Wij geven die informatie niet aan derden.',
    slot: 'Later zal het steeds mogelijk zijn u uit te schrijven via de link die in elke nieuwsbrief wordt medegedeeld.\nDoor op de \'Accepteer\' te klikken, stemt u ermee in de nieuwsbrief onder de bovenbedoelde voorwaarden te ontvangen.',
    ww: 'Als u ervoor kiest om geen wachtwoord in te vullen, wordt een automatisch gegenereerd wachtwoord naar u toegezonden zodra u uw aanmelding hebt bevestigd. U kunt steeds om toezending van uw wachtwoord vragen wanneer u uw persoonlijke instellingen wilt wijzigen.',
    SELECTtaal: {
      taal: '',
      abbr: ''
    },
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
      },
    ],
    lijsten: 'NL',
    wachtw: '',
    checkbox: '',
    checknl: false,
    checkfr: false,
    checkde: false,
    valid: false,
    fullname: '',
    nameRules: [
      //v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    messages: 0,
		kleur: ''
  })
}
</script>
							<!-- <v-switch v-model="valid" class="ma-4" label="Valid" readonly></v-switch>
					<v-switch v-model="lazy" class="ma-4" label="Lazy"></v-switch> -->
