import useSideBar from "../../contexts/SideBarContext";
import Offcanvas from "react-bootstrap/Offcanvas";
// import { Link } from "react-router-dom";

export default function SideBar({ children }) {
  const { show, handleClose } = useSideBar();

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton></Offcanvas.Header>
      <Offcanvas.Body>
        <div className="d-flex flex-column">{children}</div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
