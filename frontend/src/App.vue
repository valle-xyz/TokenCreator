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
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
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

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style lang="scss">
.web3modal-modal-lightbox {
  z-index: 99;
  font-family: "Roboto", sans-serif;
}
</style>
