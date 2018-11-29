import axios from "axios";

axios.defaults.withCredentials = true;

const WINDOW_USER_SCRIPT_VARIABLE = '__USER__';

export const loginUser = async (email, password) => {
    const { data } = await axios.post('/api/login', { email, password });

    if (typeof window !== 'undefined') {
        window[WINDOW_USER_SCRIPT_VARIABLE] = data || {};
    }
}

export const logOutUser = async () => {
    if (typeof window !== 'undefined') {
        window[WINDOW_USER_SCRIPT_VARIABLE] = {};
        await axios.post('/api/logout');
    }
}

export const getUserProfile = async () => {
    const { data } = await axios.get('/api/profile');
    return data;
}

export const authInitialProps = ({ req, res }, isProtectedRoute) => {
    const auth = req ? getServerSideToken(req) : getClientSideToken();
    const currentPath = req ? req.url : window.pathname;
    const user = auth.user;
    const isAnonimous = !user || user.type !== "authenticated";

    if (isProtectedRoute && isAnonimous && currentPath !== "/login") {
        return redirectUser(res, "/login");
    }

    return auth;
}

const redirectUser = (res, path) => {
    if (res) {
        res.redirect(302, path);
        res.finished = true;
        return {};
    }

    Router.replace(path);
    return {};
}

export const getServerSideToken = async (req) => {
    const { signedCookies = {} } = req;

    if (!signedCookies) {
        return {};
    } else if (!signedCookies.token) {
        return {};
    }

    return { user: signedCookies.token };
}

export const getClientSideToken = () => {
    if (typeof window !== 'undefined') {
        const user = window[WINDOW_USER_SCRIPT_VARIABLE] || {};
        return { user };
    }

    return { user: {} }
}

export const getUserScript = (user) => {
    return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)}`;
}


