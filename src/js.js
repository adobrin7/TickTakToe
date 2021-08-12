"use strict";

/**
 * @property {HTMLElement} gameTableElement - The element of the table containing the game.
 * @property {string} status - Game status (playing now or in the end of the game).
 * @property {Array} mapValues - Values in the game as an array.
 * @property {string} phase - The figure of the current turn in the game.
 */
const ticTakToe = {
  gameTableElement: document.getElementById('game'),
  status: 'playing',
  mapValues: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  phase: 'X',

  /**
   * Initializing the game.
   */
  init() {
    this.renderMap();
    this.initEventHandlers();
  },

  /**
   * Outputting cells in html.
   */
  renderMap() {
    for (let row = 0; row < 3; row++) {
      const tr = document.createElement('tr');
      this.gameTableElement.appendChild(tr);
      for (let col = 0; col < 3; col++) {
        const td = document.createElement('td');
        td.dataset.row = row.toString();
        td.dataset.col = col.toString();
        tr.appendChild(td);
      }
    }
  },

  /**
   * Initializing event handlers.
   */
  initEventHandlers() {
    this.gameTableElement.addEventListener('click', event => this.cellClickHandler(event));
  },

  /**
   * Click event handler.
   * @param {MouseEvent} event
   * @param {HTMLElement} event.target
   */
  cellClickHandler(event) {
    if (!this.isCorrectClick(event)) {
      return;
    }

    this.fillCell(event);

    if (this.hasWon()) {
      this.setStatusStopped();
      this.sayWonPhrase();
    }

    this.togglePhase();
  },

  /**
   * Checking whether the click described in the event was correct.
   * @param {Event} event
   * @returns {boolean} Returns true if the game status is "playing", the click that is described in the event object
   * was on the cell and the cell where the click was made was on an empty cell.
   */
  isCorrectClick(event) {
    return this.isStatusPlaying() && this.isClickByCell(event) && this.isCellEmpty(event);
  },

  /**
   * Checking that we are "playing", that the game is not over.
   * @returns {boolean} Returns true, the game status is "playing", otherwise false.
   */
  isStatusPlaying() {
    return this.status === 'playing';
  },

  /**
   * Checking that the click was on a cell.
   * @param {Event} event
   * @param {HTMLElement} event.target
   * @returns {boolean} Returns true if the cell was clicked, otherwise false.
   */
  isClickByCell(event) {
    return event.target.tagName === 'TD';
  },

  /**
   * Checking that a value (cross or zero) was not put in the cell.
   * @param {Event} event
   * @param {HTMLElement} event.target
   * @returns {boolean} Returns true if the cell is empty, otherwise false.
   */
  isCellEmpty(event) {
    const row = +event.target.dataset.row;
    const col = +event.target.dataset.col;

    return this.mapValues[row][col] === '';
  },

  /**
   * Fills the cell that the user clicked in in the event event.
   * @param {Event} event
   * @param {HTMLElement} event.target
   */
  fillCell(event) {
    const row = +event.target.dataset.row;
    const col = +event.target.dataset.col;

    this.mapValues[row][col] = this.phase;
    event.target.textContent = this.phase;
  },

  /**
   * Checking if there is a winning situation on the map.
   * @returns {boolean} Returns true if the game is won, otherwise false.
   */
  hasWon() {
    return this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }) ||
      this.isLineWon({ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }) ||
      this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }) ||

      this.isLineWon({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }) ||
      this.isLineWon({ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }) ||
      this.isLineWon({ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }) ||

      this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }) ||
      this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 });
  },

  /**
   * Checking if there is a winning situation on the line.
   * @param {{x: int, y: int}} a 1-st cell.
   * @param {{x: int, y: int}} b 2-st cell.
   * @param {{x: int, y: int}} c 3-rd cell.
   * @returns {boolean} Returns true if the line is won, otherwise false.
   */
  isLineWon(a, b, c) {
    const value = this.mapValues[a.y][a.x] + this.mapValues[b.y][b.x] + this.mapValues[c.y][c.x];
    return value === 'XXX' || value === '000';
  },

  /**
   * Puts the game status to "stopped".
   */
  setStatusStopped() {
    this.status = 'stopped';
  },

  /**
   * Announces victory.
   */
  sayWonPhrase() {
    const figure = this.phase === 'X' ? 'Крестики' : 'Нолики';
    setTimeout(() => alert(`${figure} выиграли!`), 10);
  },

  /**
   * Changes the shape (cross or zero).
   */
  togglePhase() {
    this.phase = this.phase === 'X' ? '0' : 'X';
  },
};

window.addEventListener('load', () => ticTakToe.init());
