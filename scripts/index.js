const editProfileButton = document.querySelector(".profile__edit-button");

const editProfileModal = document.querySelector("#edit-popup");

const closeButton = editProfileModal.querySelector(".popup__close");

const cardTemplate = document.querySelector("#card-template");

const cardsList = document.querySelector(".cards__list");

const addCardButton = document.querySelector(".profile__add-button");

const newCardModal = document.querySelector("#new-card-popup");

const newCardCloseButton = newCardModal.querySelector(".popup__close");

const newCardForm = document.querySelector("#new-card-form");

const cardNameInput = document.querySelector(".popup__input_type_card-name");

const cardLinkInput = document.querySelector(".popup__input_type_url");

const imageModal = document.querySelector("#image-popup");

const imageModalCloseButton = imageModal.querySelector(".popup__close");

const imageModalImage = imageModal.querySelector(".popup__image");

const imageModalCaption = imageModal.querySelector(".popup__caption");

const editProfileForm = document.querySelector("#edit-profile-form");

const profileTitle = document.querySelector(".profile__title");

const profileDescription = document.querySelector(".profile__description");

const nameInput = document.querySelector(".popup__input_type_name");

const descriptionInput = document.querySelector(
  ".popup__input_type_description",
);

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editProfileModal);
}

editProfileButton.addEventListener("click", handleOpenEditModal);

closeButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.addEventListener("click", function () {
    handleImageClick(name, link);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  renderCard(cardNameInput.value, cardLinkInput.value, cardsList);

  closeModal(newCardModal);

  newCardForm.reset();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(editProfileModal);
}

function handleImageClick(name, link) {
  imageModalImage.src = link;
  imageModalImage.alt = name;
  imageModalCaption.textContent = name;

  openModal(imageModal);
}

addCardButton.addEventListener("click", function () {
  openModal(newCardModal);
});

newCardCloseButton.addEventListener("click", function () {
  closeModal(newCardModal);
});
newCardForm.addEventListener("submit", handleCardFormSubmit);

imageModalCloseButton.addEventListener("click", function () {
  closeModal(imageModal);
});

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

initialCards.forEach(function (card) {
  renderCard(card.name, card.link, cardsList);
});
