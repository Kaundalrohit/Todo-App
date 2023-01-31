import Addnewtask from "./Addnewtask";
import axios from "axios";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
type props = {
  task: any;
  getInProgressTask: any;
  getCompletedTask: any;
  showMarkDone: any;
  showDeleteBTn: any;
  inProgressActive: any;
  completedActive: any;
};
export default function TaskList({
  task,
  getInProgressTask,
  getCompletedTask,
  showMarkDone,
  showDeleteBTn,
  inProgressActive,
  completedActive,
}: props) {
  const [text, setText] = useState("");
  const [date, setDate] = useState<any>(moment().toDate());
  const baseUrl = "http://139.59.47.49:4004/api";

  // API For Post MarkedData

  const postMarkedData = async (id: number) => {
    // console.log("postMarkedData");
    // console.log(id);
    await axios
      .post(`${baseUrl}/task/status`, {
        id: id,
        status: 2,
      })
      .then((res) => {
        // console.log(res.data);
      });
    getInProgressTask();
  };

  // API For Post DeletedData

  const postDeleteData = async (id: number) => {
    // console.log("postDeleteData");
    // console.log(id);
    await axios
      .post(`${baseUrl}/task/status`, {
        id: id,
        status: 0,
      })
      .then((res) => {
        // console.log(res.data);
      });
    getInProgressTask();
  };

  // API For Add New Data

  const addNewTask = async () => {
    await axios.post(`${baseUrl}/task`, {
      task_name: text,
      date: date,
    });
    setText("");
    setDate("");
    getInProgressTask();
    toast("🦄 Task-Added", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  // Handle State Values OF Text & Date Field

  const handleDate = (e: any) => {
    setDate(e.target.value);
  };
  const handleText = (e: any) => {
    setText(e.target.value);
  };

  //

  const convertDateToWeekDays = (date: any) => {
    let y = date.toString();
    var event = new Date(y);
    var options: any = { weekday: "long" };
    let x = event.toLocaleDateString("en-US", options);
    return x;
  };

  let weekDays = [
    { day: "Monday", key: 1 },
    { day: "Tuesday", key: 2 },
    { day: "Wednesday", key: 3 },
    { day: "Thursday", key: 4 },
    { day: "Friday", key: 5 },
    { day: "Saturday", key: 6 },
    { day: "Sunday", key: 7 },
  ];

  return (
    <>
      <ToastContainer />
      <div className="add-task row mt-2">
        <div className="col-md-6 pt-2 ps-4 task-details text-warning fw-bold h3">
          Task
        </div>
        <Addnewtask
          handleDate={handleDate}
          handleText={handleText}
          addNewTask={addNewTask}
          text={text}
          date={date}
        />
      </div>
      <div className="show-task-buttons row my-3">
        <div className="col-md-6">
          <button
            className={`btn w-100 btn-outline-dark ${inProgressActive}`}
            onClick={getInProgressTask}
          >
            In-Progress
          </button>
        </div>
        <div className="col-md-6">
          <button
            className={`btn w-100 btn-outline-dark ${completedActive}`}
            onClick={getCompletedTask}
          >
            Completed
          </button>
        </div>
      </div>
      <div className="incompleted-task">
        <div className="row my-2">
          {weekDays.map((e) => {
            return (
              <>
                <h5 className="Week-day text-success h2 my-2 fw-bold">
                  {e.day}'s Tasks{" "}
                  <i className="bi bi-check2-square text-warning"></i>
                </h5>

                {task
                  .filter(
                    (el: any) =>
                      convertDateToWeekDays(
                        el.date.toString()
                      ).toLowerCase() === e.day.toLowerCase()
                  )
                  .map((element: any, index: any) => {
                    return (
                      <>
                        <div
                          className="card col-md-4 p-3 my-1 shadow bg-white rounded-3"
                          key={element.id}
                        >
                          <div className="task-name">
                            <span className="text-danger">Task:-</span>{" "}
                            {element.task_name}
                          </div>
                          <div className="row my-2">
                            <div className="move-to-trash col-md-6">
                              {showMarkDone && (
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() => {
                                    postMarkedData(element.id);
                                  }}
                                >
                                  Mark_Done
                                </button>
                              )}
                            </div>
                            <div className="delete-btn col-md-6 justify-content-end d-grid">
                              {showDeleteBTn && (
                                <button
                                  className="btn btn-danger"
                                  style={{
                                    borderRadius: "40px",
                                    marginTop: "-6px",
                                  }}
                                  onClick={() => {
                                    postDeleteData(element.id);
                                  }}
                                >
                                  {" "}
                                  <i className="bi bi-trash3 text-white"></i>
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="date">
                            <>
                              <span className="text-danger">Created_At:- </span>
                              {convertDateToWeekDays(element.date)},
                              {new Date(element.date).toString().slice(3, 15)}
                            </>
                          </div>
                          <div className="id">
                            {" "}
                            <span className="text-danger">Id:- </span>
                            {element.id}
                          </div>
                        </div>
                      </>
                    );
                  })}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
