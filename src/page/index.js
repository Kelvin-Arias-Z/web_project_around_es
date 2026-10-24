import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "411ad360-7219-45d7-9a69-9cd1f2c1a9a5",
    "Content-Type": "application/json"
  }
});



const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const editAvatarButton = document.querySelector(".profile__avatar-edit-button");
const avatarForm = document.querySelector("#avatar-form");
const editProfileForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description"
);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
};


let currentUserId;
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id;
    console.log("Tarjetas recibidas:", cards);

    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar
    });

    cardSection.setItems(cards);
    cardSection.renderItems();
  })
  .catch((error) => {
    console.error(error);
  });
const imagePopup = new PopupWithImage("#image-popup");
const deletePopup = new PopupWithConfirmation("#delete-popup");

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    (name, link) => {
      imagePopup.open(name, link);
    },
(cardInstance) => {
  const isLiked = cardInstance._isLiked;

      const request = isLiked
        ? api.unlikeCard(cardInstance._id)
        : api.likeCard(cardInstance._id);

      request
        .then((updatedCard) => {
          console.log("Respuesta del servidor:", updatedCard);
          cardInstance._isLiked = updatedCard.isLiked;

          cardInstance._likeButton.classList.toggle(
            "card__like-button_is-active",
            !isLiked
          );
        })
        .catch((error) => {
          console.error(error);
        });
      },
    currentUserId,
(cardInstance) => {
  deletePopup.setSubmitAction(() => {
    api.deleteCard(cardInstance._id)
      .then(() => {
        cardInstance._element.remove();
        deletePopup.close();
      })
      .catch((error) => {
        console.error(error);
      });
  });

  deletePopup.open();
}
  );

  return card.generateCard();
}

const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

const editProfilePopup = new PopupWithForm(
  "#edit-popup",
  (formData) => {
    const submitButton = editProfileForm.querySelector(".popup__button");

    submitButton.textContent = "Guardando...";
    submitButton.disabled = true;

    api.updateUserInfo(formData.name, formData.description)
      .then((userData) => {
        userInfo.setUserInfo({
          name: userData.name,
          job: userData.about,
        });

        editProfilePopup.close();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        submitButton.textContent = "Guardar";
        submitButton.disabled = false;
      });
  }
);

const newCardPopup = new PopupWithForm(
  "#new-card-popup",
  (formData) => {
    const submitButton = newCardForm.querySelector(".popup__button");

    submitButton.textContent = "Creando...";

    api.addCard(formData["place-name"], formData.link)
      .then((cardData) => {
        const cardElement = createCard(cardData);

        cardSection.addItem(cardElement);
        newCardPopup.close();
        newCardValidator.resetValidation();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        submitButton.textContent = "Crear";
      });
  }
);

const avatarPopup = new PopupWithForm("#avatar-popup", (formData) => {
  const submitButton = avatarForm.querySelector(".popup__button");

  submitButton.textContent = "Guardando...";
  submitButton.disabled = true;

  api.updateAvatar(formData.avatar)
    .then((userData) => {
      const currentUserInfo = userInfo.getUserInfo();

      userInfo.setUserInfo({
        name: currentUserInfo.name,
        job: currentUserInfo.job,
        avatar: userData.avatar
      });

      avatarPopup.close();
    })
    .catch((error) => {
      console.error(error);
    })
.finally(() => {
  submitButton.textContent = "Guardar";
  submitButton.disabled = false;
});
});

const editProfileValidator = new FormValidator(
  validationConfig,
  editProfileForm
);

const newCardValidator = new FormValidator(
  validationConfig,
  newCardForm
);

const avatarValidator = new FormValidator(
  validationConfig,
  avatarForm
);

editProfileButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();

  nameInput.value = currentUserInfo.name;
  descriptionInput.value = currentUserInfo.job;

  editProfileValidator.resetValidation();
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  newCardValidator.resetValidation();
  newCardPopup.open();
});

editAvatarButton.addEventListener("click", () => {
  avatarForm.reset();
  avatarValidator.resetValidation();
  avatarPopup.open();
});

imagePopup.setEventListeners();
deletePopup.setEventListeners();
editProfilePopup.setEventListeners();
newCardPopup.setEventListeners();

editProfileValidator.setEventListeners();
newCardValidator.setEventListeners();
avatarPopup.setEventListeners();
avatarValidator.setEventListeners();
