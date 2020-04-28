### git 常用指令

git config --global user.name #用户名
git config --global user.email #用户邮箱
git config --list #查看用户信息
git add [path］ #会把对应目录或文件，添加到 stage 状态
git add . #会把当前所有的 untrack files 和 changed but not updated 添加到 stage 状态
git commit –m “XXXX” #提交修改,添加注释
git status 查看当前代码库的状态
git log
git branch 查看本地分支
git branch -a 查看所有分支即本地分支和远程分支
git branch -r 查看远程分支
git reset --hard a7e1d279 回退版本，a7e1d279 为那一串版本号的前几个
git branch –d AAA #删除分支 AAA

### GIT 版本回退到某个版本并提交到远程仓库

git reset --hard a7e1d279
git rev-parse HEAD
git push -f

### GIT 取消合并分支
git merge --abort

### GIT 有时候获取不到最新分支需要重新 执行 git fetch 指令重新拉去分支代码