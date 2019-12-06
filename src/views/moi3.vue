<template>
  <div id="app">
    <v-app id="inspire">
      <v-container fluid>
        <v-row align="center">
          <v-col cols="6">
            <v-subheader>Custom items</v-subheader>
          </v-col>

          <v-col cols="6">
            <v-select
              v-model="select"
              :hint="`${select.state}, ${select.abbr}`"
              :items="items"
              item-text="state"
              item-value="abbr"
              label="Select"
              persistent-hint
              return-object
              single-line
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div></template>

<script>

export default {
  name: 'home',
  components: {},
  data () {
    return {
      select: { state: 'Florida', abbr: 'FL' },
      items: [
        { state: 'Florida', abbr: 'FL' },
        { state: 'Georgia', abbr: 'GA' },
        { state: 'Nebraska', abbr: 'NE' },
        { state: 'California', abbr: 'CA' },
        { state: 'New York', abbr: 'NY' },
      ],
    }
  },}
</script>
							<!-- <v-switch v-model="valid" class="ma-4" label="Valid" readonly></v-switch>
					<v-switch v-model="lazy" class="ma-4" label="Lazy"></v-switch> -->
