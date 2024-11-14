## submodule 能保留独立性

- git submodule add https://github.com/Bluestar123/day-blog.git child
  在当前 git 仓库下引入 其他git仓库

submdule 是独立的 ，可以 add commit push

父项目只是记录了 gitmodules 的 url 和它最新的 commit

## 其他地方拉项目

- git clone xxx xxx

- git submodule update --init
  或者两步执行
- git submodule init
  git submodule update

- 如果项目依赖多层module，递归执行
  git submodule update --init --recursive
