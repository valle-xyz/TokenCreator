<template>
  <div>
    <h1>Create Token</h1>

    <v-card>
      <v-card-title>Token Data</v-card-title>
      <v-card-subtitle class="pb-0">Can not be changed later.</v-card-subtitle>
      <v-card-text>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="name"
                  label="Name"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field
                  v-model="symbol"
                  label="Symbol"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field
                  v-model="initialSupply"
                  label="Initial Supply"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-card-actions>
          <v-btn @click="createToken">Create Token</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { ethers } from "ethers";
import { mapGetters } from "vuex";

export default {
  name: "CreateToken",
  computed: {
    ...mapGetters("accounts", ["getActiveAccount", "getProviderEthers"]),
    ...mapGetters("tokenCreator", [
      "getTokens",
      "getTokenCreatorAbi",
      "getTokenCreatorAddress",
    ]),
  },
  created() {
    this.$store.dispatch("tokenCreator/fetchTokens");
    this.$store.dispatch("tokenCreator/storeTokenCreatorAbi");
    this.$store.dispatch("tokenCreator/storeTokenCreatorAddress");

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
      name: "",
      symbol: "",
      initialSupply: 1000000000,
    };
  },
  methods: {
    async createToken() {
      await this.tokenCreator.createSimpleToken(
        this.initialSupply,
        this.name,
        this.symbol
      );
    },
  },
};
</script>
