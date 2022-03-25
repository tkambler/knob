#!/usr/bin/env bash

{ # this ensures the entire script is downloaded #

set -e

KNOB_VERSION='v0.0.4'

has_wget() {
    if [ $(type -P wget) ]; then
        echo "1"
    else
        echo "0"
    fi
}

has_curl() {
    if [ $(type -P curl) ]; then
        echo "1"
    else
        echo "0"
    fi
}

is_root() {
    if [[ "$EUID" = 0 ]]; then
        echo 1
    else
        echo 0
    fi
}

dl_wget() {
    wget --quiet --show-progress https://github.com/tkambler/knob/releases/download/$KNOB_VERSION/knob-macos-x64 -O /tmp/knob
    chmod +x /tmp/knob
}

dl_curl() {
    curl --silent --progress-bar -o /tmp/knob https://github.com/tkambler/knob/releases/download/$KNOB_VERSION/knob-macos-x64
}

dl_knob() {
    if [ $(has_wget) == "1" ]
    then
        dl_wget
    elif [ $(has_curl) == "1" ]
    then
        dl_curl
    else
        echo "Error: Unable to find wget or curl executable"
        exit 1
    fi
}

set_perms() {
    chmod +x /tmp/knob
}

move_bin() {
    if [ $(is_root) == "1" ]; then
        mv /tmp/knob /usr/local/bin/knob
    else
        echo "Moving knob to: /usr/local/bin/knob"
        sudo mv /tmp/knob /usr/local/bin/knob
    fi
}

on_success() {
    local NEW_KNOB_VERSION
    NEW_KNOB_VERSION=$(knob -v)
    echo "Knob has been saved to: /usr/local/bin/knob"
    echo "Version: $NEW_KNOB_VERSION"
}

knob_do_install() {
    dl_knob
    set_perms
    move_bin
    on_success
    knob_reset
}

knob_reset() {
    unset -f has_wget has_curl is_root dl_wget dl_curl dl_knob set_perms move_bin on_success knob_do_install knob_reset
    unset -v KNOB_VERSION
}

knob_do_install

} # this ensures the entire script is downloaded #
