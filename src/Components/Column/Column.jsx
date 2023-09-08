
import React, { useEffect, useState } from 'react';
import './column.css';
import Card from './../Card/Card';
import { images } from '../../constants';

function Column({ columnName, columnData, groupType, users, }) {
    const [userData, setUserData] = useState({});

    // user data fetch fn
    const fetchUserData = (userId) => {
        const user = users.find((user) => user.id === userId);
        return user || {};
    };

    const getImageSource = () => {
        switch (groupType) {
            case 'User':
                return images.image;
            case 'Priority':
                switch (columnName) {
                    case 'Urgent':
                        return images.urgent
                    case 'Low':
                        return images.low;
                    case 'Medium':
                        return images.medium;
                    case 'High':
                        return images.high;
                    default:
                        return images.dot;
                }
            case 'Status':
                switch (columnName) {
                    case 'Todo':
                        return images.todo
                    case 'Done':
                        return images.done;
                    case 'Cancelled':
                        return images.cancelled;
                    case 'In progress':
                        return images.inprogress;
                    case 'Backlog':
                        return images.backlog;
                    default:
                }
            default:
        }
    }

    useEffect(() => {
        const userDataMap = {};
        columnData.forEach((item) => {
            const userId = item.userId;
            if (!userDataMap[userId]) {
                userDataMap[userId] = fetchUserData(userId);
            }
        });
        setUserData(userDataMap);
    }, [columnData, users]);

    const prioritySymbols = {
        0: images.dot,
        1: images.low,
        2: images.medium,
        3: images.high,
        4: images.urgent,
    };
    const StatusSymbols = {
        'Backlog':images.backlog,
        'In progress':images.inprogress,
        'Todo':images.todo,
        'Done':images.done,
        'Cancelled':images.cancelled,
    };
    function getIsOnline(columnName) {
        for (const id in userData) {
            const user = userData[id];
            if (user.name === columnName) {
                return user.available;
            }
        }
    }
    const isOnline = getIsOnline(columnName);
    return (
        <div className="KanbanColumn">
            <div className="KanbanColumn-heading">
                <div className="KanbanColumn-heading-left">
                    <span className='column-image'>{groupType === "User" ? (<>
                        <img src={getImageSource()} alt="" />
                        <div className={`online-indicator ${isOnline? 'online' : 'offline'}`} />
                    </>) : ((groupType === "Status") ? (<img src={getImageSource()} alt="" />) :
                        ((groupType === "Priority") ? (<img src={getImageSource()} alt="" />) :
                            (<div></div>)))}</span>
                    <span className="KanbanColumn-heading-Name">{columnName}</span>
                    <span className='KanbanColumn-heading-len'>{columnData.length}</span>
                </div>
                <div className="KanbanColumn-heading-right">
                    <img className="right-plus" src={images.plus} alt="" />
                    <img className="KanbanColumn-dot" src={images.dot} alt="" />
                </div>
            </div>
            <div className="KanbanColumn-map">
                {columnData.map((item) => (
                    <Card
                        key={item.id}
                        id={item.id}
                        description={item.title}
                        tags={item.tag}
                        imageUrl={images.image} 
                        isOnline={userData[item.userId]?.available}
                        grouping={groupType}
                        prioritySymbol={prioritySymbols[item.priority]}
                        statusSymbols = {StatusSymbols[item.status]}
                    />
                ))}
            </div>
        </div>
    );
}

export default Column;
