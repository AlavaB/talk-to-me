import { Fragment } from "react"; // utilisé pour réduire le nombre de <div>

import Navigation from "./Navigation";

const Layout = (props) => {
  return (
    <Fragment>
      <Navigation />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
