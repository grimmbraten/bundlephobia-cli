alias bp='controller'

origin="TBD"
folder="$ZSH/plugins/bundlephobia-cli"

function controller {
    if [ "$1" = "install" ]; then
        yarn install --modules-folder $folder
    elif [ "$1" = "upgrade" ]; then
        git clone $origin $folder && controller install
    else
        node $folder $@
    fi
}
