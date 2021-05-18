alias bp='run'

local dir="$ZSH/plugins/bundlephobia-cli"
local repository="git@github.com:grimmbraten/bundlephobia-cli.git"

function run {
    if [ "$1" = "install" ]; then
        yarn --cwd $dir install
    elif [ "$1" = "update" ]; then
        git clone $repository $dir && run install
    else
        node $folder $@
    fi
}
