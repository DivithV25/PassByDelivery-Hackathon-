const Layout = ({ children }) => {
    return (
      <div className="layout">
        <header>
          <h1>Pass By Delivery</h1>
        </header>
        <main>{children}</main>
        <style jsx>{`
          .layout {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #f0f0f0;
          }
          header {
            margin-bottom: 20px;
          }
        `}</style>
      </div>
    );
  };
  
  export default Layout;