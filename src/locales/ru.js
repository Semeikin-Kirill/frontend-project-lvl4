export default {
  translation: {
    noMatch: 'Страница не найдена',
    linkHome: 'Но вы можете перейти <2>на главную страницу</2>',
    brand: 'Hexlet Chat',
    linkSingup: '',
    channels: 'Каналы',
    channelManagement: 'Управление каналом',
    channelName: '# {{name}}',
    messagesCount_zero: '{{count}} сообщений',
    messagesCount_one: '{{count}} сообщение',
    messagesCount_few: '{{count}} сообщения',
    messagesCount_many: '{{count}} сообщений',
    renname: 'Переименовать',
    delete: 'Удалить',
    messages: 'сообщения',
    renameChannel: 'Канал переименован',
    createChannel: 'Канал создан',
    deleteChannel: 'Канал удален',
    forms: {
      login: {
        imgLogin: 'Войти',
        username: 'Ваш ник',
        password: 'Пароль',
        header: 'Войти',
      },
      signup: {
        imgSignup: 'Регистрация',
        header: 'Регистрация',
        username: 'Имя пользователя',
        password: 'Пароль',
        placeholderUsername: 'От 3 до 20 символов',
        placeholderPassword: 'Не менее 6 символов',
        confirmPassword: 'Подтвердите пароль',
        placeholderConfirmPasword: 'Пароли должны совпадать',
      },
      messages: {
        placeholder: 'Введите сообщение...',
      },
    },
    errors: {
      login: {
        incorrect: 'Неверные имя пользователя или пароль',
      },
      signup: {
        required: 'Обязательное поле',
        sizeUsername: 'От 3 до 20 символов',
        sizePassword: 'Не менее 6 символов',
        userExists: 'Такой пользователь уже существует',
      },
      addChannel: {
        size: 'От 3 до 20 символов',
        unique: 'Должно быть уникальным',
        required: 'Обязательное поле',
      },
      renameChannel: {
        size: 'От 3 до 20 символов',
        required: 'Обязательное поле',
      },
    },
    buttons: {
      logout: 'Выйти',
      signup: 'Зарегистрироваться',
      login: 'Войти',
      cancel: 'Отменить',
      delete: 'Удалить',
      send: 'Отправить',
      add: '+',
    },
    modals: {
      addChannel: {
        title: 'Добавить канал',
        text: 'Имя канала',
      },
      removeChannel: {
        title: 'Удалить канал',
        text: 'Уверены?',
      },
      renameChannel: {
        title: 'Переименовать канал',
        text: 'Имя канала',
      },
    },
  },
};
