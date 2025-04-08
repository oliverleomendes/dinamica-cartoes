import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import './index.css';

const etapas = [
  "Levantamento de Requisitos",
  "Análise e Projeto",
  "Implementação",
  "Testes",
  "Implantação",
  "Manutenção",
];

function SortableItem({ id }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-2 p-4 bg-white rounded shadow cursor-move text-center font-medium">
      {id}
    </div>
  );
}

export default function DinamicaCartoes() {
  const [items, setItems] = useState(etapas);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold text-center mb-6">
        Organize as Etapas do Processo de Desenvolvimento de Software
      </h1>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
