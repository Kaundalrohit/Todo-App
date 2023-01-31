type props = {
  handleDate: any;
  handleText: any;
  text: any;
  date: any;
  addNewTask: any;
};

export default function Addnewtask({
  handleDate,
  handleText,
  text,
  date,
  addNewTask,
}: props) {
  return (
    <>
      <div className="col-md-6 justify-content-end d-grid addnew-task fw-bold">
        <button
          className="btn btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          + Add_New_Task
        </button>
        <div
          className="modal fade "
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5  text-center"
                  id="exampleModalLabel"
                  style={{ marginLeft: "156px" }}
                >
                  <i className="bi bi-check2-square me-1 text-warning"></i> Add
                  New Task
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body m-3">
                <div className="new-task-details ">
                  <div className="input-text relative">
                    <p className="m-0 p-0">Enter_Text</p>
                    <input
                      type="text"
                      value={text}
                      id="inputselect"
                      onChange={(e) => {
                        handleText(e);
                      }}
                      className="w-100 my-2"
                      placeholder="Enter_Text_Here!"
                    />
                    <label htmlFor="inputselect">
                      <i
                        className="bi bi-keyboard position-absolute  text-warning"
                        style={{
                          right: "22px",
                          bottom: "101px",
                          fontSize: "24px",
                        }}
                      ></i>
                    </label>
                  </div>
                  <div className="input-date ">
                    <p className="m-0 p-0">Enter_Date</p>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => {
                        handleDate(e);
                      }}
                      id="date-auction"
                      className="my-2"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning w-100"
                  onClick={addNewTask}
                  data-bs-dismiss="modal"
                  disabled={date.length === 0 || text.length === 0}
                >
                  Add_Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
