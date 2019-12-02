<template>
<div class="moi">
  <h1>Inschrijving Nieuwsbrief</h1>
  <v-form method="post" @submit.prevent v-model="valid">
    <v-container>
      <v-textarea v-model="bio" auto-grow filled color="deep-purple" label="Info" rows="1"></v-textarea>
      <v-card-title class="title font-weight-regular">Persoonlijke gegevens</v-card-title>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="fullname" :rules="nameRules" :counter="10" label="Volledige naam (optioneel)"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="wachtw" :rules="nameRules" :counter="10" label="Wachtwoord (optioneel)"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-radio-group v-model="taal" label="Uw taal (optioneel)" :mandatory="false">
            <v-radio label="Nederlands" value="nl"></v-radio>
            <v-radio label="Frans" value="fr"></v-radio>
            <v-radio label="Duits" value="de"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-textarea v-model="ww" auto-grow filled color="deep-purple" label="Info" rows="1"></v-textarea>
      <v-row>
        <v-col>
          <v-card-title class="title font-weight-regular">De beschikbare lijsten</v-card-title>
          <v-radio-group v-model="lijsten" :mandatory="true">
            <v-radio label="Nieuwsbrief Nederlands, verzending zodra trefwoorden opgesteld" value="NL"></v-radio>
            <v-radio label="Nieuwsbrief Frans, verzending zodra trefwoorden opgesteld" value="FR"></v-radio>
            <v-radio label="Nieuwsbrief Duits onmiddellijk na uitspraak" value="DE"></v-radio>
          </v-radio-group>
        </v-col>
        <v-btn class="my-5" @click="submit" :disabled="!valid">submit</v-btn>
      </v-row >
      <v-textarea v-model="slot" auto-grow filled color="deep-purple" label="Info" rows="1"></v-textarea>
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
      const params = new URLSearchParams();
      params.append('email', this.email);
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
        .then(function(response) {
          alert(response);
          return 'xxx'
        })
        .catch(function(error) {
          alert(error);
        });
    }
  },
  data: () => ({
    bio: 'Uw e-mailadres zal enkel worden gebruikt voor het versturen van die nieuwsbrief. Wij geven die informatie niet aan derden.',
    slot: 'Later zal het steeds mogelijk zijn u uit te schrijven via de link die in elke nieuwsbrief wordt medegedeeld.\nDoor op de onderstaande button te klikken, stemt u ermee in de nieuwsbrief onder de bovenbedoelde voorwaarden te ontvangen.',
    ww: 'Als u ervoor kiest om geen wachtwoord in te vullen, wordt een automatisch gegenereerd wachtwoord naar u toegezonden zodra u uw aanmelding hebt bevestigd. U kunt steeds om toezending van uw wachtwoord vragen wanneer u uw persoonlijke instellingen wilt wijzigen.',
    taal: '',
    lijsten: 'NL',
    wachtw: '',
    checknl: false,
    checkfr: false,
    checkde: false,
    valid: false,
    fullname: 'John Doe',
    nameRules: [
      //v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    email: 'devlars911@gmail.com',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  })
}
</script>
