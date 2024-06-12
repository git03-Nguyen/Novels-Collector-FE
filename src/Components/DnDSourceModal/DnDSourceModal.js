import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { NovelContext } from '../../context/NovelContext';

import './DnDSourceModal.css'
import UserPluginSourcesManager from '../../utils/localStorage/userPluginSourcesManager';

function DnDSourceModal(props) {

    const { pluginSources } = useContext(NovelContext);
    const { show, onCancel, onConfirm } = props;
    const defaultUserPluginSources = UserPluginSourcesManager.getUserPluginSources();
    const [userPluginSources, setUserPluginSources] = useState(defaultUserPluginSources?.length > 0 ? defaultUserPluginSources : pluginSources);

    const handleOnDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = Array.from(pluginSources);

        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);


        const updatedItems = items.map((item, index) => ({
            ...item,
            prior: items?.length - index,
        }));

        setUserPluginSources(updatedItems);
    }

    const handleConfirm = () => {
        onConfirm(userPluginSources);
    }

    useEffect(() => {
        setUserPluginSources(pluginSources);
    }, [pluginSources])

    return (
        <div className='dnd-source-modal-container  dark:bg-black dark:text-white'>
            <Modal show={show} onHide={onCancel} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sắp xếp thứ tự ưu tiên sử dụng nguồn truyện</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="pluginSources">
                            {(provided) => (
                                <ul key={`droppable-plugin-sources-list`} {...provided.droppableProps} ref={provided.innerRef}>
                                    {userPluginSources && userPluginSources?.length > 0 &&
                                        userPluginSources.sort((a, b) => b.prior - a.prior)
                                            .map((source, index) => (
                                                <Draggable key={source?.slug} draggableId={`source-${index}`} index={index}>
                                                    {(provided) => (
                                                        <li
                                                            className='draggable-plugin-source-item'
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                userSelect: 'none',
                                                                ...provided.draggableProps.style
                                                            }}
                                                        >
                                                            {source?.name}
                                                        </li>
                                                    )}
                                                </Draggable>
                                            ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>

                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={onCancel}>
                        Hủy
                    </button>
                    <button className="btn btn-secondary" onClick={handleConfirm}>
                        Xác nhận
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DnDSourceModal;