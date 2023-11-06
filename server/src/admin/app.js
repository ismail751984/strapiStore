const config = {
  translations: {
    en: {
      'Auth.form.welcome.title': 'Welcome to Dining App',
    },
  },
};

const bootstrap = app => {
  console.log('bootstrap', app);
};

export default {
  config,
  bootstrap,
};