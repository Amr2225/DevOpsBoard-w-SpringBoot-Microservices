import { useState } from "react";
import { useSelector } from "react-redux";

import Card from "./Card";
import DropIndicator from "./DropIndicator";
import AddCard from "./AddCard";
import { Attachment } from "../Modals";
import { useUpdateTaskMutation } from "../../Redux/apis/taskApi";
import { useParams } from "react-router-dom";

const Column = ({ title, headingColor, column, setIsCardMenuActive }) => {
  const [active, setActive] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [isAddAttahcmentActive, setIsAddAttahcmentActive] = useState(false);

  const [updateTask] = useUpdateTaskMutation();
  const { taskData } = useSelector((state) => state.tasks);
  const { userData } = useSelector((state) => state.user);
  const params = useParams();

  const filteredCards = taskData.filter((data) => data.status === column);

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleOnDrop = (e) => {
    setActive(false);

    const cardId = e.dataTransfer.getData("cardId"); //The cardId of the card that is being dragged
    const status = e.dataTransfer.getData("cardStatus"); //The cardStatus of the card that is being dragged

    //Not placing the card in the same position
    if (column !== status) {
      let cardsCopy = [...taskData];
      let cardToTransfer = cardsCopy.find((card) => card.id === +cardId);

      cardToTransfer = { ...cardToTransfer, status: column }; //change the column of the card

      if (column === "done") {
        if (userData.role === "1") {
          setTaskId(cardId);
          setIsAddAttahcmentActive(true);
        }
      }

      updateTask({ ...cardToTransfer, projectId: params.projectId }); //Project id will be passed as a prop
    }
  };

  return (
    <>
      <div className='w-56 shrink-0'>
        <div className='mb-3 flex items-center justify-between'>
          <h3 className={`font-medium ${headingColor}`}>{title}</h3>
          <span className='text-sm text-neutral-400'>{filteredCards.length}</span>
        </div>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleOnDrop}
          className={`h-full w-full transition-colors ${
            active ? "bg-neutral-800/50" : "bg-neutral-800/0"
          }`}
        >
          {filteredCards.map((cardData) => (
            <Card key={cardData.id} setIsCardMenuActive={setIsCardMenuActive} {...cardData} />
          ))}
          <DropIndicator active={active} />
          {userData.role === "2" && column === "backlog" ? <AddCard /> : <></>}
        </div>
      </div>
      {isAddAttahcmentActive && (
        <Attachment setIsMenuOpen={setIsAddAttahcmentActive} taskId={taskId} />
      )}
    </>
  );
};

export default Column;
