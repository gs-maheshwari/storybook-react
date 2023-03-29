import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, fetchTasks, RootState } from "../lib/store";
import { TaskList } from "./TaskList";

const Inbox = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { error } = useSelector((state: RootState) => state.taskList);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    if (error) {
        return (
          <div className="page lists-show">
            <div className="wrapper-message">
              <span className="icon-face-sad" />
              <p className="title-message">Oh no!</p>
              <p className="subtitle-message">Something went wrong</p>
            </div>
          </div>
        );
      }
      return (
        <div className="page lists-show">
          <nav>
            <h1 className="title-page">Taskbox</h1>
          </nav>
          <TaskList />
        </div>
      );

}

export default Inbox;