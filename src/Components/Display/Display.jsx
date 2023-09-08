import React, { useState } from 'react';
import "./Display.css"
import { images } from '../../constants';

function Display({ onGroupingSelect, onOrderingSelect}) {
    const [isOpen, setIsOpen] = useState(false);

    // State for the selected values of the dropdowns
    const [dropdown1Value, setDropdown1Value] = useState('Status');
    const [dropdown2Value, setDropdown2Value] = useState('Priority');

    // Data for the dropdown options
    const dropdownOptions1 = ['Status', 'User', 'Priority'];
    const dropdownOptions2 = ['Priority', 'Title'];

    const toggleBox = () => {
        setIsOpen(!isOpen);
    };

    const handleGroupingSelect = (value) => {
        setDropdown1Value(value);
        onGroupingSelect(value); 
    };
    const handleOrderingSelect = (value) =>{
        setDropdown2Value(value);
        onOrderingSelect(value);
    }
    return (
        <div className="Display">
            <button onClick={toggleBox}><img className='display-icon' src ={images.displayicon} alt=""/>Display <img className='drop-icon' src ={images.dropicon} alt =""/></button>
            {isOpen && (
                <div className="box">
                    <div className="box-element">
                        <div className="label">Grouping</div>
                        <select
                            value={dropdown1Value}
                            onChange={(e) =>handleGroupingSelect(e.target.value)}
                        >
                            {dropdownOptions1.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="box-element">
                        <div className="label">Ordering</div>
                        <select
                            value={dropdown2Value}
                            onChange={(e) => handleOrderingSelect(e.target.value)}
                        >
                            {dropdownOptions2.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Display;
