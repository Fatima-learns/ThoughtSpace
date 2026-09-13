import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(
      "thoughtspace_user"
    );

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "thoughtspace_user",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("thoughtspace_user");
    }
  }, [user]);

  function register(name, email, password) {
    const users =
      JSON.parse(
        localStorage.getItem("thoughtspace_users")
      ) || [];

    const existingUser = users.find(
      (item) =>
        item.email.toLowerCase() ===
        email.toLowerCase()
    );

    if (existingUser) {
      return {
        success: false,
        message: "User already exists.",
      };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    localStorage.setItem(
      "thoughtspace_users",
      JSON.stringify([...users, newUser])
    );

    setUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });

    return {
      success: true,
    };
  }

  function login(email, password) {
    const users =
      JSON.parse(
        localStorage.getItem("thoughtspace_users")
      ) || [];

    const foundUser = users.find(
      (item) =>
        item.email.toLowerCase() ===
          email.toLowerCase() &&
        item.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    setUser({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    });

    return {
      success: true,
    };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;