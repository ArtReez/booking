const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarInput = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const imageInput = document.querySelector('.ad-form__upload input[type=file]');
const imagePreview = document.querySelector('.ad-form__photo');

avatarInput.addEventListener('change', () => {
  const avatar = avatarInput.files[0];
  const avatarName = avatar.name.toLowerCase();
  const isAvatarMatches = FILE_TYPES.some((item) => avatarName.endsWith(item));

  if (isAvatarMatches) {
    avatarPreview.src = URL.createObjectURL(avatar);
  }
});

imageInput.addEventListener('change', () => {
  const image = imageInput.files[0];
  const imageName = image.name.toLowerCase();
  const isImageMatches = FILE_TYPES.some((item) => imageName.endsWith(item));

  if (isImageMatches) {
    const newImage = document.createElement('img');
    newImage.src = URL.createObjectURL(image);
    newImage.width = 70;
    newImage.height = 70;
    imagePreview.append(newImage);
  }
});

export { avatarPreview, imagePreview };
