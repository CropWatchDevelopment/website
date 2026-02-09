import { initBotId } from 'botid/client/core';
 
export function init() {
  initBotId({
    protect: [
      {
			path: '/contact',
			method: 'POST',
      },
    ],
  });
}