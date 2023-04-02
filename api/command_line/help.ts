import type { VercelRequest, VercelResponse } from '@vercel/node';

const help = `
<span>rbdck command shell v1.0. valid commands:</span><br>
<div style="display:flex; flex-direction: column">
  <div style="display: flex; justify-content: space-between;">
    <span>ls</span>
    <div style="display:flex; flex-direction: column; align-items: end;">
      <span> - list all files in the specified folder</span>
    </div>
  </div>
  <div style="display: flex; justify-content: space-between;">
    <span>clear</span>
    <div style="display:flex; flex-direction: column; align-items: end;">
      <span> - clears the terminal window</span>
    </div>
  </div>
  <div style="display: flex; justify-content: space-between;">
    <span>help</span>
    <div style="display:flex; flex-direction: column; align-items: end;">
      <span> - prints this help message</span>
    </div>
  </div>
</div>
`;

export default async function(req: VercelRequest, res: VercelResponse) {
  return res.send(help);
}