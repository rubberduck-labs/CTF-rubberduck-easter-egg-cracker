import { TerminalRunner } from "../Terminal";

const runner: TerminalRunner = async (context, println, prompt) => {
  const lsResponse = await fetch(`/api/command_line/ls`);
  if (lsResponse.ok) {
    await println(await lsResponse.text());
  } else {
    await println('<span class="invalid">failed to call command</span>');
  }
};

export default runner;