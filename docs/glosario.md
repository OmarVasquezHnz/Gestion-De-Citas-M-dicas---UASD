# Glosario de Términos
## Sistema de Gestión de Citas Médicas – Centro Médico UASD

---

### 1. Aplicación Web

Software accesible mediante un navegador de Internet sin necesidad de instalación local. Utiliza tecnologías estándar como HTML, CSS y JavaScript para ejecutarse del lado del cliente. La interacción ocurre a través del protocolo HTTP/HTTPS entre el navegador y un servidor remoto. Permite distribuir actualizaciones de forma centralizada sin intervención del usuario.

**Fuente:** World Wide Web Consortium (W3C). (2023). *Web application architecture*. https://www.w3.org/TR/websockets/

**Referencia APA 7:**
> World Wide Web Consortium (W3C). (2023). *Web application architecture*. W3C. https://www.w3.org/TR/websockets/

---

### 2. Aplicación de Página Única (SPA)

Tipo de aplicación web que carga una única página HTML y actualiza su contenido dinámicamente mediante JavaScript, sin recargar la página completa. Mejora la experiencia del usuario al reducir los tiempos de respuesta y el tráfico de red. Los datos se intercambian en segundo plano con el servidor mediante llamadas a APIs. Es el modelo arquitectónico adoptado en este sistema.

**Fuente:** Mozilla Developer Network (MDN). (2024). *Single-page applications (SPA)*. MDN Web Docs. https://developer.mozilla.org/en-US/docs/Glossary/SPA

**Referencia APA 7:**
> Mozilla Developer Network (MDN). (2024). *Single-page applications (SPA)*. MDN Web Docs. https://developer.mozilla.org/en-US/docs/Glossary/SPA

---

### 3. API REST

Interfaz de Programación de Aplicaciones que sigue los principios de la arquitectura REST (Representational State Transfer). Permite la comunicación entre sistemas a través de HTTP usando métodos estándar: GET, POST, PUT y DELETE. Cada recurso es identificado por una URL única y las respuestas se devuelven en formato JSON o XML. Facilita la integración entre el frontend y los servicios del backend.

**Fuente:** National Institute of Standards and Technology (NIST). (2019). *Micro-services for digital transformation*. NIST Special Publication 500-328. https://doi.org/10.6028/NIST.SP.500-328

**Referencia APA 7:**
> National Institute of Standards and Technology (NIST). (2019). *Micro-services for digital transformation* (NIST SP 500-328). U.S. Department of Commerce. https://doi.org/10.6028/NIST.SP.500-328

---

### 4. Base de Datos Relacional

Colección organizada de datos estructurados en tablas relacionadas entre sí mediante claves primarias y foráneas. Permite almacenar, consultar y manipular la información de forma eficiente y consistente. El acceso se realiza mediante el lenguaje SQL (Structured Query Language). Garantiza la integridad referencial y facilita las operaciones transaccionales.

**Fuente:** International Organization for Standardization (ISO). (2016). *ISO/IEC 9075-1:2016 – Information technology – Database languages – SQL – Part 1: Framework*. ISO. https://www.iso.org/standard/63555.html

**Referencia APA 7:**
> International Organization for Standardization (ISO). (2016). *ISO/IEC 9075-1:2016 – Information technology – Database languages – SQL – Part 1: Framework*. ISO. https://www.iso.org/standard/63555.html

---

### 5. Autenticación

Proceso de verificación de la identidad de un usuario o sistema antes de concederle acceso a recursos protegidos. Puede basarse en algo que el usuario sabe (contraseña), algo que posee (token) o algo que es (biometría). El NIST establece niveles de garantía de autenticación (AAL) según el riesgo del sistema. Es fundamental para proteger la confidencialidad de los datos clínicos de los pacientes.

**Fuente:** National Institute of Standards and Technology (NIST). (2020). *Digital identity guidelines: Authentication and lifecycle management* (NIST SP 800-63B). U.S. Department of Commerce. https://pages.nist.gov/800-63-3/sp800-63b.html

**Referencia APA 7:**
> National Institute of Standards and Technology (NIST). (2020). *Digital identity guidelines: Authentication and lifecycle management* (NIST SP 800-63B). U.S. Department of Commerce. https://pages.nist.gov/800-63-3/sp800-63b.html

---

### 6. Seguridad de la Información

Conjunto de políticas, controles y prácticas destinadas a preservar la confidencialidad, integridad y disponibilidad de la información (tríada CIA). La norma ISO/IEC 27001 establece los requisitos para un Sistema de Gestión de Seguridad de la Información (SGSI). En sistemas de salud, proteger los datos del paciente es una obligación ética y legal. Los riesgos deben identificarse, evaluarse y tratarse de forma continua.

**Fuente:** International Organization for Standardization (ISO). (2022). *ISO/IEC 27001:2022 – Information security, cybersecurity and privacy protection*. ISO. https://www.iso.org/standard/27001

**Referencia APA 7:**
> International Organization for Standardization (ISO). (2022). *ISO/IEC 27001:2022 – Information security, cybersecurity and privacy protection*. ISO. https://www.iso.org/standard/27001

---

### 7. SMTP (Protocolo Simple de Transferencia de Correo)

Protocolo estándar de Internet utilizado para el envío y transferencia de mensajes de correo electrónico entre servidores. Opera principalmente sobre el puerto 587 (con cifrado STARTTLS) o el puerto 465 (con SSL/TLS). Define los comandos y la secuencia de comunicación entre el cliente emisor y el servidor receptor. Es el mecanismo empleado por este sistema para enviar confirmaciones de cita a los pacientes.

**Fuente:** Klensin, J. (2008). *Simple Mail Transfer Protocol* (RFC 5321). Internet Engineering Task Force (IETF). https://www.rfc-editor.org/rfc/rfc5321

**Referencia APA 7:**
> Klensin, J. (2008). *Simple Mail Transfer Protocol* (RFC 5321). Internet Engineering Task Force (IETF). https://www.rfc-editor.org/rfc/rfc5321

---

### 8. Función Serverless

Modelo de ejecución en la nube donde el proveedor gestiona automáticamente la infraestructura del servidor. El desarrollador solo escribe el código de la función, que se ejecuta en respuesta a eventos (petición HTTP, cola de mensajes, etc.). El sistema escala automáticamente según la demanda y el cobro es por uso efectivo. Reduce la complejidad operativa y los costos de gestión del servidor.

**Fuente:** Hendrickson, S., Sturdevant, S., Harter, T., Venkataramani, V., Arpaci-Dusseau, A. C., & Arpaci-Dusseau, R. H. (2016). *Serverless computation with OpenLambda*. USENIX. https://www.usenix.org/conference/hotcloud16/workshop-program/presentation/hendrickson

**Referencia APA 7:**
> Hendrickson, S., Sturdevant, S., Harter, T., Venkataramani, V., Arpaci-Dusseau, A. C., & Arpaci-Dusseau, R. H. (2016). *Serverless computation with OpenLambda*. Proceedings of the 8th USENIX Workshop on Hot Topics in Cloud Computing. USENIX. https://www.usenix.org/conference/hotcloud16/workshop-program/presentation/hendrickson

---

### 9. UML (Lenguaje Unificado de Modelado)

Lenguaje de modelado visual estándar para especificar, visualizar, construir y documentar sistemas de software. Fue estandarizado por el Object Management Group (OMG) y es ampliamente usado en ingeniería de software. Incluye diagramas de clases, secuencia, casos de uso, actividad, entre otros. Permite comunicar el diseño del sistema de forma clara e independiente del lenguaje de programación.

**Fuente:** Object Management Group (OMG). (2017). *Unified Modeling Language (UML), version 2.5.1*. OMG. https://www.omg.org/spec/UML/2.5.1/PDF

**Referencia APA 7:**
> Object Management Group (OMG). (2017). *Unified Modeling Language (UML), version 2.5.1*. OMG. https://www.omg.org/spec/UML/2.5.1/PDF

---

### 10. HTTPS y TLS (Seguridad en la Capa de Transporte)

HTTPS es la versión segura del protocolo HTTP que cifra la comunicación entre el navegador y el servidor usando TLS (Transport Layer Security). TLS garantiza que los datos transmitidos no puedan ser interceptados ni modificados por terceros. El certificado digital del servidor permite al cliente verificar su autenticidad antes de establecer la conexión. Es un requisito indispensable en cualquier aplicación que maneje datos personales o credenciales.

**Fuente:** Rescorla, E. (2018). *The Transport Layer Security (TLS) Protocol Version 1.3* (RFC 8446). Internet Engineering Task Force (IETF). https://www.rfc-editor.org/rfc/rfc8446

**Referencia APA 7:**
> Rescorla, E. (2018). *The Transport Layer Security (TLS) Protocol Version 1.3* (RFC 8446). Internet Engineering Task Force (IETF). https://www.rfc-editor.org/rfc/rfc8446

---

### 11. Almacenamiento Local (localStorage)

Mecanismo de almacenamiento del navegador web que permite guardar pares clave-valor de forma persistente en el dispositivo del usuario, sin fecha de expiración. Los datos persisten aunque se cierre el navegador y son accesibles únicamente desde el origen (dominio) que los creó. A diferencia de las cookies, no se envían al servidor en cada petición HTTP. La especificación forma parte del estándar HTML Living Standard del WHATWG.

**Fuente:** Web Hypertext Application Technology Working Group (WHATWG). (2024). *HTML Living Standard – Web storage*. WHATWG. https://html.spec.whatwg.org/multipage/webstorage.html

**Referencia APA 7:**
> Web Hypertext Application Technology Working Group (WHATWG). (2024). *HTML Living Standard – Web storage*. WHATWG. https://html.spec.whatwg.org/multipage/webstorage.html

---

### 12. Variable de Entorno

Parámetro de configuración externo al código fuente que el sistema operativo o la plataforma de despliegue inyecta en el proceso de la aplicación en tiempo de ejecución. Se usa para almacenar credenciales, claves de API, URLs de servicios y otras configuraciones sensibles sin exponerlas en el repositorio. Su uso sigue el principio de la metodología Twelve-Factor App, que separa la configuración del código. Impide que información confidencial quede registrada en el historial de versiones.

**Fuente:** Wiggins, A. (2017). *The Twelve-Factor App: III. Config – Store config in the environment*. Heroku. https://12factor.net/config

**Referencia APA 7:**
> Wiggins, A. (2017). *The Twelve-Factor App: III. Config – Store config in the environment*. Heroku. https://12factor.net/config

---

*Glosario elaborado para el Sistema de Gestión de Citas del Centro Médico UASD – Abril 2026.  
Formato de citas: APA 7.ª edición (American Psychological Association, 2020).*
