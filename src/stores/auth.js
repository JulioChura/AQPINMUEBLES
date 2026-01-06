import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogged: false,
    user: null,
  }),

  actions: {
    // --- LOGIN NORMAL ---
    async login(email, password) {
      try {
        console.log("Iniciando login para:", email);
        const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);
          localStorage.setItem("user_info", JSON.stringify(data.user));
          this.user = data.user;
          this.isLogged = true;
          return { success: true };
        } else {
          return { success: false, message: "Credenciales incorrectas" };
        }
      } catch (error) {
        console.error("  Error al iniciar sesión:", error);
        return { success: false, message: "Error de conexión" };
      }
    },
    // --- LOGIN CON GOOGLE ---
    async googleLogin(id_token) {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/auth/google-login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_token }),
        });

        const data = await res.json();

        if (data.access) {
          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);
          localStorage.setItem("user_info", JSON.stringify(data.user));
          this.user = data.user;
          this.isLogged = true;
          return { success: true };
        } else {
          return { success: false, message: "Error en el login con Google" };
        }
      } catch (err) {
        console.error("  Error en login Google:", err);
        return { success: false, message: "Error de conexión" };
      }
    },
    // 🔹 Cierra sesión completa (incluye llamada al backend)
    async logout() {
      try {
        const refreshToken = localStorage.getItem('refresh_token')
        const accessToken = localStorage.getItem('access_token')

        if (refreshToken && accessToken) {
          const res = await fetch('http://127.0.0.1:8000/api/auth/logout/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ refresh: refreshToken }),
          })

          if (res.ok) {
            console.log('  Logout exitoso en el backend')
          } else {
            console.warn('⚠️ El backend respondió:', res.status, res.statusText)
          }
        }
      } catch (error) {
        console.error('  Error al cerrar sesión:', error)
      } finally {
        // 🔹 Limpia almacenamiento local
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user_info')

        // 🔹 Actualiza estado global
        this.isLogged = false
        this.user = null

        alert('Sesión cerrada desde el auth')
      }
    },
    // --- REGISTRAR PROPIETARIO ---
    async registerOwner(ownerData) {
      const token = localStorage.getItem("access_token");

      if (!token) {
        alert("⚠️ Debes iniciar sesión antes de registrar tu perfil de propietario.");
        return { success: false, redirect: true };
      }

      try {
        const res = await fetch("http://127.0.0.1:8000/api/auth/register-owner/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(ownerData),
        });

        const data = await res.json();
        console.log("💡 Respuesta del backend:", data);

        if (res.ok) {
          alert("  Perfil de propietario creado exitosamente.");
          localStorage.setItem("user_info", JSON.stringify(data.user));
          return { success: true };
        } else {
          const msg = data.message || data.error || JSON.stringify(data);
          alert(`  Error al registrar propietario: ${msg}`);
          return { success: false };
        }
      } catch (err) {
        console.error("  Error al comunicarse con el servidor:", err);
        alert("Error de conexión con el servidor.");
        return { success: false };
      }
    },
     // --- REGISTRO DE ESTUDIANTE ---
    async registerStudent(payload) {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/auth/register-student/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        console.log("💡 Respuesta del backend:", data);

        if (res.ok) {
          return { success: true, message: "Registro exitoso. Ahora puedes iniciar sesión." };
        } else {
          return { success: false, message: data[0] || "Verifica los datos." };
        }
      } catch (err) {
        console.error("  Error en registro:", err);
        return { success: false, message: "Error al comunicarse con el servidor" };
      }
    },
    async updateUserInfo(payload) {
      const token = localStorage.getItem('access_token');
      if (!token) {
        alert("⚠️ No estás autenticado. Inicia sesión nuevamente.");
        return { success: false };
      }

      try {
        const res = await fetch("http://127.0.0.1:8000/api/auth/update-profile/", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        console.log("💡 Respuesta del backend (update):", data);

        if (res.ok) {
          // 🔹 Actualiza datos locales
          this.user = data;
          localStorage.setItem("user_info", JSON.stringify(data));
          alert("  Datos actualizados correctamente.");
          return { success: true, user: data };
        } else {
          const msg = data.detail || data.error || "Error al actualizar.";
          alert(`  ${msg}`);
          return { success: false };
        }
      } catch (err) {
        console.error("  Error al actualizar usuario:", err);
        alert("Error de conexión con el servidor.");
        return { success: false };
      }
    },
    // 🔹 Carga usuario almacenado al iniciar la app
    loadUser() {
      const storedUser = localStorage.getItem('user_info')
      if (storedUser) {
        this.user = JSON.parse(storedUser)
        this.isLogged = true
      }
    },
  },
})
