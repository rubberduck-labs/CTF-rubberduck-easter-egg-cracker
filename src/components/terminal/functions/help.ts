import { TerminalRunner } from "../Terminal";

const runner: TerminalRunner = async (context, println, prompt) => {
  const helpResponse = await fetch(`/api/command_line/help`);
  if (helpResponse.ok) {
    await println(await helpResponse.text());
  } else {
    await println('<span class="invalid">failed to call command</span>');
  }
};

export default runner;