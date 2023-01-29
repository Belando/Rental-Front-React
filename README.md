# Proyecto FrontEnd con React

Creación de la  parte frontal de la API de películas con React de Javascript.

Los usuarios harán uso del middleware Auth para poder realizar acciones en la página.

El Header está compuesto de:

•	Un logo que redirecciona a la página principal en todo momento.
•	Una barra de búsqueda para realizar endpoints por género, título o año.
•	Login donde se realiza el endpoint de acceso con usuario, guardando los datos del mismo en Redux para su utilización en otras vistas.
•	Register, donde se podrá realizar el endpoint de registro de usuario con todos los campos necesarios.
•	Perfil, donde el usuario podrá realizar el endpoint de modificar sus datos, borrar su cuenta y administrar sus alquileres.
•	Admin, vista donde los usuarios que accedan con un middleware isAdmin podrán gestionar los alquileres de todos los usuarios, así como las series.

El Body está compuesto de:
•	Home: donde cada vez que accedamos se mostrará todo el catálogo de nuestra API de series, donde se podrá acceder a ellas para ver más información y alquilarlas
•	Detail: una vez pinchamos en las series tenemos la opción de rental para poder suscribirnos a esa serie.

Las peticiones a la API / nuevos endpoints son:
•	router.get("/admin", auth, RentalsController.AllUsersAdmin);
•	router.post("/newrental", auth, RentalsController.newRental);
•	router.get("/:_id", auth, RentalsController.allRentalsUser)

