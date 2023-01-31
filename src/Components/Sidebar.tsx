import TaskList from "./Tasklist/Tasklist";
import { useState, useEffect } from "react";
// import ReactPaginate from "react-paginate";
import Pagination from "./Pagination";
import axios from "axios";
export default function Sidebar() {
  const [task, setTask] = useState<any>([]);
  const [showMarkDone, setShowMarkDone] = useState(true);
  const [showDeleteBTn, setShowDeleteBTn] = useState(true);

  // States Declaration for active and Non-Active Button Classes

  const [homeActive, setHomeActive] = useState("");
  const [deletedActive, setDeletedActive] = useState("");
  const [inProgressActive, setInProgressActive] = useState("active");
  const [completedActive, setCompletedActive] = useState("");

  // Declaration For Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = task.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // BaseUrl And Limit
  const baseUrl = "http://139.59.47.49:4004/api";
  const limit = 200;

  // API for get In-Progress Task At Initial stage

  const getData = async () => {
    await axios
      .get(`${baseUrl}/tasks?limit=${limit}&start=1&status=1`)
      .then((res) => {
        setTask(res.data.rows);
        setShowDeleteBTn(true);
        setShowMarkDone(true);
        setInProgressActive("active");
        setCompletedActive("");
        setHomeActive("active");
        setDeletedActive("");
      });
  };
  useEffect(() => {
    return () => {
      getData();
    };
  }, []);

  const getInProgressTask = async () => {
    await axios
      .get(`${baseUrl}/tasks?limit=${limit}&start=1&status=1`)
      .then((res) => {
        setTask(res.data.rows);
        setShowDeleteBTn(true);
        setShowMarkDone(true);
        setInProgressActive("active");
        setCompletedActive("");
        // setDeletedActive("");
      });
  };

  // API for Get ALL Completed TASK

  const getCompletedTask = async () => {
    await axios
      .get(`${baseUrl}/tasks?limit=${limit}&start=1&status=2`)
      .then((res) => {
        setTask(res.data.rows);
        setShowDeleteBTn(true);
        setShowMarkDone(false);
        setCompletedActive("active");
        setInProgressActive("");
      });
  };

  // API for get all Deleted Task

  const displayDeletedData = async () => {
    await axios
      .get(`${baseUrl}/tasks?limit=${limit}&start=1&status=0`)
      .then((res) => {
        setTask(res.data.rows);
        setShowDeleteBTn(false);
        setShowMarkDone(false);
        setInProgressActive("");
        setCompletedActive("");
        setHomeActive("");
        setDeletedActive("active");
      });
  };

  // const fetchComments = async (currentPage: any) => {
  //   await axios
  //     .get(`${baseUrl}/tasks?limit=${limit}&start=${currentPage}&status=1`)
  //     .then((res) => {
  //       const data = res.data.rows;
  //       console.log(res.data.rows);
  //       return data;
  //     });
  // };

  // const handlePageClick = async (data: any) => {
  //   let currentPage = data.selected + 1;
  //   console.log(currentPage);
  //   const commentsFormServer = await fetchComments(currentPage);
  //   setTask(commentsFormServer);
  // };

  return (
    <>
      <div className="sidebar shadow">
        <div className="user-img text-center">
          <img
            src="https://source.unsplash.com/70x70/?boys"
            alt=""
            style={{ borderRadius: "50px" }}
          />
        </div>
        <div className="user-name text-center h4 m-0">Hardin</div>
        <div className="user-email text-center h6 ">hardin@gmail.com</div>
        <div className="home-btn shadow my-2 mt-3">
          <button
            className={`btn btn-outline-warning w-100 py-3 fw-bold ${homeActive}`}
            onClick={getData}
          >
            <i className="bi bi-house-door me-1"></i>Home
          </button>
        </div>
        <div className="show-delete-items-btn shadow">
          <button
            className={`btn btn-outline-danger w-100 py-3 fw-bold ${deletedActive}`}
            onClick={displayDeletedData}
          >
            <i className="bi bi-trash3 me-1"></i>Deleted_Items
          </button>
        </div>
      </div>

      <div className="body-text">
        <TaskList
          task={currentPosts}
          getInProgressTask={getInProgressTask}
          getCompletedTask={getCompletedTask}
          showMarkDone={showMarkDone}
          showDeleteBTn={showDeleteBTn}
          inProgressActive={inProgressActive}
          completedActive={completedActive}
        />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={task.length}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        {/* <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={50}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        /> */}
      </div>
    </>
  );
}
