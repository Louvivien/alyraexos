import { observable, action, decorate, computed, when } from "mobx";
import randomColor from "utils/randomColor";

class GradientTokenStore {
  tokens = [];
  owner = null;
  isLoading = true;

  constructor(contractsStore) {
    this.contractsStore = contractsStore;
    when(() => this.gradientTokenInstance, this.setup);
  }

  get gradientTokenInstance() {
    return this.contractsStore && this.contractsStore.gradientTokenInstance;
  }

  setup = async () => {
    const owner = await this.gradientTokenInstance.owner();
    this.setOwner(owner);
  }

  setOwner(owner) {
    this.owner = owner;
  }
}

fetchTokens = async () => {
    const tokens = await this.gradientTokenInstance.tokensOf(this.owner);
    const gradients = await Promise.all(
      tokens.map(async token => {
        return this.gradientTokenInstance.getGradient(token);
      })
    );
    this.setIsLoading(false);
    if (!gradients.length) {
      return;
    }
    this.setTokens(this.indexedTokens(gradients));
  };

  setTokens(tokens) {
    this.tokens.replace(tokens);
  }

  indexedTokens(gradients) {
    return gradients.map(gradient => {
      return {
        gradient,
        index: this.tokenIndex++
      };
    });
  }

  mintToken = async () => {
    const gradient = ['#fff', '#000'];
    await this.gradientTokenInstance.mint(gradient[0], gradient[1], {
      from: this.owner,
      gas: 170000
    });
    this.appendToken({ gradient, index: this.tokenIndex++ });
  };


  appendToken(token) {
    this.tokens.push(token);
  }


export default decorate(GradientTokenStore, {
  owner: observable,
  tokens: observable,
  isLoading: observable,
  gradientTokenInstance: computed
});