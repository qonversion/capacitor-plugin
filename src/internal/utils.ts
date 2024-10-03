import {Capacitor} from "@capacitor/core";

export const isIos = (): boolean => {
    return Capacitor.getPlatform() === "ios"
};

export const isAndroid = (): boolean => {
    return Capacitor.getPlatform() === "android"
};
