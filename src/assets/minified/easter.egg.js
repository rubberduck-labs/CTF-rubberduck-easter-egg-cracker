function _0xe90f(_0x3c1063, _0x5cf6b4) {
  const _0x23c61f = _0x23c6();
  return _0xe90f = function (_0xe90fca, _0x483aa6) {
    _0xe90fca = _0xe90fca - 438;
    let _0x2893e8 = _0x23c61f[_0xe90fca];
    return _0x2893e8;
  }, _0xe90f(_0x3c1063, _0x5cf6b4);
}
const _0x3c6f20 = _0xe90f;
(function (_0x74ea5a, _0x3b4905) {
  const _0x1836b2 = _0xe90f, _0x2b06f0 = _0x74ea5a();
  while (true) {
    try {
      const _0x4e671c = -parseInt(_0x1836b2(456)) / 1 * (parseInt(_0x1836b2(438)) / 2) + parseInt(_0x1836b2(439)) / 3 * (-parseInt(_0x1836b2(457)) / 4) + parseInt(_0x1836b2(446)) / 5 + parseInt(_0x1836b2(443)) / 6 + -parseInt(_0x1836b2(453)) / 7 + parseInt(_0x1836b2(447)) / 8 + -parseInt(_0x1836b2(450)) / 9 * (-parseInt(_0x1836b2(458)) / 10);
      if (_0x4e671c === _0x3b4905) break; else _0x2b06f0.push(_0x2b06f0.shift());
    } catch (_0x1a6fcd) {
      _0x2b06f0.push(_0x2b06f0.shift());
    }
  }
}(_0x23c6, 704250));
function _0x23c6() {
  const _0x44cf15 = ["clear", "7339944wFSEZW", "addEventListener", "seek-command", "4000020oiaeLG", "8907936wDgmRE", '<span class="invalid">failed to call command</span>', "run", "1718613oDrZED", "then", "/api/command_line/render?param=", "8954540kpGAcq", "commands", "text", "3xtEOVX", "4qPxxXr", "20DYgDKW", "726502CWoRyk", "1336533mBEvSF", "/api/command_line/cat?param=", "stopPropagation"];
  _0x23c6 = function () {
    return _0x44cf15;
  };
  return _0x23c6();
}
let currentPath = "./";
const recognizedCommands = {ls: _0x4fd252 => fetch("/api/command_line/ls?param=" + (currentPath + (_0x4fd252 || "")))[_0x3c6f20(451)](_0x28c268 => _0x28c268.ok ? _0x28c268[_0x3c6f20(455)]() : '<span class="invalid">failed to call command</span>'), help: _0x57eccf => fetch("/api/command_line/help?param=" + (_0x57eccf || ""))[_0x3c6f20(451)](_0x4dfbee => _0x4dfbee.ok ? _0x4dfbee[_0x3c6f20(455)]() : _0x3c6f20(448)), cat: _0x477e0a => fetch(_0x3c6f20(440) + (currentPath + (_0x477e0a || "")))[_0x3c6f20(451)](_0x55ebfe => _0x55ebfe.ok ? _0x55ebfe[_0x3c6f20(455)]() : '<span class="invalid">failed to call command</span>'), render: _0x2c0283 => fetch(_0x3c6f20(452) + (currentPath + (_0x2c0283 || "")))[_0x3c6f20(451)](_0x3b6274 => _0x3b6274.ok ? _0x3b6274[_0x3c6f20(455)]() : _0x3c6f20(448))};
(function () {
  const _0x2869cd = _0x3c6f20;
  document.body[_0x2869cd(444)](_0x2869cd(445), _0x27db3d => {
    const _0x9ecbd1 = _0x2869cd, {command: _0x42828d, terminal: _0x2e0ea4} = _0x27db3d.detail, [_0x259c83, _0x29937e] = _0x42828d.split(" ");
    !!recognizedCommands[_0x259c83] && (_0x27db3d[_0x9ecbd1(441)](), _0x2e0ea4[_0x9ecbd1(449)] = async _0x18e788 => {
      const _0x1cfca1 = _0x18e788.getWriter();
      await _0x1cfca1(await recognizedCommands[_0x259c83](_0x29937e));
    }), _0x259c83 === _0x9ecbd1(442) && (_0x27db3d[_0x9ecbd1(441)](), _0x2e0ea4[_0x9ecbd1(454)].innerHTML = ""), _0x259c83 === "cd" && (_0x27db3d[_0x9ecbd1(441)](), currentPath += _0x29937e + "/");
  });
}());
