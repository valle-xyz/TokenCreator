<template>
  <v-app>
    <v-app-bar app>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="hidden-md-and-up"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>TokenCreator</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer
      app
      :permanent="!$vuetify.breakpoint.sm && !$vuetify.breakpoint.xs"
      v-model="drawer"
    >
      <template v-slot:prepend>
        <div class="pa-5">
          <wallet-button />
        </div>
      </template>
      <v-list nav>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item to="/profile">
            <v-list-item-icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <keep-alive>
          <router-view />
        </keep-alive>
      </v-container>
    </v-main>
    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import WalletButton from "./components/WalletButton.vue";
export default {
  name: "App",

  components: { WalletButton },
  data: () => ({
    drawer: false,
    group: null,
  }),
  created() {
    this.$store.dispatch("accounts/initWeb3Modal");
    this.$store.dispatch("accounts/initListener");
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
