
export class Set {
  private boardSize = 12;
  private readonly featureOptions = 3;
  private readonly numberOfFeatures = 4;

  public initDeck(): string[] {
    const deck = [];
    for (let i = 0; i < this.featureOptions; i++) {
      for (let j = 0; j < this.featureOptions; j++) {
        for (let k = 0; k < this.featureOptions; k++) {
          for (let l = 0; l < this.featureOptions; l++) {
            deck.push(`${i}_${j}_${k}_${l}`);
          }
        }
      }
    }
    return deck;
  }

  areAttributesNotEqual(features: string[]): boolean {
    for (var i = 0; i < features.length; i++) {
      for (var j = i + 1; j < features.length; j++) {
        if (features[i] === features[j]) {
          return false;
        }
      }
    }
    return true;
  }

  areAttributesEqual(features: string[]): boolean {
    for (var i = 1; i < features.length; i++) {
      if (features[i] !== features[i - 1]) {
        return false;
      }
    }
    return true;
  }

  isSet(ids: string[]): boolean {
    const selectedFeatures = ids.map((id) => id.split('_'));
    for (let i = 0; i < this.numberOfFeatures; i++) {
      const attributeValues = selectedFeatures.map((features) => {
        return features[i];
      });
      if (!(this.areAttributesEqual(attributeValues) ||
            this.areAttributesNotEqual (attributeValues))) {
        return false;
      }
    }
    return true;

  }

  numberOfSets(board: string[]): number {
    let count = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = i + 1; j < board.length; j++) {
        for (let k = j + 1; k < board.length; k++) {
          const isValidSet = this.isSet([board[i], board[j], board[k]]);
          if (isValidSet) {
            count++;
          }
        }
      }
    }
    return count;
  }

  updateBoard(
    deck: string[],
    board: string[],
    numberOfSets: number
  ): {deck: string[], board: string[], numberOfSets: number} {
    while (board.length < this.boardSize || numberOfSets < 1) {
      if (deck.length < 1) {
        break;
      }
      for (let i = 0 ; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * deck.length);
        board.push(deck[randomIndex]);
        deck.splice(randomIndex, 1);
      }
      if (board.length >= this.boardSize) {
        numberOfSets = this.numberOfSets(board);
      }
    }
    return {deck, board, numberOfSets};
  }

}
