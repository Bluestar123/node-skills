# day-blog

use vitepress to record something

## subtree 添加项目

- git subtree add --prefix=git-subtree https://github.com/Bluestar123/day-blog.git main

## 更新 subtree

- git subtree pull --prefix=git-subtree https://github.com/Bluestar123/day-blog.git main

## 提交

可以设置别名 git remote add child-name https://github.com/Bluestar123/day-blog.git

- git subtree push --prefix=git-subtree child-name main

## subtree 不需要像 submodule 一样递归更新子项目。直接就可以拉下来
