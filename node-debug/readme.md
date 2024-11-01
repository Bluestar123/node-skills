开启启动调试模式

- node --inspect-brk ./index.js
  换端口
- node --inspect-brk=8888 ./index.js

使用 chrome 调试 node 代码

- chrome://inspect/#devices

vscode 进行调试

```json
"request": "launch", // 直接启动一个进程进行调试
"request": "attach", // 附加到一个已经运行的进程进行调试
```
