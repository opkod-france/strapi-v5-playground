import type { Core } from '@strapi/strapi';

const SEED_MARKER = 'playground-seeded';

export async function seed(strapi: Core.Strapi) {
  // Check if already seeded using the store (key-value persisted across restarts)
  const store = strapi.store({ type: 'core', name: 'playground' });
  const alreadySeeded = await store.get({ key: SEED_MARKER });
  if (alreadySeeded) return;

  strapi.log.info('🌱 Seeding playground demo data…');

  await seedRestaurants(strapi);
  await seedEvents(strapi);
  await seedPages(strapi);

  await store.set({ key: SEED_MARKER, value: true });
  strapi.log.info('✅ Playground demo data seeded successfully');
}

// ---------------------------------------------------------------------------
// Restaurants — demos the opening-hours plugin
// ---------------------------------------------------------------------------
async function seedRestaurants(strapi: Core.Strapi) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  await strapi.documents('api::restaurant.restaurant').create({
    data: {
      name: 'Le Petit Bistrot',
      description:
        'A cozy French bistrot in the heart of Paris, famous for its duck confit and seasonal tasting menus. Split lunch and dinner service.',
      cuisine: 'French',
      address: '12 Rue de Rivoli, 75004 Paris',
      phone: '+33 1 42 36 00 00',
      openingHours: {
        regularHours: days.map((day) => {
          if (day === 'Sunday') return { dayOfWeek: day, isOpen: false, timeSlots: [] };
          if (day === 'Saturday')
            return {
              dayOfWeek: day,
              isOpen: true,
              timeSlots: [{ opens: '12:00', closes: '23:00' }],
            };
          return {
            dayOfWeek: day,
            isOpen: true,
            timeSlots: [
              { opens: '12:00', closes: '14:30' },
              { opens: '19:00', closes: '22:30' },
            ],
          };
        }),
        specialHours: [
          {
            label: 'Bastille Day',
            validFrom: '2026-07-14',
            validThrough: '2026-07-14',
            isOpen: true,
            timeSlots: [{ opens: '19:00', closes: '23:59' }],
          },
          {
            label: 'Christmas Day',
            validFrom: '2026-12-25',
            validThrough: '2026-12-25',
            isOpen: false,
            timeSlots: [],
          },
        ],
      },
    },
    status: 'published',
  });

  await strapi.documents('api::restaurant.restaurant').create({
    data: {
      name: 'Sakura Ramen House',
      description:
        'Authentic Japanese ramen and izakaya dishes. Open every day with extended weekend hours.',
      cuisine: 'Japanese',
      address: '45 Rue Sainte-Anne, 75001 Paris',
      phone: '+33 1 47 03 38 59',
      openingHours: {
        regularHours: days.map((day) => {
          if (day === 'Saturday' || day === 'Sunday')
            return {
              dayOfWeek: day,
              isOpen: true,
              timeSlots: [{ opens: '11:30', closes: '23:00' }],
            };
          return {
            dayOfWeek: day,
            isOpen: true,
            timeSlots: [{ opens: '11:30', closes: '22:00' }],
          };
        }),
        specialHours: [
          {
            label: 'New Year',
            validFrom: '2027-01-01',
            validThrough: '2027-01-02',
            isOpen: false,
            timeSlots: [],
          },
        ],
      },
    },
    status: 'published',
  });
}

// ---------------------------------------------------------------------------
// Events — demos the rrule plugin
// ---------------------------------------------------------------------------
async function seedEvents(strapi: Core.Strapi) {
  // Weekly: Frontend Guild every Wednesday
  await strapi.documents('api::event.event').create({
    data: {
      title: 'Frontend Guild Weekly',
      description:
        'Weekly knowledge-sharing session for frontend engineers. Lightning talks, code reviews, and new library demos.',
      category: 'Meetup',
      location: 'Online (Google Meet)',
      recurrence: {
        freq: 2,
        interval: 1,
        byweekday: [2],
        dtstart: '2026-03-04T10:00:00Z',
        tzid: 'Europe/Paris',
        rruleString: 'FREQ=WEEKLY;INTERVAL=1;BYDAY=WE',
      },
    },
    status: 'published',
  });

  // Monthly: Strapi Contributors Meetup on the first Thursday
  await strapi.documents('api::event.event').create({
    data: {
      title: 'Strapi Contributors Meetup',
      description:
        'Monthly gathering of Strapi open-source contributors. Roadmap discussions, plugin showcases, and community Q&A.',
      category: 'Conference',
      location: 'Station F, Paris',
      recurrence: {
        freq: 1,
        interval: 1,
        byweekday: [3],
        bysetpos: [1],
        dtstart: '2026-03-05T18:30:00Z',
        count: 12,
        tzid: 'Europe/Paris',
        rruleString: 'FREQ=MONTHLY;INTERVAL=1;BYDAY=TH;BYSETPOS=1;COUNT=12',
      },
    },
    status: 'published',
  });

  // Yearly: Annual Tech Summit
  await strapi.documents('api::event.event').create({
    data: {
      title: 'Annual Tech Summit',
      description:
        'Full-day conference featuring talks on headless CMS, API design, and developer tooling. Workshops included.',
      category: 'Conference',
      location: 'Palais des Congrès, Paris',
      recurrence: {
        freq: 0,
        interval: 1,
        bymonth: [9],
        bymonthday: [15],
        dtstart: '2026-09-15T09:00:00Z',
        tzid: 'Europe/Paris',
        rruleString: 'FREQ=YEARLY;INTERVAL=1;BYMONTH=9;BYMONTHDAY=15',
      },
    },
    status: 'published',
  });
}

// ---------------------------------------------------------------------------
// Pages — demos component-usage plugin (nested components)
// ---------------------------------------------------------------------------
async function seedPages(strapi: Core.Strapi) {
  await strapi.documents('api::page.page').create({
    data: {
      title: 'Home',
      slug: 'home',
      hero: {
        heading: 'Welcome to the Strapi Playground',
        subheading:
          'Explore plugin demos for opening hours, recurrence rules, and component usage tracking — all powered by Strapi v5.',
        cta: {
          label: 'Browse Plugins',
          url: '/plugins',
          variant: 'primary',
        },
      },
      cards: [
        {
          title: 'Opening Hours Plugin',
          description:
            'Manage weekly schedules, split shifts, and holiday overrides with a Schema.org-compatible custom field.',
          button: { label: 'View Demo', url: '/restaurants', variant: 'secondary' },
        },
        {
          title: 'RRule Plugin',
          description:
            'Define complex recurrence rules (RFC 5545) for events — daily, weekly, monthly, or yearly patterns.',
          button: { label: 'View Demo', url: '/events', variant: 'secondary' },
        },
        {
          title: 'Component Usage Plugin',
          description:
            'Visualize which components are used across your content types and spot unused or orphaned components.',
          button: { label: 'View Dashboard', url: '/admin/plugins/component-usage', variant: 'outline' },
        },
      ],
      testimonials: [
        {
          author: 'Alice Martin',
          quote: 'The opening hours plugin saved us hours of custom development. The split-shift support is exactly what we needed for our restaurant clients.',
          rating: 5,
        },
        {
          author: 'Bob Chen',
          quote: 'Recurrence rules were always painful to implement. This plugin makes it a breeze with the visual editor and RFC 5545 output.',
          rating: 5,
        },
        {
          author: 'Clara Dupont',
          quote: 'Component usage tracking helped us clean up 12 unused components we had accumulated over months of development.',
          rating: 4,
        },
      ],
    },
    status: 'published',
  });

  await strapi.documents('api::page.page').create({
    data: {
      title: 'About',
      slug: 'about',
      hero: {
        heading: 'About This Playground',
        subheading:
          'This repository is a ready-to-run Strapi v5 project showcasing plugins built by Opkod France. Clone it, start it, and explore.',
        cta: {
          label: 'GitHub Repository',
          url: 'https://github.com/opkod-france/strapi-v5-playground',
          variant: 'primary',
        },
      },
      cards: [
        {
          title: 'Open Source',
          description: 'All plugins are MIT-licensed and open for contributions. Found a bug? Open an issue or submit a PR.',
          button: { label: 'Contribute', url: 'https://github.com/opkod-france', variant: 'primary' },
        },
        {
          title: 'Production Ready',
          description: 'Every plugin is tested, typed, and follows Strapi v5 conventions. Ready for production use.',
          button: { label: 'npm Packages', url: 'https://www.npmjs.com/org/opkod-france', variant: 'secondary' },
        },
      ],
      testimonials: [
        {
          author: 'David Moreau',
          quote: 'We deployed the opening hours plugin to production within an hour. The documentation and data format are top-notch.',
          rating: 5,
        },
        {
          author: 'Emma Leroy',
          quote: 'Finally a component usage dashboard that shows exactly which content types depend on which components. Essential for large projects.',
          rating: 4,
        },
      ],
    },
    status: 'published',
  });
}
