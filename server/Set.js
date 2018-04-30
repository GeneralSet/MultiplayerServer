"use strict";
exports.__esModule = true;
var Set = /** @class */ (function () {
    function Set() {
        this.boardSize = 12;
        this.featureOptions = 3;
        this.numberOfFeatures = 4;
    }
    Set.prototype.initDeck = function () {
        var deck = [];
        for (var i = 0; i < this.featureOptions; i++) {
            for (var j = 0; j < this.featureOptions; j++) {
                for (var k = 0; k < this.featureOptions; k++) {
                    for (var l = 0; l < this.featureOptions; l++) {
                        deck.push(i + "_" + j + "_" + k + "_" + l);
                    }
                }
            }
        }
        return deck;
    };
    Set.prototype.areAttributesNotEqual = function (features) {
        for (var i = 0; i < features.length; i++) {
            for (var j = i + 1; j < features.length; j++) {
                if (features[i] === features[j]) {
                    return false;
                }
            }
        }
        return true;
    };
    Set.prototype.areAttributesEqual = function (features) {
        for (var i = 1; i < features.length; i++) {
            if (features[i] !== features[i - 1]) {
                return false;
            }
        }
        return true;
    };
    Set.prototype.isSet = function (ids) {
        var selectedFeatures = ids.map(function (id) { return id.split('_'); });
        var _loop_1 = function (i) {
            var attributeValues = selectedFeatures.map(function (features) {
                return features[i];
            });
            if (!(this_1.areAttributesEqual(attributeValues) ||
                this_1.areAttributesNotEqual(attributeValues))) {
                return { value: false };
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.numberOfFeatures; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return true;
    };
    Set.prototype.numberOfSets = function (board) {
        var count = 0;
        for (var i = 0; i < board.length; i++) {
            for (var j = i + 1; j < board.length; j++) {
                for (var k = j + 1; k < board.length; k++) {
                    var isValidSet = this.isSet([board[i], board[j], board[k]]);
                    if (isValidSet) {
                        count++;
                    }
                }
            }
        }
        return count;
    };
    Set.prototype.hint = function (board) {
        for (var i = 0; i < board.length; i++) {
            for (var j = i + 1; j < board.length; j++) {
                for (var k = j + 1; k < board.length; k++) {
                    var potentialSet = [board[i], board[j], board[k]];
                    var isValidSet = this.isSet([board[i], board[j], board[k]]);
                    if (isValidSet) {
                        return potentialSet;
                    }
                }
            }
        }
        return [];
    };
    Set.prototype.updateBoard = function (deck, board, numberOfSets) {
        while (board.length < this.boardSize || numberOfSets < 1) {
            if (deck.length < 1) {
                break;
            }
            for (var i = 0; i < 3; i++) {
                var randomIndex = Math.floor(Math.random() * deck.length);
                board.push(deck[randomIndex]);
                deck.splice(randomIndex, 1);
            }
            numberOfSets = this.numberOfSets(board);
        }
        numberOfSets = this.numberOfSets(board);
        return { deck: deck, board: board, numberOfSets: numberOfSets };
    };
    return Set;
}());
exports.Set = Set;
