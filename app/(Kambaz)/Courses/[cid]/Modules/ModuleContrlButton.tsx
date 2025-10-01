"use client";

import { Button } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";

interface ModuleControlButtonsProps {
  onAdd?: () => void;
}

export default function ModuleControlButtons({
  onAdd,
}: ModuleControlButtonsProps) {
  return (
    <Button variant="secondary" size="sm" className="ms-auto" onClick={onAdd}>
      <BsPlus />
    </Button>
  );
}
