type props = {
  postsPerPage: any;
  totalPosts: any;
  paginate: any;
  setCurrentPage: any;
  currentPage: any;
};

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  setCurrentPage,
  currentPage,
}: props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const getPrevious = () => {
    setCurrentPage(currentPage - 1);
  };
  const getNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className="container">
        <div className="mt-4">
          <ul className="pagination justify-content-center">
            <button
              onClick={getPrevious}
              className="page-link  btn bg-black text-white rounded-3 me-3 "
              disabled={currentPage === 0 || currentPage === 1}
            >
              <i className="bi bi-arrow-left-circle me-1"></i>Prev
            </button>
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={`page-item ${
                  currentPage === number ? "active" : ""
                }`}
              >
                <button
                  onClick={() => paginate(number)}
                  className="page-link"
                  key={number}
                >
                  {number}
                </button>
              </li>
            ))}
            <button
              onClick={getNext}
              className="page-link btn bg-black text-white rounded-3 ms-3"
              disabled={currentPage === Math.ceil(totalPosts / postsPerPage)}
            >
              Next<i className="bi bi-arrow-right-circle ms-1"></i>
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Pagination;
