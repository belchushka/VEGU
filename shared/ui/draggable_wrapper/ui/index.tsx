import React from "react";
import s from "./style.module.scss";
import {
    Droppable,
    DragDropContext,
    Draggable,
} from "react-beautiful-dnd";
import {IDraggableWrapper} from "./types";


export const DraggableWrapper: React.FC<IDraggableWrapper> = ({
                                                                  onDragEnd,
                                                                  children,
                                                                  disabled = false
                                                              }) => {
    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable isDropDisabled={disabled}  droppableId={"blocks"}>
                    {(provided) => {
                        return (
                            <div
                                className={s.wrapper}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {children.map(({id, component}, num) => {
                                    return (
                                        <Draggable isDragDisabled={disabled} key={id} draggableId={id} index={num}>
                                            {(provided) => {
                                                return (
                                                    <div
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                    >
                                                        {component}
                                                    </div>
                                                );
                                            }}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>
            </DragDropContext>
        </div>
    );
};
