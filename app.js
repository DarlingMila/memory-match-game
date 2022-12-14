const board = document.querySelector(".board");
const form = document.querySelector(".form");

const resetBtn = document.querySelector(".menu__btn_reset");
const settingsBtn = document.querySelector(".menu__btn_settings");
const modalSettingsBtn = document.querySelector(".modalBtn_settings");
const modalResetBtn = document.querySelector(".modalBtn_reset");

const closeBtns = document.querySelectorAll(".modal__btn_close");
const overlay = document.querySelector(".overlay");

const modalSettings = document.querySelector(".modal_settings");
const modalText = document.querySelector(".modal_text");

const themesList = form.querySelector(".list_themes");

const themes = {
  animalsTheme: [
    { imgSrc: "./images/animals/pic1.jpg", name: "pic1" },
    { imgSrc: "./images/animals/pic2.jpg", name: "pic2" },
    { imgSrc: "./images/animals/pic3.jpg", name: "pic3" },
    { imgSrc: "./images/animals/pic4.jpg", name: "pic4" },
    { imgSrc: "./images/animals/pic5.jpg", name: "pic5" },
    { imgSrc: "./images/animals/pic6.jpg", name: "pic6" },
    { imgSrc: "./images/animals/pic7.jpg", name: "pic7" },
    { imgSrc: "./images/animals/pic8.jpg", name: "pic8" },
  ],
  foodTheme: [
    { imgSrc: "./images/food/pic1.jpg", name: "pic1" },
    { imgSrc: "./images/food/pic2.jpg", name: "pic2" },
    { imgSrc: "./images/food/pic3.jpg", name: "pic3" },
    { imgSrc: "./images/food/pic4.jpg", name: "pic4" },
    { imgSrc: "./images/food/pic5.jpg", name: "pic5" },
    { imgSrc: "./images/food/pic6.jpg", name: "pic6" },
    { imgSrc: "./images/food/pic7.jpg", name: "pic7" },
    { imgSrc: "./images/food/pic8.jpg", name: "pic8" },
  ],
  natureTheme: [
    { imgSrc: "./images/nature/pic1.jpg", name: "pic1" },
    { imgSrc: "./images/nature/pic2.jpg", name: "pic2" },
    { imgSrc: "./images/nature/pic3.jpg", name: "pic3" },
    { imgSrc: "./images/nature/pic4.jpg", name: "pic4" },
    { imgSrc: "./images/nature/pic5.jpg", name: "pic5" },
    { imgSrc: "./images/nature/pic6.jpg", name: "pic6" },
    { imgSrc: "./images/nature/pic7.jpg", name: "pic7" },
    { imgSrc: "./images/nature/pic8.jpg", name: "pic8" },
  ],
  travelTheme: [
    { imgSrc: "./images/travel/pic1.jpg", name: "pic1" },
    { imgSrc: "./images/travel/pic2.jpg", name: "pic2" },
    { imgSrc: "./images/travel/pic3.jpg", name: "pic3" },
    { imgSrc: "./images/travel/pic4.jpg", name: "pic4" },
    { imgSrc: "./images/travel/pic5.jpg", name: "pic5" },
    { imgSrc: "./images/travel/pic6.jpg", name: "pic6" },
    { imgSrc: "./images/travel/pic7.jpg", name: "pic7" },
    { imgSrc: "./images/travel/pic8.jpg", name: "pic8" },
  ],
};

const CARD_WIDTH = `150px`;

let pairs = 0;
let firstPic = null;
let secondPic = null;
let theme = themes.foodTheme;
let amountOfCards = 8;


const randomize = (data) => {
  const pile = data.sort(() => Math.random() - 0.5).slice(-amountOfCards);
  const cardData = pile.concat(pile);

  cardData.sort(() => Math.random() - 0.5);

  return Array.from(cardData);
};

const clear = (theme) => {
  pairs = 0;

  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    if (card.classList.contains("toggleCard")) {
      card.classList.remove("toggleCard");
    }

    card.classList.add("card_displayNone");

    if (index < amountOfCards * 2) {
      card.classList.remove("card_displayNone");
    }
  });

  setTimeout(() => {
    addData(theme);
  }, 200);
};

const addData = (theme) => {
  board.style.gridTemplateRows = `repeat(${amountOfCards / 2}, ${CARD_WIDTH})`;

  const cards = randomize(theme);
  let boardCards = document.querySelectorAll(".card");
  let boardFaces = document.querySelectorAll(".face");

  cards.forEach((item, index) => {
    boardCards[index].dataset.name = item.name;
    boardFaces[index].src = item.imgSrc;
    boardFaces[index].alt = item.name;
  });
};

const startGame = (theme) => {
  function createElement(el, cl) {
    const i = document.createElement(el);
    i.classList.add(cl);
    return i;
  }

  for (let i = 0; i < theme.length * 2; i++) {
    const card = createElement("div", "card");
    const face = createElement("img", "face");
    const back = createElement("div", "back");

    board.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      selectCard(e);
    });
  }

  addData(theme);
};

const selectCard = (e) => {
  const selectedCard = e.target;

  if (!firstPic) {
    firstPic = selectedCard;
  } else {
    secondPic = selectedCard;
    checkCards(firstPic, secondPic);

    firstPic = null;
    secondPic = null;
  }
};

const checkCards = (firstPic, secondPic) => {
  if (firstPic.dataset.name === secondPic.dataset.name) {
    pairs++;
  } else {
    setTimeout(() => {
      firstPic.classList.remove("toggleCard");
      secondPic.classList.remove("toggleCard");
    }, 1000);
  }

  if (pairs === amountOfCards) {
    setTimeout(() => {
      showEndMessage("Win!");
    }, 1000);
  }
};

const toggleModal = (modal) => {
  modal.classList.toggle("modal_active");
  overlay.classList.toggle("overlay_active");
};

const showEndMessage = (text) => {
  const header = modalText.querySelector(".modal__title");
  header.innerHTML = text;

  toggleModal(modalText);
};

// вставки в поп ап
for (themeItem in themes) {
  const item = document.createElement("li");

  const input = document.createElement("input");
  input.classList.add("input");
  input.classList.add("input_theme");
  input.type = "radio";
  input.name = "theme";
  input.id = themeItem;
  input.value = themeItem;

  if (theme[0].imgSrc.includes(themeItem.slice(0, -5))) {
    input.checked = true;
  }

  const label = document.createElement("label");
  label.setAttribute("for", themeItem);
  label.textContent = themeItem.slice(0, -5);

  item.appendChild(input);
  item.appendChild(label);

  themesList.appendChild(item);
}

closeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const modal = e.target.closest(".modal");
    toggleModal(modal);
  });
});

resetBtn.addEventListener("click", () => clear(theme));
modalResetBtn.addEventListener("click", () => {
  clear(theme);
  toggleModal(modalText);
});

settingsBtn.addEventListener("click", () => {
  toggleModal(modalSettings);
});

modalSettingsBtn.addEventListener("click", () => {
  toggleModal(modalText);
  toggleModal(modalSettings);
});

overlay.addEventListener("click", () => {
  const modal = document.querySelector(".modal_active");
  toggleModal(modal);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = form.querySelector(".input_theme:checked");
  theme = themes[data.value];

  const digit = form.querySelector(".input_amount:checked");
  amountOfCards = +digit.value;

  clear(theme);

  const modal = e.target.closest(".modal");
  toggleModal(modal);
});

startGame(theme);
