<template>
  <div>
    <h1>Token Creator</h1>
    Welcome to the Token Creator
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters("accounts", ["getChainName", "isUserConnected"]),
  },
};
</script>
