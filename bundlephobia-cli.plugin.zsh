alias bp='run'

local dir="$ZSH/plugins/bundlephobia-cli"
local repository="git@github.com:grimmbraten/bundlephobia-cli.git"

function run {
    if [ "$1" = "install" ]; then
        yarn --cwd $dir install
    elif [ "$1" = "update" ]; then
        git -C $dir pull && run install
    else
        if [ -z $(git status | grep 'branch is behind')]; then
            echo "Do you wish to update bundlephobiac-li?"
            select yn in "Yes" "No"; do
                case $yn in
                Yes)
                    run upgrade
                    break
                    ;;
                No) exit ;;
                esac
            done
        fi

        node $dir $@
    fi
}
