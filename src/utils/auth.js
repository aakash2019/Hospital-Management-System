export const isAdminAuthenticated = () => {
    const token = localStorage.getItem('adminToken'); // Or use cookies
    return !!token; // Returns true if token exists
};