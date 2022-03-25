#!/usr/bin/env bash

{ # this ensures the entire script is downloaded #

set -e

KNOB_VERSION='v0.0.5'

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

is_x64arch() {
    local HARDWARE_NAME
    HARDWARE_NAME=$(uname -m)
    if [[ $HARDWARE_NAME == *"x86_64"* ]]; then
        echo "1"
    else
        echo "0"
    fi
}

get_platform() {
    local unameOut
    unameOut="$(uname -s)"
    case "${unameOut}" in
        Linux*)     machine=Linux;;
        Darwin*)    machine=Mac;;
        *)          machine="UNKNOWN:${unameOut}"
    esac
    echo ${machine}
}

get_bin() {
    local PLATFORM
    local IS_X64
    PLATFORM=$(get_platform)
    IS_X64=$(is_x64arch)
    if [ $PLATFORM == "Mac" ]
    then
        if [ $IS_X64 == "1" ]; then
            echo "knob-macos-x64"
        else
            echo "The install script only supports x64 architecture at this time. A PR that fixes this would be welcome."
            knob_reset
            exit 1
        fi
    elif [ $PLATFORM == "Linux" ]
    then
        echo "knob-linux-x64"
    else
        echo "This script does not support platform: $PLATFORM"
        knob_reset
        exit 1
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
    local KNOB_BIN
    KNOB_BIN=$(get_bin)
    wget --quiet --show-progress https://github.com/tkambler/knob/releases/download/$KNOB_VERSION/${KNOB_BIN} -O /tmp/knob
    chmod +x /tmp/knob
}

dl_curl() {
    local KNOB_BIN
    KNOB_BIN=$(get_bin)
    curl --silent --progress-bar -o /tmp/knob https://github.com/tkambler/knob/releases/download/$KNOB_VERSION/${KNOB_BIN}
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
        knob_reset
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
    unset -f has_wget has_curl is_root dl_wget dl_curl dl_knob set_perms move_bin on_success knob_do_install get_platform get_bin is_x64arch knob_reset
    unset -v KNOB_VERSION
}

knob_do_install

} # this ensures the entire script is downloaded #
