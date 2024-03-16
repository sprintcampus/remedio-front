const VerticalNavigation = () => {
    return (
      <div className="flex lg:hidden bg-gradient-to-b from-cyan-100 to-blue-100 p-6">
        <ul className={`flex flex-col gap-3`}>
          <li>
            <a className="uppercase text-lg" href="/">Home</a>
          </li>
          <li>
            <a className="uppercase text-lg" href="/remedios/cadastrar">Cadastrar Remédio</a>
          </li>
          <li>
            <a className="uppercase text-lg" href="/remedios">Listar Remédios</a>
          </li>
        </ul>
      </div>
  
    );
  };
  
  export default VerticalNavigation;
  