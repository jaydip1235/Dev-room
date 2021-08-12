export const isLoggedIn = () => {
    return !!localStorage.getItem('react-social-token');
}

export const getToken = () => {
    return localStorage.getItem('react-social-token');
};
