import React, { useState, useRef, useEffect } from "react";
import "./filter.css";


export default function Filter({ children, onApply, label }) {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(undefined);
  const buttonRef = useRef(undefined);


  useEffect(() => {
    const handleClickOutside = event => {
      const isDropdownClick =
        dropdownRef.current && dropdownRef.current.contains(event.target);
      const isButtonClick =
        buttonRef.current && buttonRef.current.contains(event.target);

 
      if (isDropdownClick || isButtonClick) {
        // If the ref is not defined or the user clicked on the menu, we don’t do anything.
        return;
      }
      // Otherwise we close the menu.
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside); // handle desktops
    document.addEventListener("touchstart", handleClickOutside); // handle touch devices

    // Event cleanup
    return () => {
        document.removeEventListener("mousedown", handleClickOutside); // handle desktops
        document.removeEventListener("touchstart", handleClickOutside); // handle touch devices
    };
 }, [dropdownRef, buttonRef]);

 const handleApply = event => {
    setIsOpen(false);
    onApply(event);
    };
 

  return (
    <div className="filter">
    <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)} className="filter__button"> {label} </button>
    {isOpen && (
        <div ref={dropdownRef} className="filter_dropdown">
            <div style={{paddingtop:"2rem", paddingbottom:"2rem"}}>
                {children} 
            </div>
            <div className="filter__dropdown__actions">
                <button onClick={handleApply} className="filter_dropdown_button">
                    Apply
                </button>
            </div>
        </div>
    )}
    
    </div>
  );
}