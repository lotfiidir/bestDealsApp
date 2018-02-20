import {AsyncStorage} from "react-native";

export const USER_KEY = "auth-demo-key";

export const onSignIn = (userData) => {
    AsyncStorage.setItem(USER_KEY, "true");
    AsyncStorage.setItem("token-user", userData.token);
    AsyncStorage.setItem("id-user", userData.user.id);
    AsyncStorage.setItem("name-user", userData.user.name);
    AsyncStorage.setItem("email-user", userData.user.email);
};

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(USER_KEY)
            .then(res => {
                if (res !== null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(err => reject(err));
    });
};