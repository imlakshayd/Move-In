import { createContext, useContext, useState, useEffect } from "react";
import { loginApi, registerApi } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load from local storage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            try {
                setUser(JSON.parse(storedUser));
                // Also ensure legacy props for ProtectedRoute are still there if needed
                const parsedUser = JSON.parse(storedUser);
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("role", parsedUser.role);
            } catch (err) {
                // Handle malformed JSON
                logout();
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const data = await loginApi(email, password);
        const { token: jwt, user: userData } = data;

        // Save to state
        setToken(jwt);
        setUser(userData);

        // Save to localStorage
        localStorage.setItem("token", jwt);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", userData.role);

        return userData;
    };

    const register = async (payload) => {
        const data = await registerApi(payload);
        // Registration doesn't automatically login in this flow, they must login afterwards
        return data;
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");
        sessionStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
