# Proyecto FrontEnd con React

Creación de la  parte frontal de la API de películas con React de Javascript para el Bootcamp de Full Stack Developer de GeeksHub Academy.

Los usuarios harán uso del middleware Auth para poder realizar acciones en la página.
El administrador hará uso del middleware isAdmin para gestionar los alquileres.


## HEADER está compuesto de:

-	Un logo que redirecciona a la página principal en todo momento.

-	Una barra de búsqueda para realizar endpoints por género, título o año.

-	Login donde se realiza el endpoint de acceso con usuario, guardando los datos del mismo en Redux para su utilización en otras vistas.

-	Register, donde se podrá realizar el endpoint de registro de usuario con todos los campos necesarios.

-	Perfil, donde el usuario podrá realizar el endpoint de modificar sus datos, borrar su cuenta y administrar sus alquileres.

-	Admin, vista donde los usuarios que accedan con un middleware isAdmin podrán gestionar los alquileres de todos los usuarios, así como las series.


## BODY está compuesto de:

-	Home: donde cada vez que accedamos se mostrará todo el catálogo de nuestra API de series, donde se podrá acceder a ellas para ver más información y alquilarlas

-	Detail: una vez pinchamos en las series tenemos la opción de rental para poder suscribirnos a esa serie.


## Las peticiones a la API para los alquileres son (/rentals):

-	Alquileres de todos los usuarios: 
    router.get("/admin", auth, RentalsController.AllUsersAdmin);

-	Nuevo alquiler:
    router.post("/newrental", auth, RentalsController.newRental);

-   Alquiler de un usuario:
    router.get("/user", auth, RentalsController.allRentalsUser)


## Las peticiones a la API para los usuarios son (/users):

-   Logear un usuario: 
    router.post("/login", UsersController.loginUser)

-   Registrar un usuario: 
    router.post("/register",UsersController.newUser)

-   Modificar un usuario: 
    router.put("/profile/modify", auth, UsersController.updateUser)

-   Borrar un usuario: 
    router.delete("/profile/delete", auth, UsersController.deleteUser)


## Las peticiones a la API para las series son (/series):

-   Todas las series disponibles en HOME: 
    router.get("/", SeriesController.getAllSeries)

-   Buscar series por nombre en la barra de búsqueda:
    router.get("/search/:name", auth, SeriesController.getSeriesByName)



## ERRORES conocidos y mejoras futuras:

-   Fallos en los alquileres de todos los usuarios y de admin: 
    505 internal server error

-   Problema con el middleware isAdmin:
    No reconoce req.user y no puede sustraer información

-   Necesario diseño responsive:
    Aún no se ha implementado diseño responsive
