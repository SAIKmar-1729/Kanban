import React from 'react';
import "./Card.css"
import { images } from '../../constants';

function Card({ id, description, tags, imageUrl, isOnline, grouping, prioritySymbol , statusSymbols}) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="id">{id}</div>
        <div className="card-image">
          {grouping === "User" ? (
            <div></div>
          ) : (
            <>
              <img src={imageUrl} alt={`Card ${id}`} />
              <div className={`online-indicator ${isOnline ? 'online' : 'offline'}`} />
            </>
          )
          }
        </div>
      </div>
      <div className="card-content">
        <div className='card-content-text'>
          {grouping !== "Status" && <img className='card-content-image' src={statusSymbols} />}
          <p>{description}</p>
        </div>
        <div className="tags">
          {grouping !== "Priority" &&
            <img className='card-priorty' src={prioritySymbol} alt='' />
          }
          {tags.map((tag, index) => (
            <>
              <span className="tag" key={index}>
                <div><img className='grey-circle' src={images.greycircle} alt="" /> {tag}</div>
              </span>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;
