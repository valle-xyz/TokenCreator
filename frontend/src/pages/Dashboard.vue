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
import { ethers } from "ethers";
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
  created() {
    // this.$store.dispatch("tokenCreator/fetchTokens");
    // this.$store.dispatch("tokenCreator/storeTokenCreatorAbi");
    // this.$store.dispatch("tokenCreator/storeTokenCreatorAddress");

    // if web3 provider has not been yet loaded, redirect to root
    if (!this.getProviderEthers) {
      document.location.href = "/";
    } else {
      // get the tokenCreator instance
      let signer = this.getProviderEthers.getSigner();
      this.tokenCreator = new ethers.Contract(
        this.getTokenCreatorAddress,
        this.getTokenCreatorAbi,
        signer
      );
      let component = this;

      // set event listener
      this.tokenCreator.on("CreatedSimpleToken", (_from, value) => {
        // show a toast
        component.$toasted.show("New Token Created " + value, {
          type: "success",
          duration: 5000,
          theme: "bubble",
          position: "top-center",
        });

        // refresh the num value
        component.$store.dispatch("tokenCreator/fetchTokens");
      });
    }
  },
  data() {
    return {
      tokenCreator: null,
    };
  },
};
</script>
