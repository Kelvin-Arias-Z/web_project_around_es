export default class Card {
  constructor(
    data,
    templateSelector,
    { handleCardClick, handleLikeClick, handleDeleteClick },
    currentUserId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClickCallback = handleLikeClick;
    this._id = data._id;
    this._ownerId = data.owner?._id ?? data.owner;
    this._isLiked = data.isLiked;
    this._currentUserId = currentUserId;
    this._handleDeleteClickCallback = handleDeleteClick;
  }

getId() {
  return this._id;
}

isLiked() {
  return this._isLiked;
}

setLikes(isLiked) {
  this._isLiked = isLiked;
  this._likeButton.classList.toggle("card__like-button_is-active", isLiked);
}

removeCard() {
  this._element.remove();
  this._element = null;
}

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

_handleLikeClick() {
  this._handleLikeClickCallback(this);
}

 _handleDeleteClick() {
  this._handleDeleteClickCallback(this);
}

  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

this._deleteButton?.addEventListener("click", () => {
  this._handleDeleteClick();
});

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
if (this._ownerId !== this._currentUserId) {
  this._deleteButton.remove();
  this._deleteButton = null;
}
    this._cardTitle = this._element.querySelector(".card__title");

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeButton.classList.toggle(
    "card__like-button_is-active",
    this._isLiked
    );
    this._setEventListeners();

    return this._element;
  }
}