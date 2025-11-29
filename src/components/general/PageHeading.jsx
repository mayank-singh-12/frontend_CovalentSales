import useSideBar from "../../contexts/SideBarContext";

export default function PageHeading({ children = "Heading" }) {
  const { handleShow } = useSideBar();

  return (
    <>
      <div className="d-flex align-items-center">
        <a onClick={handleShow}>
          <i class="bi bi-layout-sidebar"></i>
        </a>
        <h3 className="m-0 flex-grow-1 text-center">{children}</h3>
      </div>
    </>
  );
}
