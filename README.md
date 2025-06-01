# 🎯 API Versioning con NestJS

Este proyecto demuestra cómo implementar distintos tipos de versionado en una API construida con NestJS, utilizando los mecanismos incorporados como URI, Header, Media-Type y Custom.

---

## 📋 Tabla de Contenidos

- [Objetivo del Proyecto](#-objetivo-del-proyecto)
- [Tecnologías Usadas](#-tecnologías-usadas)
- [Tipos de Versionado](#-tipos-de-versionado)
- [Cuándo y Qué Tipo de Versionado Usar](#-cuándo-y-qué-tipo-de-versionado-usar)
- [Instalación](#-instalación)
- [Ejecutar el Proyecto](#-ejecutar-el-proyecto)
- [Ejecutar los Tests](#-ejecutar-los-tests)
- [Licencia](#-licencia)

---

## 📌 Objetivo del Proyecto

Explorar cómo aplicar distintas estrategias de versionado en APIs con NestJS. Cada módulo expone endpoints versionados por:

- URI (e.g., `/v1/hello`)
- Encabezado (e.g., `X-API-Version: 1`)
- Tipo de medio (e.g., `Accept: application/json;v=1`)
- Custom extractor (`X-Custom-Version`)

Ideal para entender cómo responder de forma organizada a múltiples versiones de una misma API.

---

## 📦 Tecnologías Usadas

- [NestJS](https://nestjs.com/) como framework principal
- [Jest](https://jestjs.io/) para testing
- [Supertest](https://github.com/visionmedia/supertest) para tests E2E

---

## 🗂️️ Tipos de Versionado

### 1. Versionado por URI

```ts
app.enableVersioning({
  type: VersioningType.URI,
});
```
Petición:
```
GET /v1/hello
```

---

### 2. Versionado por Header

```ts
app.enableVersioning({
  type: VersioningType.HEADER,
  header: 'X-API-Version',
});
```
Petición:
```
GET /hello
Header: X-API-Version: 1
```

---

### 3. Versionado por Media Type

```ts
app.enableVersioning({
  type: VersioningType.MEDIA_TYPE,
  key: 'v=',
});
```
Petición:
```
GET /hello
Header: Accept: application/json;v=1
```

---

### 4. Versionado Personalizado

```ts
app.enableVersioning({
  type: VersioningType.CUSTOM,
  extractor: (req) => req.headers['x-custom-version'] || '1',
});
```
Petición:
```
GET /hello
Header: X-Custom-Version: 1
```

---

## 🧭 Cuándo y Qué Tipo de Versionado Usar

El versionado de una API se vuelve necesario cuando realizas cambios que no son compatibles con versiones anteriores, como:

- Eliminación o modificación de endpoints existentes.
- Cambios en el contrato (inputs/outputs).
- Reestructuración de recursos o rutas.
- Alteraciones en el comportamiento de negocio.

A continuación, se describen los tipos de versionado soportados y cuándo es más conveniente usarlos:

### 1. **Versionado por URI** (`/v1/route`)
- ✅ **Cuándo usarlo**: cuando necesitas máxima claridad y quieres que los consumidores vean directamente la versión en la ruta.
- 🧩 **Ventajas**: fácil de cachear, muy visible y ampliamente soportado.
- ⚠️ **Desventajas**: rompe RESTful purity, puede generar rutas duplicadas.

### 2. **Versionado por Header** (`X-API-Version: 1`)
- ✅ **Cuándo usarlo**: cuando quieres mantener rutas limpias y RESTful, y tienes control sobre los clientes (por ejemplo, aplicaciones internas).
- 🧩 **Ventajas**: mantiene la ruta intacta, separa los metadatos de la URL.
- ⚠️ **Desventajas**: menos visible para herramientas como Postman o navegadores; puede requerir configuración adicional en proxies.

### 3. **Versionado por Media Type** (`Accept: application/json;v=1`)
- ✅ **Cuándo usarlo**: ideal para APIs altamente personalizables o cuando sigues principios de HATEOAS.
- 🧩 **Ventajas**: cumple estrictamente con estándares REST, permite evolucionar sin romper contratos.
- ⚠️ **Desventajas**: complejidad en configuración y menor compatibilidad con herramientas estándar.

### 4. **Versionado Personalizado** (cabeceras como `X-Custom-Version`)
- ✅ **Cuándo usarlo**: cuando necesitas una lógica de versionado propia o combinaciones (por ejemplo, multi-tenant + versión).
- 🧩 **Ventajas**: máxima flexibilidad.
- ⚠️ **Desventajas**: necesitas mantener tu propio extractor/versionador, menor interoperabilidad.


> 🎯 **Recomendación**:
>
> - Para **APIs públicas**: usa **URI** o **Header**, según el nivel de control sobre los clientes.
> - Para **APIs internas/controladas**: usa **Header** o **Custom** para mantener URLs limpias.
> - Para **APIs con fuerte enfoque REST/HATEOAS**: considera **Media Type**.

---

## 💾 Instalación

Para instalar las dependencias, ejecuta:

```bash
npm install
```

---

## 🚀 Ejecutar el Proyecto

Cada tipo de versionado corre en un puerto diferente:

```bash
npm run start
```

Esto iniciará los siguientes servicios:

- URI versioning en http://localhost:3001
- Header versioning en http://localhost:3002
- Media-Type versioning en http://localhost:3003
- Custom versioning en http://localhost:3004

---

## 🧪 Ejecutar los Tests

Para correr los tests E2E:

```bash
npm run test:e2e
```

---

## 📝 Licencia

Este proyecto está licenciado bajo la licencia MIT.

En la raíz del repositorio encontrarás un archivo llamado `LICENSE` que contiene el texto completo de la licencia. Este archivo indica los términos bajo los cuales puedes usar, modificar y distribuir este proyecto.

La licencia MIT es muy permisiva, permitiendo el uso libre del código siempre que se mantenga el aviso de copyright y la licencia original.

No se requiere configuración adicional para usar el proyecto bajo esta licencia, simplemente respeta las condiciones indicadas en el archivo `LICENSE`.