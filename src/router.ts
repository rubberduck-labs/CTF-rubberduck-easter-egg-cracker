import { Router } from '@vaadin/router';
import spawnModal from './common/Modal';
import spawnMessage, { MessageType } from './common/Message';
// import { dbConnect } from './util/Supabase';
import './App'; // Adding the lit-app component here for better performance

// function setCookie(name: string, value: string = '', ttlSeconds: number) {
//   let expires = new Date(new Date().getTime() + (ttlSeconds*1000));
//   document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
// }

// async function checkForLogin() {
//   const hashValues = window.location.hash.substring(1)
//     .split('&')
//     .reduce((acc, cur) => {
//       const [key, value] = cur.split('=');
//       return { ...acc, [key]: value };
//     }, {});

//   if (!!hashValues['access_token'] && !!hashValues['expires_in']) {
//     await dbConnect().auth
//       .setSession({ access_token: hashValues['access_token'], refresh_token: hashValues['refresh_token'] })
//       .then(({ error }) => { if (!!error) throw error.message });
//   }

//   await dbConnect().auth
//     .getSession()
//     .then(({ data }) => {
//       if (!!data?.session?.access_token) {
//         setCookie('supa_login', data.session.access_token, 120000);
//         spawnMessage(`Logget inn som ${data.session.user?.email}`, MessageType.INFO);
//       }
//     });
// }

const routes = [
  {
    path: '/',
    component: 'x-app',
    children: [
      {
        path: '',
        component: 'x-index-page',
        action: async () => {
          // await checkForLogin();
          await import('./pages/IndexPage');
        },
      },
      {
        path: '/login',
        component: 'x-index-page',
        action: async () => {
          // await checkForLogin();
          await import('./pages/IndexPage');
          spawnModal((await import('./components/modals/LoginTerminal')).LoginTerminal);
        }
      },
      {
        path: '/crack',
        component: 'x-crack-page',
        action: async () => {
          // await checkForLogin();
          await import('./pages/CrackPage');
        }
      },
      {
        path: '/reward',
        component: 'x-reward-page',
        action: async () => {
          // await checkForLogin();
          await import('./pages/RewardPage');
        }
      }
    ]
  },
];

export const router = new Router(document.getElementById('outlet'));
router.setRoutes(routes);