import React, { useState, useEffect } from 'react';
import './Board.css';
import Display from './../Display/Display';
import Column from './../Column/Column';

function Board({ tickets, users }) {

  const getLocalStorageValue = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? storedValue : defaultValue;
  };

  // Function to set value in localStorage
  const setLocalStorageValue = (key, value) => {
    localStorage.setItem(key, value);
  };
  const initialGrouping = getLocalStorageValue('selectedGrouping', 'Status');
  const initialOrdering = getLocalStorageValue('selectedOrdering', 'Priority');


  const [selectedGrouping, setSelectedGrouping] = useState(initialGrouping);
  const [selectedOrdering, setSelectedOrdering] = useState(initialOrdering);
  const [columnData, setColumnData] = useState({});

  const handleGroupingSelect = (grouping) => {
    setSelectedGrouping(grouping);
    setLocalStorageValue('selectedGrouping', grouping);
  };

  const handleOrderingSelect = (ordering) => {
    setSelectedOrdering(ordering);
    setLocalStorageValue('selectedOrdering', ordering);
  };

  const predefinedColumnOrder = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
  const predefinedPriorityOrder = [0, 4, 3, 2, 1];
  const priorityColumnNames = {
    1: 'Low',
    2: 'Medium',
    0: 'No Priority',
    3: 'High',
    4: 'Urgent',
  };

  const fetchDataForGrouping = () => {
    const groupedObjects = {};

    tickets.forEach((ticket) => {
      let ticketGrouping;

      if (selectedGrouping === 'User') {
        const userObject = users.find((user) => user?.id === ticket.userId);
        ticketGrouping = userObject?.name;
      } else if (selectedGrouping === 'Priority') {
        ticketGrouping = priorityColumnNames[ticket.priority];
      } else if (selectedGrouping === 'Status') {
        ticketGrouping = ticket[selectedGrouping.toLowerCase()];
      }

      groupedObjects[ticketGrouping] = [...(groupedObjects[ticketGrouping] || []), ticket];
    });

    for (const groupingKey in groupedObjects) {
      if (groupedObjects.hasOwnProperty(groupingKey)) {
        const group = groupedObjects[groupingKey];

        if (selectedOrdering === 'Priority') {
          group.sort((a, b) => b.priority - a.priority);
        } else if (selectedOrdering === 'Title') {
          group.sort((a, b) => a.title.localeCompare(b.title));
        }
      }
    }

    return groupedObjects;
  };

  useEffect(() => {
    const groupedAndSortedData = fetchDataForGrouping();

    if (selectedGrouping === 'Status') {
      const statusColumnData = {};
      predefinedColumnOrder.forEach((colName) => {
        statusColumnData[colName] = groupedAndSortedData[colName] || [];
      });

      for (const colName in statusColumnData) {
        if (statusColumnData.hasOwnProperty(colName)) {
          if (selectedOrdering === 'Priority') {
            statusColumnData[colName].sort((a, b) => b.priority - a.priority);
          } else if (selectedOrdering === 'Title') {
            statusColumnData[colName].sort((a, b) => a.title.localeCompare(b.title));
          }
        }
      }

      setColumnData(statusColumnData);
    } else if (selectedGrouping === "Priority") { // priority based
      const priorityColumnData = {};
      predefinedPriorityOrder.forEach((priorityValue) => {
        const columnName = priorityColumnNames[priorityValue];
        priorityColumnData[columnName] = groupedAndSortedData[columnName] || [];
      });

      setColumnData(priorityColumnData);
    } else {
      setColumnData(groupedAndSortedData);
    }
  }, [selectedGrouping, selectedOrdering, tickets]);


  return (
    <>
      <div className="Board">
        <Display onGroupingSelect={handleGroupingSelect} onOrderingSelect={handleOrderingSelect} />
      </div>
      <div className='Board-column'>
        {Object.keys(columnData).map((columnName) => (
          <Column
            key={columnName}
            columnName={columnName}
            columnData={columnData[columnName]}
            groupType={selectedGrouping}
            users={users}
          />
        ))}
      </div>
    </>
  );
}

export default Board;


