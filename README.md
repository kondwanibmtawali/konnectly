#  Development Environment & Technology Stack

Konnectly is built as a full-stack web application using a modern frontend–backend architecture. The project leverages a combination of development tools, backend frameworks, frontend libraries, and data visualization technologies to support data-driven exploration of African investment opportunities.

---

##  Development Environment

### Visual Studio Code (VS Code)
Visual Studio Code is the primary source code editor and integrated development environment (IDE) used for writing, debugging, and managing both frontend and backend code. Its extension ecosystem and debugging tools facilitate efficient development across the project.

### Ubuntu (Command Line Interface)
Ubuntu is the Linux-based operating system environment used for development and execution. Accessed via the command line, it enables efficient package management, server control, and compatibility with backend technologies such as Django and PostgreSQL.

---

##  Backend Technologies

### Django REST Framework (DRF)
Django REST Framework is used to design and expose RESTful APIs that serve structured JSON data to the frontend. It acts as the core of the backend, handling data serialization, API endpoint creation, and communication between the server and client layers.

### CORS Headers (Cross-Origin Resource Sharing)
CORS headers are a web security mechanism that controls communication between different domains or ports. Since Konnectly’s frontend and backend are developed as separate services, CORS configuration enables the React application to safely request data from the backend API.

### PostgreSQL
PostgreSQL is a relational database management system that supports complex queries, data integrity, and scalability. While PostgreSQL was configured during development, it currently has limited utility given the project’s scope. However, it provides a scalable foundation for future expansions of Konnectly that may require persistent data storage.

### Python Virtual Environment (UV)
A Python virtual environment managed with UV is used to isolate project-specific Python dependencies. This ensures consistency across backend packages without interfering with system-wide installations, supporting dependency version control and long-term maintainability.

---

##  Frontend Technologies

### React
React is a JavaScript frontend library used for building user interfaces through reusable components and state management. It enables Konnectly to dynamically render data-driven views in response to user interaction.

### Grok-4 & OpenAI
Used together to give your React app AI-generated investment analysis based on country-level economic data

### Vite
Vite serves as the frontend build tool and development server. It provides instant feedback during development through fast module bundling and hot reloading, eliminating the need for full page or server reloads and enabling a smooth development experience when combined with React.

### D3-Geo
D3-Geo is a JavaScript data visualization library specializing in geographic projections and spatial rendering. Konnectly uses D3-Geo to render an interactive map of African countries, associate economic and investment data with geographic regions, and provide visual context for country-level analysis.

---

##  Data Fetching & State Management

### TanStack React Query
TanStack React Query is a data-fetching and server-state management library for React applications. It handles asynchronous API requests, caching, background updates, and request synchronization. In Konnectly, React Query manages communication with the Django backend, tracks loading and error states, and improves performance by reducing redundant network requests.

### Axios
Axios is a JavaScript HTTP client library used for making asynchronous requests to external APIs. While it overlaps in functionality with React Query, Axios excels in request handling and error management across the client–server boundary and integrates seamlessly with the data-fetching workflow.

---

##  Package Management

### Node Package Manager (NPM)
Node Package Manager (NPM) is used to install, update, and manage frontend JavaScript dependencies. All required libraries are stored in the `node_modules` directory, ensuring consistent dependency management and reproducible builds across development environments.

---

##  System Overview

Collectively, these technologies form a modular full-stack architecture:
- **Frontend:** React, Vite, D3-Geo, React Query, Axios, OpenAI API, Grok-4(xAI API)
- **Backend:** Django REST Framework, PostgreSQL, Python Virtual Environment  
- **Tooling & Infrastructure:** VS Code, Ubuntu, NPM, CORS headers  

This stack enables Konnectly to retrieve, process, and visualize complex economic data while delivering an accessible and interactive user experience.

## Documentation Used in Dev

- **Vite Documentation:** Explained how the project’s development server, build pipeline, and asset handling work, enabling fast iteration and correct importing of static files like GeoJSON 
--> [https://vite.dev/guide/]

- **D3-Geo:** Documents the geographic projection utilities used to convert GeoJSON data into SVG paths for rendering the interactive map. 
--> [https://d3js.org/d3-geo, https://github.com/d3/d3-geo]

- **MDN Web Docs:** Provides authoritative references for core web APIs and JavaScript features used throughout the project, such as DOM manipulation and SVG handling. Describes iteration over arrays, used to loop through GeoJSON features when generating the map. Documents how to correctly create SVG elements in the DOM, which is required for dynamically rendering map paths. 
--> [https://developer.mozilla.org/en-US/]
--> [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach]
--> [https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS]


- **React API Reference:** Describes core React concepts like components, hooks, and rendering behavior that form the foundation of the application’s structure
--> [https://react.dev/reference/react]

- **React Router:** Explains how route changes and URL state can be observed, which helps manage navigation-driven UI updates. Explains how dynamic route parameters are accessed, enabling country-specific pages. Describes programmatic navigation, used to transition from the map to a country detail route on click. 
--> [https://reactrouter.com/en/main/hooks/use-location] 
--> [https://reactrouter.com/en/main/hooks/use-params] 
--> [https://reactrouter.com/en/main/hooks/use-navigate]

- **Vite Assets Guide:** Explains how static assets such as GeoJSON files can be imported and bundled, enabling the map data to be loaded correctly 
--> [https://vitejs.dev/guide/assets.html]

- **REACT:** Describes state management for functional components, used to track selected countries and loading states. Explains memoizing functions to prevent unnecessary re-renders and repeated side effects, relevant for stabilizing handlers and hooks. 
--> [https://react.dev/reference/react/useState, https://react.dev/reference/react/useCallback]

- **React Custom Hooks:** Describes patterns for extracting reusable logic, applied to the custom hooks that fetch country data.
--> [https://react.dev/reference/react/useCustomHook?referrer=grok.com]

- **Open AI JS Library:** Provides guidance on integrating OpenAI’s JavaScript SDK, relevant to understanding external API usage patterns.
--> [https://openai.com/docs/libraries/javascript]

- **Open AI Chat API Referencing:** Documents the structure and usage of chat-based API calls, serving as a reference for conversational AI integration concepts.
--> [https://platform.openai.com/docs/api-reference/chat/create]

- **Prompt Engineering:** Document providing suggestive implementations for enhanced prompt responses to LLM's.
--> [https://platform.openai.com/docs/guides/prompt-engineering]
