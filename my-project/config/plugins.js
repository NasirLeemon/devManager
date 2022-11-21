module.exports = ({ env }) => ({
  // ...
  email: {
    config: {
      provider: 'sendgrid', // For community providers pass the full package name (e.g. provider: 'strapi-provider-email-mandrill')
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: 'abnasir530@gmail.com',
        defaultReplyTo: 'abnasir530@gmail.com',
        testAddress: 'abnasir530@gmail.com',
      },
    },
  },
  // ...
});