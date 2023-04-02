import { TerminalRunner } from "../Terminal";

const runner: TerminalRunner = async (context, println, prompt) => {
  context.commands.innerHTML = '';
};

export default runner;