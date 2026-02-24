import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'opening-hours': {
    enabled: true,
  },
  rrule: {
    enabled: true,
  },
  // 'component-usage': {
  //   enabled: true,
  // },
  // email: {
  //   config: {
  //     provider: '@opkod-france/strapi-provider-email-brevo',
  //     providerOptions: {
  //       apiKey: env('BREVO_API_KEY', ''),
  //     },
  //     settings: {
  //       defaultFrom: env('DEFAULT_FROM_EMAIL', 'hello@example.com'),
  //       defaultReplyTo: env('DEFAULT_REPLY_TO_EMAIL', 'hello@example.com'),
  //     },
  //   },
  // },
});

export default config;
