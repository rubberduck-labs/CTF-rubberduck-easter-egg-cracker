import { TerminalCommandSeek } from "../Terminal";

import help from "./help";
import ls from "./ls";
import clear from "./clear";

const commands = {
  'help': help,
  'ls': ls,
  'clear': clear
};

// Register global event listener for runner functions
(async function () {
  document.body.addEventListener('seek-command', async (event: CustomEvent<TerminalCommandSeek>) => {
    const { command: commandAndParam, terminal } = event.detail;
    const [ command, param ] = commandAndParam.split(' ');

    if (!!commands[command]) {
      event.stopPropagation();
      terminal.run = commands[command];
    }
  });
})();