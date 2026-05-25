# ⚽ FootballStats (ArgStats)

Una aplicación web desarrollada en React para visualizar estadísticas, posiciones, goleadores y detalles de equipos de las principales competiciones de fútbol en tiempo real. 

El proyecto destaca por una interfaz moderna en modo oscuro, navegación fluida entre rutas y consumo eficiente de APIs externas.

## 🚀 Características Principales

* **Explorador de Competiciones:** Selección de las principales ligas y torneos.
* **Tabla de Posiciones:** Clasificación actualizada con detalles de puntos, goles a favor/en contra y diferencia de gol.
* **Top Goleadores:** Visualización gráfica con barras de progreso relativas al máximo goleador del torneo.
* **Seguimiento de Partidos:** Panel de encuentros con indicadores de estado (En vivo, Finalizado, Programado).
* **Perfil de Equipos:** Vista detallada de cada club, incluyendo su información institucional, plantilla completa de jugadores y cronograma/historial de partidos.
* **Diseño Responsivo:** Interfaz adaptada a dispositivos móviles y de escritorio utilizando Tailwind CSS y CSS modular.

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React, React Router DOM (v6 para navegación y parámetros de ruta).
* **Estilos:** Tailwind CSS (para utilidades rápidas) y CSS puro (para componentes complejos como las barras de estadísticas y tarjetas de equipos).
* **Consumo de Datos:** Fetch API nativo interactuando con [Football-Data.org API](https://www.football-data.org/).
* **Herramientas de Construcción:** Vite (Entorno de desarrollo rápido).

## ⚙️ Instalación y Uso Local

Para correr este proyecto en tu entorno local, sigue estos pasos:

1. **Clona el repositorio:**
   ```bash
   git clone [https://github.com/agusgioia/FootballStats.git](https://github.com/agusgioia/FootballStats.git)
   cd FootballStats
2. **Instala las dependencias:**
   npm install
3.**Configura las variables de entorno:**
   VITE_API_KEY=tu_clave_api_aqui
4.**Inicia el servidor de desarrollo:**
   npm run dev

Próximas Mejoras
[ ] Implementar caché local (localStorage o React Query) para mitigar los límites de cuota (Rate Limit 429) de la API gratuita.

[ ] Agregar animaciones de transición entre rutas.

[ ] Incluir un buscador global de equipos o jugadores.
