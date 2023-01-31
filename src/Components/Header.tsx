export default function Header() {
  return (
    <>
      <div className="container-fluid shadow sticky-top border bg-black">
        <h1
          className="p-3 text-center"
          style={{
            color: "white",
            textShadow: "0 0 3px #FF0000, 0 0 5px #0000FF",
          }}
        >
          <i className="bi bi-check2-square text-warning"></i> TODO_LIST
        </h1>
      </div>
    </>
  );
}
