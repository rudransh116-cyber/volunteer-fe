import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate, Link } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import EventContext from '../context/events/EventContext';

function NavigationMenu() {
  const expand = "sm";
  let navigate = useNavigate();

  const handleLogout = () => {
    console.log("logged out");
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();  // Force page reload after logout
  };

  // Function to handle navigation with reload
  const handleNavigation = (path) => {
    navigate(path);
    window.location.reload();  // Force page reload for route change
  };

  return (
    <>
      <Navbar key={expand} bg="dark" variant="dark" expand={expand}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/">Volunteer</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Volunteer
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-grow-1 pe-3">
                <Nav.Link onClick={() => handleNavigation("/")}>Home</Nav.Link>
                <Nav.Link onClick={() => handleNavigation("/about")}>About</Nav.Link>
                <Nav.Link onClick={() => handleNavigation("/host")}>Organize Event</Nav.Link>
                <NavDropdown title="My Events" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => handleNavigation("/volunteered")}>Volunteered Events</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleNavigation("/organized")}>Organized Events</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                {!localStorage.getItem('token') ? (
                  <>
                    <Nav.Link onClick={() => handleNavigation("/login")}>
                      <Button variant="outline-success" className="mx-2">Login</Button>
                    </Nav.Link>
                    <Nav.Link onClick={() => handleNavigation("/signup")}>
                      <Button variant="outline-success">Signup</Button>
                    </Nav.Link>
                  </>
                ) : (
                  <Nav.Link>
                    <Button variant="outline-success" onClick={handleLogout}>Logout</Button>
                  </Nav.Link>
                )}
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationMenu;
