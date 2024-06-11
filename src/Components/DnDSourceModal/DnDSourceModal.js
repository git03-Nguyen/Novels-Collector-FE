import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { NovelContext } from '../../context/NovelContext';

import './DnDSourceModal.css'

function DnDSourceModal(props) {

    const { pluginSources, setPluginSources } = useContext(NovelContext);
    const { show, onCancel, onConfirm } = props;


    const handleOnDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = Array.from(pluginSources);
        console.log("Initial items: ");
        console.log(items);

        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        console.log("Reordered items: ");
        console.log(reorderedItem);
        console.log("Changed items: ");
        console.log(items);

        const updatedItems = items.map((item, index) => ({
            ...item,
            prior: items?.length - index,
        }));


        // const updatedItems = items;
        console.log("new plugin sources order: ");
        console.log(updatedItems);

        setPluginSources(updatedItems);
    }

    return (
        <div className='dnd-source-modal-container'>
            <Modal show={show} onHide={onCancel} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sắp xếp thứ tự ưu tiên sử dụng nguồn truyện</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="pluginSources">
                            {(provided) => (
                                <ul {...provided.droppableProps} ref={provided.innerRef}>
                                    {pluginSources
                                        .sort((a, b) => a.prior - b.prior)
                                        .map((source, index) => (
                                            <Draggable key={source.slug} draggableId={`source-${index}`} index={index}>
                                                {(provided) => (
                                                    <li
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            userSelect: 'none',
                                                            padding: '16px',
                                                            margin: '4px 0',
                                                            backgroundColor: '#fff',
                                                            border: '1px solid #ccc',
                                                            ...provided.draggableProps.style
                                                        }}
                                                    >
                                                        {source.name}
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
                    <Button variant="secondary" onClick={onCancel}>
                        Thoát
                    </Button>
                    <Button variant="primary" onClick={onConfirm}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DnDSourceModal;