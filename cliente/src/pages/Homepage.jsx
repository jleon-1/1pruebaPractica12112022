import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../store/store";
import { observer } from "mobx-react-lite";

const Homepage = () => {
   const { userStore } = useStore();

   return (
      <Segment inverted textAlign="center" vertical className="masthead">
         <Container text>
            <Header as="h1" inverted>
               Roles de pago
            </Header>
            {userStore.isLoggedIn ? (
               <Fragment>
                  <Header as="h2" inverted content="Roles de pago" />
                  <Button as={Link} to="/roles-de-pago" size="huge" inverted>
                     Ya iniciado sesion, continuar
                  </Button>
               </Fragment>
            ) : (
               <Fragment>
                <Button as={Link} to="/login" size="huge" inverted>
                    Iniciar sesion
                </Button>
               </Fragment>
            )}
         </Container>
      </Segment>
   );
};

export default observer(Homepage);
