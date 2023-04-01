const legalCommands = ['ls', 'help'];

(function () {
  document.body.addEventListener('seek-command', (event) => {
    const { command, terminal } = event.detail;

    if (legalCommands.includes(command)) {
      event.stopPropagation();

      terminal.run = async (context) => {
        const println = context.getWriter();
        const response = await fetch(`/api/command_line?command=${command}`)
          .then(response => response.text());
        
        await println(response);
      };
    }

    if (command === 'clear') {
      event.stopPropagation();
      terminal.commands.innerHTML = '';
    }
  })
})();