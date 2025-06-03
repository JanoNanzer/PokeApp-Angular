# PokeApp SPA - Challenge Técnico Frontend Angular

Aplicación web construida en Angular que consume la [PokeAPI](https://pokeapi.co/) para listar, buscar, filtrar y ver en detalle Pokémon. Desarrollado como parte de un challenge técnico para un puesto SSR/SR de Frontend Angular.

##  Features

- Listado de Pokémon con paginación
- Búsqueda por nombre
- Filtros por tipo
- Vista de detalle de cada Pokémon
- Manejo de estado con NgRx
- Arquitectura modular (`feature`, `shared`, `app`)
- UI responsive y accesible (con PrimeNG + ChartJs)

##  Tecnologías

- Angular 17
- NgRx Store & Effects
- RxJS
- PrimeNG
- Standalone Components
- TypeScript
- SCSS
  
##  Estructura de carpetas

```bash
src/
├── app/
│ ├── pokemon/
│ │ ├── components/ # Componentes reutilizables ( PokemonCard )
│ │ ├── models/ # Interfaces y tipos
│ │ ├── pages/ # Vistas: pokemon-list, pokemon-detail
│ │ ├── services/ # Servicio para consumir la PokeAPI
│ │ ├── store/ # NgRx: actions, effects, reducer, selectors
│ │ ├── pokemon.routes.ts # Rutas del feature
│ │ └── pokemon.module.ts # Módulo de la feature
│ ├── shared/ # Pipes, constantes, estilos y componentes compartidos
│ │ ├── shared.module.ts # Importa y exporta módulos comunes
│ ├── app.routes.ts
│ ├── app.config.ts
│ ├── app.component.ts/html/scss
│ └── app.module.ts # Módulo raíz
├── assets/
├── index.html
└── main.ts
```

#  Instalación y ejecución

```bash
# Clonar el repo
git clone https://github.com/tuusuario/nombre-del-repo.git

# Instalar dependencias
npm install

# Levantar el servidor de desarrollo
ng serve
```

##  Decisiones técnicas

- Implementé NgRx para el manejo de estado global, en este caso de los Pokémon y sus detalles
- Elegí mantener la arquitectura modularizada por feature, shared y app module. Permitiendo la modularización de componentes para facilitar la lectura y organización del proyecto.
- Integré PrimeNG para mejorar la experiencia de usuario y aportar soluciones actuales.
- Utilicé pipes y constantes centralizadas para manejar estilos, clases y datos a lo largo del proyecto.
