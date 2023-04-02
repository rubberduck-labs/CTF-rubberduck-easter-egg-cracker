import type { VercelRequest, VercelResponse } from '@vercel/node';

const help = `
<span>rbdck command shell v1.0. valid commands:</span><br>
<div style="display:flex; flex-direction: column">
  <div style="display: flex; justify-content: space-between;">
    <span>cat</span>
    <div style="display:flex; flex-direction: column; align-items: end;">
      <span> - display the content of a file</span>
      <span class="unimportant">example: cat /some_folder/some.file</span>
    </div>
  </div>
  <div style="display: flex; justify-content: space-between;">
    <span>cd</span>
    <div style="display:flex; flex-direction: column; align-items: end;">
      <span> - change directory</span>
      <span class="unimportant">example: cd some_folder/../some_folder</span>
    </div>
  </div>
  <div style="display: flex; justify-content: space-between;">
    <span>ls</span>
    <div style="display:flex; flex-direction: column; align-items: end;">
      <span> - list all files in the specified folder</span>
      <span class="unimportant">example: ls /some_folder/another_folder</span>
    </div>
  </div>
  <div style="display: flex; justify-content: space-between;">
    <span>render</span>
    <div style="display:flex; flex-direction: column; align-items: end;">
      <span> - render specified image in terminal</span>
      <span class="unimportant">example: render /some_folder/image.jpeg</span>
    </div>
  </div>
  <div style="display: flex; justify-content: space-between;">
    <span>clear</span>
    <div style="display:flex; flex-direction: column; align-items: end;">
      <span> - clears the terminal window</span>
      <span class="unimportant">example: clear</span>
    </div>
  </div>
  <div style="display: flex; justify-content: space-between;">
    <span>help</span>
    <div style="display:flex; flex-direction: column; align-items: end;">
      <span> - prints this help message</spwebpan>
      <span class="unimportant">example: help</span>
    </div>
  </div>
</div>
`;

export default async function(req: VercelRequest, res: VercelResponse) {
  return res.send(help);
}