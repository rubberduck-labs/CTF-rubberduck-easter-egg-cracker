import { Router } from '@vaadin/router';
import './App'; // Adding the lit-app component here for better performance

const routes = [
  {
    path: '/',
    component: 'x-app',
    children: [
      {
        path: '',
        component: 'x-index-page',
        action: async () => {
          await import('./pages/IndexPage');
        },
      },
      {
        path: '/crack',
        component: 'x-crack-page',
        action: async () => {
          await import('./pages/CrackPage');
        }
      }
    ]
  },
];

export const router = new Router(document.getElementById('outlet'));
router.setRoutes(routes);