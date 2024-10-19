import React, { useEffect, useState } from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { MdDragHandle } from 'react-icons/md';
import { CiEdit, CiTrash } from "react-icons/ci";

// Drag handle component
const DragHandle = SortableHandle(() => (
  <span className='prevent-select' style={{ cursor: 'grab', marginRight: '8px' }}>
    <MdDragHandle size={24} />
  </span>
));

const SortableItem: any = SortableElement(({ value, handleEdit, onDelete }) => {
  return (
    <div
      style={{
        padding: '16px',
        margin: '0 0 8px 0',
        minHeight: '50px',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <DragHandle/>
      <div className='flex justify-between w-full'>
        <div>
          <div className='text-[16px]'>{value.no}. {value.question}</div>
          <div className='text-[12px]' >Ans. {value.answer}{" )"} {(value?.choices?.find(ele => ele.choice === value.answer))?.answer}</div>
        </div>
        <div className='flex gap-2'>
        <button onClick={() => handleEdit(value.idx)}><CiEdit className=' hover:scale-110' size={22}/></button>
        <button onClick={() => onDelete(value.idx)}><CiTrash className=' hover:scale-110' size={22}/></button>
        </div>
      </div>
    </div>
  );

});

const SortableList: any = SortableContainer(({ items, onEdit, onDelete }) => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '4px' }}>
      {items.map((value, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          value={{ ...value, no: index + 1, idx: index }}
          handleEdit={onEdit}
          onDelete={onDelete}

        />
      ))}
    </div>
  );
});

const ReorderableList: any = ({ onEdit, onDelete, items: initialItems , callBack}) => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if(initialItems?.length > 0){
      setItems([...initialItems]);
    }else{
      setItems([])
    }
  },[initialItems])

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newArrayMove = arrayMoveImmutable(items, oldIndex, newIndex);
    setItems(newArrayMove)
    callBack(newArrayMove)
  };

  const defaultProps = {
    items,
    onSortEnd,
    onEdit,
    onDelete,
  }

  return <SortableList {...defaultProps} useDragHandle />;
};

export default ReorderableList;
