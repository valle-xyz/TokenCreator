import { ethers } from "ethers";
import TokenCreator from "../../contracts/TokenCreator.json";
import addresses from "../../contracts/addresses.json";

const state = {
  tokens: [],
  tokenCreatorAbi: null,
  tokenCreatorAddress: null,
};

const getters = {
  getTokens(state) {
    return state.tokens;
  },
  getTokenCreatorAbi(state) {
    return state.tokenCreatorAbi;
  },
  getTokenCreatorAddress(state) {
    return state.tokenCreatorAddress;
  },
};

const actions = {
  async fetchTokens({ commit, rootState }) {
    let provider = rootState.accounts.providerEthers;
    let chainIdDec = parseInt(rootState.accounts.chainId);
    let tokenCreatorAddress = addresses.TokenCreator[chainIdDec];

    let contract = new ethers.Contract(
      tokenCreatorAddress,
      TokenCreator.abi,
      provider
    );

    let tokens = await contract.getTokensOfOwner(
      rootState.accounts.getters["getActiveAccount"]
    );

    commit("setTokens", tokens);
  },
  storeTokenCreatorAbi({ commit }) {
    commit("setTokenCreatorAbi", TokenCreator.abi);
  },
  storeTokenCreatorAddress({ commit, rootState }) {
    let chainIdDec = parseInt(rootState.accounts.chainId);
    let tokenCreatorAddress = addresses.TokenCreator[chainIdDec];

    commit("setTokenCreatorAddress", tokenCreatorAddress);
  },
};

const mutations = {
  setTokens(state, _tokens) {
    state.num = _tokens;
  },
  setTokenCreatorAbi(state, abi) {
    state.tokenCreatorAbi = abi;
  },
  setTokenCreatorAddress(state, address) {
    state.tokenCreatorAddress = address;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
