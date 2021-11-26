<template>
  <div>
    <h1>Your Tokens</h1>

    <v-btn to="/create-token">Create Token</v-btn>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Symbol</th>
            <th class="text-left">Type</th>
            <th class="text-left">Supply</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="token in getTokens" :key="token.name">
            <td>{{ token.name }}</td>
            <td>{{ token.symbol }}</td>
            <td>{{ token.type }}</td>
            <td>{{ token.initialSupply }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Main",
  computed: {
    ...mapGetters("accounts", ["getActiveAccount", "getProviderEthers"]),
    ...mapGetters("tokenCreator", [
      "getTokens",
      "getTokenCreatorAbi",
      "getTokenCreatorAddress",
    ]),
  },
  data() {
    return {
      tokenCreator: null,
    };
  },
};
</script>
