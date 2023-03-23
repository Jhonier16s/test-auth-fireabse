export async function getServerSideProps(context) {
    // Validar si el usuario tiene permisos de administrador
    const isAdmin = true; // Cambiar a true o false para comprobar el bloqueo de ruta
    if (!isAdmin) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  
    // Si el usuario tiene permisos, continuar con la renderización de la página
    return {
      props: {},
    };
  }
  
  function AdminPage() {
    return (
      <div>
        <h1>Panel de administración</h1>
        {/* Contenido de la página */}
      </div>
    );
  }
  
  export default AdminPage;