alias bp='run'

origin="TBD"
folder="$ZSH/plugins/bundlephobia-cli"

function run {
    if [ "$1" = "install" ]; then
        yarn install --modules-folder $folder
    elif [ "$1" = "upgrade" ]; then
        git clone $origin $folder && controller install
    else
        node $folder $@
    fi
}
