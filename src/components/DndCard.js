import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Card from 'react-bootstrap/Card';


const style = {
  border: '1px gray',
  padding: '10px',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}


export const DndCard = ({id, movie, index, moveCard }) => {
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    // ******* can it be replaced by "card" ***********8
    type: 'card',
    item: () => {
      //change id to movieId
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  
  
  return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
      <Card className='favoritesCard'>
          {id > 9 ? 
              <div className='favoritesNumber favoritesNumberTwoDigit'>
                {id}
              </div> :
              <div className='favoritesNumber favoritesNumberOneDigit'>
                {id}
              </div>
              }
          <Card.Img
            className="favoritesPoster" 
            src={movie.poster+"/100px180"}
            onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src="/images/NoPosterAvailable-crop.jpg";
                }}
            />
          <div className='favoritesTitle'>
              {movie.title} 
          </div>
            
      </Card>
    </div>
      
  )
}