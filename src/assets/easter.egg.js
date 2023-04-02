const recognizedCommands = {
  ls: () => fetch(`/api/command_line/ls`)
    .then(response => response.ok ? response.text() : '<span class="invalid">failed to call command</span>'),
  help: () => fetch(`/api/command_line/help`)
    .then(response => response.ok ? response.text() : '<span class="invalid">failed to call command</span>')
};

(function () {
  document.body.addEventListener('seek-command', (event) => {
    const { command: commandAndParam, terminal } = event.detail;
    const [ command, param ] = commandAndParam.split(' ');

    if (!!recognizedCommands[command]) {
      event.stopPropagation();

      terminal.run = async (context) => {
        const println = context.getWriter();
        await println(await recognizedCommands[command](param));
      };
    }

    if (command === 'clear') {
      event.stopPropagation();
      terminal.commands.innerHTML = '';
    }
  })
})();