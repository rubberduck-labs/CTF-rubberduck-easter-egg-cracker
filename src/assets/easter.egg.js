let currentPath = './';

const recognizedCommands = {
  ls: (path) => fetch(`/api/command_line/ls?param=${currentPath + (path || '')}`)
    .then(response => response.ok ? response.text() : '<span class="invalid">failed to call command</span>'),
  help: (func) => fetch(`/api/command_line/help?param=${func || ''}`)
    .then(response => response.ok ? response.text() : '<span class="invalid">failed to call command</span>'),
  cat: (path) => fetch(`/api/command_line/cat?param=${currentPath + (path || '')}`)
    .then(response => response.ok ? response.text() : '<span class="invalid">failed to call command</span>'),
  render: (path) => fetch(`/api/command_line/render?param=${currentPath + (path || '')}`)
    .then(response => response.ok ? response.text() : '<span class="invalid">failed to call command</span>'),
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

    if (command === 'cd') {
      event.stopPropagation();
      currentPath += `${param}/`;
    }
  })
})();